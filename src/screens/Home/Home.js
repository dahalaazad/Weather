import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Images, capitalizeFirstLetterInWords} from '@app/constants';
import {CityCard, HourlyCard} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {getWeather} from '@app/redux/slices';
import moment from 'moment';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeather('Patan'));
  }, []);

  const weather = useSelector(state => state?.weather?.weatherData || {});

  const {cityName} = weather || {};
  const {current, daily, hourly} = weather?.data || {};

  const minTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.min : 0;
  const maxTemp =
    Array.isArray(daily) && daily.length > 0 ? daily[0]?.temp?.max : 0;

  const cityCardData = [
    {
      city: 'Kathmandu',
      temp: current?.temp || 0,
      background: Images.sunriseCardBackground,
    },
    {city: 'London', temp: 35, background: Images.rainyCardBackground},
    {city: 'Mumbai', temp: 45, background: Images.sunriseCardBackground},
    {city: 'Doha', temp: 49, background: Images.rainyCardBackground},
  ];

  const hourlyCardData = hourly?.slice(0, 12) || [];

  const onPressCityHandler = cityName => {
    navigation.navigate('Search', {cityName});
  };

  const renderItemHourly = ({item}) => (
    <HourlyCard
      icon={item?.weather[0]?.icon || ''}
      time={moment.unix(item?.dt || 0).format('h:mm A')}
    />
  );

  const renderItemCity = ({item}) => (
    <TouchableOpacity
      style={{paddingHorizontal: hp('3%')}}
      onPress={() => onPressCityHandler(item?.city || 'Patan')}>
      <CityCard
        cityName={item?.city}
        temp={item?.temp}
        imageBackground={item?.background}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.fullScreenShadow}>
          <View style={styles.topHalfScreen}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textStyle}>{cityName || ''} </Text>

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
            <View style={styles.cityCardContainer}>
              <FlatList
                data={cityCardData}
                renderItem={renderItemCity}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.city}
              />
            </View>

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
