import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {CityCard, HourlyCard} from './components';
import Images from '@app/constants/Images';

const hourlyData = ['Now', '1:00PM', '2:00PM', '3:00PM', '4:00PM'];
const cityCardData = [
  {city: 'Jaipur', temp: '30°C', background: Images.sunriseCardBackground},
  {city: 'Chennai', temp: '35°C', background: Images.rainyCardBackground},
  {city: 'Mumbai', temp: '45°C', background: Images.sunriseCardBackground},
  {city: 'Doha', temp: '49°C', background: Images.rainyCardBackground},
];

const Home = () => {
  const renderItemHourly = ({item}) => <HourlyCard time={item} />;
  const renderItemCity = ({item}) => (
    <TouchableOpacity style={{paddingHorizontal: 20}}>
      <CityCard
        cityName={item.city}
        temp={item.temp}
        imageBackground={item.background}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@app/assets/images/night-moon.jpg')}
        style={{flex: 1}}>
        <View style={styles.topHalfScreen}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.textStyle}>PEKIN</Text>

            <Text style={styles.textStyle}>24°C</Text>
          </View>

          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.smallTextStyle}>7 Nov 2022 Lun 20°C/29°C</Text>

            <Text style={styles.smallTextStyle}>Clear Sky</Text>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={cityCardData}
              renderItem={renderItemCity}
              horizontal={true}
              keyExtractor={item => item.city}
            />
          </View>

          <View style={styles.hourlyCardContainer}>
            <FlatList
              data={hourlyData}
              renderItem={renderItemHourly}
              horizontal={true}
              keyExtractor={item => item}
            />
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
    backgroundColor: Colors.mainBackgroundColor,
  },
  topHalfScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
