import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, WeatherDetails} from '@app/screens';
import {Colors} from '@app/constants';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            default:
              iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
