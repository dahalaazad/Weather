import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';

const WeatherDetails = () => {
  return (
    <View style={styles.container}>
      <Text>WeatherDetails</Text>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackgroundColor,
    flex: 1,
  },
});
