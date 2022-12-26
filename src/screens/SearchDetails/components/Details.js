import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
    fontWeight: '400',
  },
  weatherDataText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '400',
  },
});
