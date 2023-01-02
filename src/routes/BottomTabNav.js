import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, WeatherDetails} from '@app/screens';
import {Colors} from '@app/constants';
import LinearGradient from 'react-native-linear-gradient';

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
          // backgroundColor: Colors.bottomTabBackgroundColor,
          paddingTop: 5,
          height: 55,
        },
        tabBarBackground: () => (
          <LinearGradient
            useAngle={true}
            // angle={180}
            colors={['#667db6', '#0082c8', '#0082c8', '#667db6']}
            style={{flex: 1, height: 2}}
          />
        ),
        tabBarActiveTintColor: Colors.whiteColor,
        tabBarInactiveTintColor: Colors.bottomTabInactiveColor,

        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
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
