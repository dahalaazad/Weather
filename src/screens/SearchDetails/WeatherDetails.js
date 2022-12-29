import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {capitalizeFirstLetterInWords, Colors, Images} from '@app/constants';
import {Details, Search} from './components';
import {SunIcon} from '@app/assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '@app/redux/slices';

const WeatherDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {cityName} = route.params;

  useEffect(() => {
    dispatch(getWeather(cityName));
  }, [cityName]);

  const cityWeatherDetails = useSelector(
    state => state?.weather?.weatherData || {},
  );

  const {current, daily, hourly} = cityWeatherDetails?.data || {};

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.searchDetailBackground} style={{flex: 1}}>
        <View style={styles.topHalf}>
          <Search />

          <Text style={styles.cityTitleText}>{cityName}</Text>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.bigText}>{`${Math.round(
              current?.temp,
            )}°C`}</Text>

            <View style={{alignItems: 'center'}}>
              <SunIcon />

              <Text style={styles.weatherOutlookText}>
                {capitalizeFirstLetterInWords(
                  current?.weather[0]?.description || '',
                )}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <View>
              <View style={styles.weatherDataContainer}>
                <View style={styles.leftDataContainer}>
                  <Details
                    title="Pressure"
                    value={`${current?.pressure} hPa`}
                  />
                </View>

                <View style={styles.centerDataContainer}>
                  <Details title="Humidity" value={`${current?.humidity}`} />
                </View>

                <View style={{flex: 1}}>
                  <Details title="Wind Degree" value={current?.wind_deg} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.weatherDataContainer}>
            <View style={styles.leftDataContainer}>
              <Details title="UVI" value={current?.uvi} />
            </View>

            <View style={styles.centerDataContainer}>
              <Details
                title="Wind Speed"
                value={`${Math.round(current?.wind_speed)} km/h`}
              />
            </View>

            <View style={{flex: 1}}>
              <Details
                title="Visibility"
                value={`${Math.round(current?.visibility / 1000)} km`}
              />
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
    justifyContent: 'space-between',
  },
  cityTitleText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 40,
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
    paddingLeft: 25,
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
  weatherDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  leftDataContainer: {
    flex: 1,
    marginLeft: 15,
  },
  centerDataContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
