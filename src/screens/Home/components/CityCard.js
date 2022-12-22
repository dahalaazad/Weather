import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CityCard = ({cityName, imageBackground}) => {
  return (
    <ImageBackground
      source={imageBackground}
      style={styles.container}
      imageStyle={{borderRadius: 20}}>
      <Text style={styles.textStyle}>{cityName}</Text>

      <Text style={styles.textStyle}>30°C</Text>
    </ImageBackground>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp('25%'),
    width: wp('40%'),
    justifyContent: 'space-evenly',
    paddingTop: 25,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 20,
    color: Colors.whiteColor,
    fontWeight: '600',
  },
});
