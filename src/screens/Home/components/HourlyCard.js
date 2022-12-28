import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@app/constants';

const HourlyCard = ({icon, time}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{paddingBottom: hp('1%')}}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
      </View>

      <Text style={styles.textStyle}>{time}</Text>
    </TouchableOpacity>
  );
};

export default HourlyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    marginHorizontal: hp('1%'),
    alignItems: 'center',
    height: hp('11%'),
    width: wp('19%'),
    backgroundColor: 'rgba(135, 206, 235,0.4)',
  },
  textStyle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: Colors.whiteColor,
    fontSize: 15,
  },
  tinyLogo: {
    width: wp('15%'),
    height: hp('5%'),
  },
});
