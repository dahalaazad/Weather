import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '@app/constants';
import {WeatherIcon} from '@app/assets/svg';

const HourlyCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <WeatherIcon />
      <Text>Time</Text>
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
    padding: wp('4%'),
    backgroundColor: Colors.hourlyCardColor,
  },
});
