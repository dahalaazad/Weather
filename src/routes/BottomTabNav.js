import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, WeatherDetails} from '@app/screens';
import {Colors} from '@app/constants';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const getIcon = (route, focused) => {
    let iconName = 'home';

    switch (route.name) {
      case 'Home':
        return (iconName = focused ? 'home' : 'home-outline');
      case 'Search':
        return (iconName = focused ? 'search' : 'search-outline');
      default:
        return iconName;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return (
            <Ionicons
              name={getIcon(route, focused)}
              size={size}
              color={color}
            />
          );
        },

        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bottomTabBackgroundColor,
        },

        tabBarActiveTintColor: Colors.whiteColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />

      <Tab.Screen
        name="Search"
        component={WeatherDetails}
        options={{
          title: 'Search',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
