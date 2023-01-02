import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors, Images} from '@app/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CityCard = ({cityName, setCityName}) => {
  const cityCardData = [
    {city: 'Kathmandu', background: Images.sunriseCardBackground},
    {city: 'London', background: Images.rainyCardBackground},
    {city: 'Mumbai', background: Images.sunriseCardBackground},
    {city: 'Doha', background: Images.rainyCardBackground},
  ];

  const onPressAction = currentCity => {
    setCityName(currentCity);
  };

  const renderItemCity = ({item}) => (
    <TouchableOpacity
      style={
        item?.city === cityName
          ? [styles.container, styles.selectedListItem]
          : styles.container
      }
      onPress={() => onPressAction(item?.city)}>
      <ImageBackground
        source={item?.background}
        style={styles.backgroundContainer}
        imageStyle={{borderRadius: 20}}>
        <Text style={styles.textStyle}>{item?.city}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.cityCardContainer}>
      <FlatList
        data={cityCardData}
        renderItem={renderItemCity}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.city}
      />
    </View>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: hp('3%'),
  },
  backgroundContainer: {
    flexDirection: 'row',
    height: hp('25%'),
    width: wp('40%'),
    justifyContent: 'space-evenly',
    paddingTop: 20,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 24,
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  selectedListItem: {
    padding: hp('1.5%'),
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 25,
  },
});
