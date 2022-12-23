import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import Images from '@app/constants/Images';
import {Search} from './components';

const WeatherDetails = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.searchDetailBackground} style={{flex: 1}}>
        <View style={styles.topHalf}>
          <Search />
        </View>

        <View style={styles.bottomHalf}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
            }}>
            <Text>8°C</Text>
            <View>
              <Text>Icon</Text>
              <Text>Clear Sky</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackgroundColor,
    flex: 1,
  },
  topHalf: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
