import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {capitalizeFirstLetterInWords, Colors, Images} from '@app/constants';
import {Details, Search} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '@app/redux/slices';
import {CityCard} from './components';

const WeatherDetails = () => {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('Patan');

  useEffect(() => {
    dispatch(getWeather(cityName));
  }, [cityName]);

  const cityWeatherDetails = useSelector(
    state => state?.weather?.weatherData || {},
  );

  const {current, daily, hourly} = cityWeatherDetails?.data || {};

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.topHalf}>
          <Search />

          <CityCard cityName={cityName} setCityName={setCityName} />
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.bigText}>{`${Math.round(
              current?.temp || 0,
            )}°C`}</Text>

            <View style={{alignItems: 'center'}}>
              <View>
                <Image
                  style={styles.weatherIconLogo}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${current?.weather[0]?.icon}@4x.png`,
                  }}
                />
              </View>

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
                    value={`${current?.pressure || 0} hPa`}
                  />
                </View>

                <View style={styles.centerDataContainer}>
                  <Details
                    title="Humidity"
                    value={`${current?.humidity || 0}`}
                  />
                </View>

                <View style={{flex: 1}}>
                  <Details title="Wind Degree" value={current?.wind_deg || 0} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.weatherDataContainer}>
            <View style={styles.leftDataContainer}>
              <Details title="UVI" value={current?.uvi || 0} />
            </View>

            <View style={styles.centerDataContainer}>
              <Details
                title="Wind Speed"
                value={`${Math.round(current?.wind_speed || 0)} km/h`}
              />
            </View>

            <View style={{flex: 1}}>
              <Details
                title="Visibility"
                value={`${Math.round(current?.visibility / 1000 || 0)} km`}
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
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  cityCardContainer: {
    alignItems: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  cityTitleText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 44,
    fontWeight: '800',
    paddingBottom: 90,
    color: Colors.whiteColor,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 25,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
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
    color: Colors.whiteColor,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  weatherCategoryText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    color: Colors.whiteColor,
  },
  weatherDataText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '400',
    color: Colors.whiteColor,
  },
  weatherOutlookText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.whiteColor,
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
  weatherIconLogo: {
    width: wp('45%'),
    height: hp('15%'),
  },
});
