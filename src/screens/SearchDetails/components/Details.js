import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {widthToDp} from '@app/utils';

const Details = ({title, value}) => {
  return (
    <View>
      <Text style={styles.weatherCategoryText}>{title}</Text>

      <Text style={styles.weatherDataText}>{value}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  weatherCategoryText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(12),
    fontWeight: '700',
    color: Colors.whiteColor,
  },
  weatherDataText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(18),
    fontWeight: '700',
    color: Colors.whiteColor,
  },
});
