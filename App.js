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

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNav />
    </NavigationContainer>
  );
};

export default App;
