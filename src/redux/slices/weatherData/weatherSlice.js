import {showToast} from '@app/constants/Utils';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  defaultCities: [],
  weatherData: {},
  currentWeatherData: {},
  status: false,
  currentStatus: false,
  error: null,
  currentError: null,
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (cityName, {rejectWithValue}) => {
    try {
      const baseURL = 'https://api.openweathermap.org/data/2.5';
      const appId = '8ec56ea21eb8c16a1b68e052c8f559d7';

      const cityNameResponse = await axios.get(
        `${baseURL}/forecast?q=${cityName}&units=metric&appid=${appId}`,
      );
      const lat = cityNameResponse?.data?.city?.coord?.lat || 0;
      const long = cityNameResponse?.data?.city?.coord?.lon || 0;

      const latLongResponse = await axios.get(
        `${baseURL}/onecall?lat=${lat}&lon=${long}&units=metric&appid=${appId}`,
      );

      return {
        cityName: cityNameResponse?.data?.city?.name || 'Patan',
        data: latLongResponse?.data || {},
      };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async (cityName, {dispatch, rejectWithValue}) => {
    try {
      const baseURL = 'https://api.openweathermap.org/data/2.5';
      const appId = '8ec56ea21eb8c16a1b68e052c8f559d7';

      const cityNameResponse = await axios.get(
        `${baseURL}/weather?q=${cityName}&units=metric&appid=${appId}`,
      );

      dispatch(
        addSearchedCity({
          city: cityNameResponse?.data?.name,
        }),
      );
      return {
        cityName: cityNameResponse?.data?.name || 'Patan',
        data: cityNameResponse?.data || {},
      };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      showToast(
        'error',
        `Error ${error?.response?.data?.cod}`,
        error?.response?.data?.message,
      );
    }
  },
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addSearchedCity: (state, action) => {
      if (
        state.defaultCities.findIndex(i => i.city === action.payload.city) ===
        -1
      ) {
        if (state.defaultCities.length < 10) {
          showToast(
            'success',
            'Success',
            `${action?.payload?.city} added as a city card`,
          );
          return {
            ...state,
            defaultCities: [action.payload, ...state.defaultCities],
          };
        } else {
          showToast(
            'warningToast',
            'Warning',
            `Cannot add ${action?.payload?.city} as limit has been reached`,
          );
        }
      } else {
        return {
          ...state,
          defaultCities: [...state.defaultCities],
        };
      }
    },
    deleteSearchedCity: (state, action) => {
      return {
        ...state,
        defaultCities: state.defaultCities.filter(
          item => item?.city !== action?.payload,
        ),
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, (state, action) => {
        state.status = false;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = true;
        state.weatherData = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(getCurrentWeather.pending, (state, action) => {
        state.currentStatus = false;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.currentStatus = true;
        state.currentError = null;
        state.currentWeatherData = action.payload;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.currentStatus = false;
        state.currentError = action.payload;
      });
  },
});

export const {addSearchedCity, deleteSearchedCity} = weatherSlice.actions;

export default weatherSlice.reducer;
