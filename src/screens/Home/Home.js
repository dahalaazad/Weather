import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Images} from '@app/constants';
import {CityCard, HourlyCard} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {getWeather} from '@app/redux/slices';
import moment from 'moment';

const Home = () => {
  const dispatch = useDispatch();

  const weather = useSelector(state => state?.weather || {});
  console.log(weather);
  const cityCardData =
    [
      {
        city: 'Kathmandu',
        temp: weather?.data?.current?.temp || 0,
        background: Images.sunriseCardBackground,
      },
      {city: 'London', temp: 35, background: Images.rainyCardBackground},
      {city: 'Mumbai', temp: 45, background: Images.sunriseCardBackground},
      {city: 'Doha', temp: 49, background: Images.rainyCardBackground},
    ] || [];

  const hourlyCardData = weather?.data?.hourly?.slice(0, 12) || [];

  useEffect(() => {
    dispatch(getWeather('Patan'));
  }, []);

  const renderItemHourly = ({item}) => (
    <HourlyCard
      icon={item?.weather[0]?.icon}
      time={moment.unix(item?.dt).format('h:mm A')}
    />
  );

  const renderItemCity = ({item}) => (
    <TouchableOpacity style={{paddingHorizontal: hp('3%')}}>
      <CityCard
        cityName={item.city}
        temp={item.temp}
        imageBackground={item.background}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.fullScreenShadow}>
          <View style={styles.topHalfScreen}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textStyle}>{weather?.cityName || ''} </Text>

              <Text style={styles.textStyle}>
                {`${Math.round(weather?.data?.current?.temp)}°C` || ''}
              </Text>
            </View>

            <View style={[styles.row, styles.spaceBetween]}>
              <View style={[styles.row, styles.spaceAround]}>
                <Text style={styles.smallTextStyle}>
                  {moment
                    .unix(weather?.data?.current.dt)
                    .format('D MMM YYYY') || ''}

                  {'   '}

                  {`${Math.round(
                    weather?.data?.daily[0]?.temp?.min,
                  )}°C/${Math.round(weather?.data?.daily[0]?.temp?.max)}°C` ||
                    ''}
                </Text>
              </View>

              <Text style={styles.smallTextStyle}>
                {weather?.data?.current?.weather[0]?.description
                  .charAt(0)
                  .toUpperCase()
                  .concat(
                    weather?.data?.current?.weather[0]?.description?.slice(1),
                  ) || ''}
              </Text>
            </View>
          </View>

          <View style={styles.bottomHalfScreen}>
            <View style={{alignItems: 'center'}}>
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
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  hourlyCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
