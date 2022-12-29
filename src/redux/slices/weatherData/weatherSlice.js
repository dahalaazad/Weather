import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  weatherData: {},
  status: 'idle',
  error: null,
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async cityName => {
    const baseURL = 'https://api.openweathermap.org/data/2.5';
    const appId = 'b31f986179635820b5d31e28a4cf9fc2';

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
  },
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.weatherData = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
