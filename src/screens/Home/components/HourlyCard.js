import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@app/constants';
import {WeatherIcon} from '@app/assets/svg';

const HourlyCard = ({time}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <WeatherIcon />

      <Text style={styles.textStyle}>{time}</Text>
    </TouchableOpacity>
  );
};

export default HourlyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    marginHorizontal: 5,
    alignItems: 'center',
    padding: wp('3%'),
    backgroundColor: Colors.hourlyCardColor,
  },
  textStyle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: Colors.whiteColor,
    fontSize: 15,
  },
});
