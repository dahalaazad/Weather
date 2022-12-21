import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {CityCard} from './components';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center',paddingHorizontal:20}}>
        <View style={[styles.row, styles.spaceBetween,]}>
          <Text style={styles.textStyle}>PEKIN</Text>

          <Text style={styles.textStyle}>24 C</Text>
        </View>

        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.textStyle}>Current Date</Text>

          <Text style={styles.textStyle}>Clear Sky</Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View style={[styles.row, styles.spaceAround]}>
          <View>
            <CityCard cityName="Jaipur" />
          </View>

          <View>
            <CityCard cityName="Chennai" />
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.textStyle}>Daily Cards</Text>
        </View>
      </View>
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
  textStyle: {
    color: '#fff',
    // fontFamily:'Poppins',
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
});
