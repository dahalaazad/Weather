import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@app/constants';
import moment from 'moment';

const DailyCard = ({icon, time, temp}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.textStyle}>
        {moment(new Date()).format('D MMM YYYY') ===
        moment.unix(time || 0).format('D MMM YYYY')
          ? 'Today'
          : moment.unix(time || 0).format('D MMM YYYY')}
      </Text>

      <View style={{paddingBottom: hp('1%')}}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
      </View>

      <Text style={styles.textStyle}>{`${Math.round(temp || 0)}°C`}</Text>
    </TouchableOpacity>
  );
};

export default DailyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    marginHorizontal: hp('1%'),
    alignItems: 'center',
    height: hp('15%'),
    width: wp('25%'),
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
