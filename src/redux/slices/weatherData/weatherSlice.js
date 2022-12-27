import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      return {...state, currentWeather: action.payload};
    },
  },
});

export const {setCurrentWeather} = weatherSlice.actions;

export default weatherSlice.reducer;
