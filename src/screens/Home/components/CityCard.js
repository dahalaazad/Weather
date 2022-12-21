import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CityCard = ({cityName}) => {
  return (
    <View style={styles.container}>
      <Text>{cityName}</Text>
    </View>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.whiteColor,
    height: hp('25%'), // 70% of height device screen
    width: wp('30%'),
    borderRadius: hp('2%'),
  },
});
