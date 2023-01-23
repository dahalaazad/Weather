/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import BottomTabNav from '@app/routes/BottomTabNav';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {View, Text, StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '@app/utils';

const toastConfig = {
  warningToast: ({text1, text2}) => (
    <View style={styles.toastWarning}>
      <Text style={styles.toastWarningText}>{text1} </Text>
      <Text style={styles.toastWarningSmallText}>{text2} </Text>
    </View>
  ),
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>

      <Toast config={toastConfig} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
  toastWarning: {
    height: heightToDp(60),
    width: '90%',
    justifyContent: 'center',
    borderRadius: widthToDp(5),
    borderLeftWidth: widthToDp(5),
    borderLeftColor: 'yellow',
    backgroundColor: '#fff',
  },
  toastWarningText: {
    color: '#000',
    fontSize: widthToDp(17),
    fontFamily: 'Poppins',
    fontWeight: '700',
    paddingLeft: widthToDp(25),
  },
  toastWarningSmallText: {
    color: 'grey',
    fontSize: widthToDp(14),
    paddingLeft: widthToDp(25),
  },
});
