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

const Home = () => {
  const renderItem = ({item}) => <HourlyCard time={item} />;

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.nightBackground} style={{flex: 1}}>
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
          <View style={[styles.row, styles.spaceAround]}>
            <View>
              <TouchableOpacity>
                <CityCard
                  cityName="Jaipur"
                  temp="35°C"
                  imageBackground={Images.sunriseCardBackground}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <CityCard
                  cityName="Chennai"
                  temp="30°C"
                  imageBackground={Images.rainyCardBackground}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.hourlyCardContainer}>
            <FlatList
              data={hourlyData}
              renderItem={renderItem}
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
