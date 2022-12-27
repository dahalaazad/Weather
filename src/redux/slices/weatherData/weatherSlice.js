import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const getWeather = createAsyncThunk('weather/getWeather', async () => {
  const baseURL = 'https://api.openweathermap.org/data/2.5';
  const appId = 'b31f986179635820b5d31e28a4cf9fc2';
  const cityName = 'Kathmandu';

  const cityNameResponse = await axios.get(
    `${baseURL}/forecast?q=${cityName}&units=metric&appid=${appId}`,
  );
  const lat = cityNameResponse?.data?.city?.coord?.lat;
  const long = cityNameResponse?.data?.city?.coord?.lon;

  const latLongResponse = await axios.get(
    `${baseURL}/onecall?lat=${lat}&lon=${long}&units=metric&appid=${appId}`,
  );

  return {
    cityName: cityNameResponse?.data?.city?.name,
    data: latLongResponse?.data,
  };
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // setCurrentWeather: (state, action) => {
    //   return {currentWeather: action.payload};
    // },
  },
  extraReducers: {
    [getWeather.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {setCurrentWeather} = weatherSlice.actions;

export default weatherSlice.reducer;
