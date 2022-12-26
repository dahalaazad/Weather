import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {Colors, Images} from '@app/constants';
import {Search} from './components';
import {SunIcon} from '@app/assets/svg';

const WeatherDetails = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.searchDetailBackground} style={{flex: 1}}>
        <View style={styles.topHalf}>
          <Search />
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.bigText}>8°C</Text>

            <View style={{alignItems: 'center'}}>
              <SunIcon />

              <Text style={styles.weatherOutlookText}>Clear Sky</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.weatherCategoryText}>Pressure</Text>

                  <Text style={styles.weatherDataText}>800hcpa</Text>
                </View>

                <View style={{paddingRight: 30}}>
                  <Text style={styles.weatherCategoryText}>Humidity</Text>

                  <Text style={styles.weatherDataText}>20mm</Text>
                </View>

                <View>
                  <Text style={styles.weatherCategoryText}>Precipitation</Text>

                  <Text style={styles.weatherDataText}>56%</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text>Air Quality</Text>

              <Text style={styles.weatherDataText}>34</Text>
            </View>

            <View>
              <Text>Wind Speed</Text>

              <Text style={styles.weatherDataText}>4km/h</Text>
            </View>

            <View>
              <Text>Visibility</Text>

              <Text style={styles.weatherDataText}>11 km</Text>
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  weatherIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigText: {
    fontFamily: 'Poppins',
    fontSize: 72,
    fontWeight: '700',
  },
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
  weatherOutlookText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
  },
});
