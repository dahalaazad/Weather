import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Images, capitalizeFirstLetterInWords} from '@app/constants';
import {HourlyCard} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {getWeather} from '@app/redux/slices';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getWeather('Patan'));
    }, [dispatch, getWeather, cityName]),
  );

  const weather = useSelector(state => state?.weather?.weatherData || {});

  const {cityName} = weather || {};
  const currentCity = cityName;
  console.log(currentCity);
  const {current, daily, hourly} = weather?.data || {};

  const minTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.min : 0;
  const maxTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.max : 0;

  const hourlyCardData = hourly?.slice(0, 12) || [];

  const renderItemHourly = ({item}) => (
    <HourlyCard
      icon={item?.weather[0]?.icon || ''}
      time={moment.unix(item?.dt || 0).format('h:mm A')}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.fullScreenShadow}>
          <View style={styles.topHalfScreen}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textStyle}>{cityName || 'Kathmandu'} </Text>

              <Text style={[styles.textStyle, {fontSize: 38}]}>
                {`${Math.round(current?.temp || 0)}°C`}
              </Text>
            </View>

            <View
              style={[
                styles.row,
                styles.spaceBetween,
                {alignItems: 'flex-end'},
              ]}>
              <View style={styles.spaceAround}>
                <Text style={styles.smallTextStyle}>
                  {moment.unix(current?.dt || 0).format('D MMM YYYY')}
                </Text>

                <Text style={styles.smallTextStyle}>
                  {`${Math.round(minTemp || 0)}°C/${Math.round(
                    maxTemp || 0,
                  )}°C`}
                </Text>
              </View>

              <Text style={styles.smallTextStyle}>
                {capitalizeFirstLetterInWords(
                  current?.weather[0]?.description || '',
                )}
              </Text>
            </View>
          </View>

          <View style={styles.bottomHalfScreen}>
            <View style={styles.hourlyCardContainer}>
              <FlatList
                data={hourlyCardData}
                renderItem={renderItemHourly}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item?.dt}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
  },
  fullScreenShadow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topHalfScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: hp('3%'),
  },
  bottomHalfScreen: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cityCardContainer: {
    alignItems: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  textStyle: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 28,
  },
  smallTextStyle: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 15,
  },
  fullFlex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  hourlyCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
