import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Images, capitalizeFirstLetterInWords} from '@app/constants';
import {DailyCard, HourlyCard} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {getWeather} from '@app/redux/slices';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {heightToDp, widthToDp} from '@app/utils';

const Home = () => {
  const dispatch = useDispatch();

  const weather = useSelector(state => state?.weather?.weatherData || {});
  const status = useSelector(state => state?.weather?.status);

  const {cityName} = weather || {};
  const currentCity = cityName;
  const {current, daily, hourly} = weather?.data || {};

  const minTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.min : 0;
  const maxTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.max : 0;

  const hourlyCardData = hourly?.slice(0, 12) || [];
  const dailyCardData = daily?.slice(1, 8) || [];

  useFocusEffect(
    useCallback(() => {
      dispatch(getWeather('Patan'));
    }, [dispatch, getWeather, cityName]),
  );

  const renderItemHourly = ({item}) => (
    <HourlyCard
      icon={item?.weather[0]?.icon || ''}
      time={moment.unix(item?.dt || 0).format('h:mm A')}
    />
  );

  const renderItemDaily = ({item}) => (
    <DailyCard
      icon={item?.weather[0]?.icon || ''}
      time={item?.dt || 0}
      temp={item?.temp?.day}
    />
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.fullScreenShadow}>
          {!status && (
            <View style={styles.loading}>
              <ActivityIndicator size={widthToDp(100)} />
            </View>
          )}

          <View style={styles.topHalfScreen}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textStyle}>{cityName || 'Your City'} </Text>

              <Text style={styles.textStyle}>
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
              <Text style={styles.cardTitleText}> Overview</Text>

              <FlatList
                data={hourlyCardData}
                renderItem={renderItemHourly}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item?.dt}
              />
            </View>

            <View style={styles.hourlyCardContainer}>
              <Text style={styles.cardTitleText}>Next 7 days</Text>

              <FlatList
                data={dailyCardData}
                renderItem={renderItemDaily}
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHalfScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: hp('3%'),
  },
  bottomHalfScreen: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cityCardContainer: {
    alignItems: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  textStyle: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 65,
  },
  smallTextStyle: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
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
    // flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: widthToDp(15),
  },
  cardTitleText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: widthToDp(20),
    paddingBottom: heightToDp(5),
    paddingLeft: widthToDp(15),
  },
});
