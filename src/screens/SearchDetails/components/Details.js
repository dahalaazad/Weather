import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Colors } from '@app/constants';

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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.whiteColor,
  },
  weatherDataText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.whiteColor,
  },
});
