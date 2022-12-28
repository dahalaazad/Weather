import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async cityName => {
    const baseURL = 'https://api.openweathermap.org/data/2.5';
    const appId = 'b31f986179635820b5d31e28a4cf9fc2';
    // const cityName = 'Kathmandu';

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
  extraReducers: {
    [getWeather.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default weatherSlice.reducer;
