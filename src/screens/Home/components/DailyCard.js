import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import moment from 'moment';
import {heightToDp, widthToDp} from '@app/utils';

const DailyCard = ({icon, time, temp}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.textStyle}>
        {moment().format('D MMM YYYY') ===
        moment.unix(time || 0).format('D MMM YYYY')
          ? 'Today'
          : moment.unix(time || 0).format('D MMM')}
      </Text>

      <View style={{paddingBottom: heightToDp(5)}}>
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
    borderRadius: widthToDp(15),
    justifyContent: 'center',
    marginHorizontal: widthToDp(10),
    alignItems: 'center',
    height: heightToDp(100),
    width: widthToDp(88),
    backgroundColor: 'rgba(135, 206, 235,0.4)',
  },
  textStyle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: Colors.whiteColor,
    fontSize: widthToDp(15),
  },
  tinyLogo: {
    width: widthToDp(70),
    height: heightToDp(40),
  },
});
