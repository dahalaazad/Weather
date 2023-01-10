import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors} from '@app/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import uuid from 'react-uuid';
import {getImage} from '@app/utils/getImage';

const CityCard = ({cityName, onCityCardPress, CityListData}) => {
  const onPressAction = currentCity => {
    onCityCardPress(currentCity);
  };

  const renderItemCity = ({item}) => (
    <View style={styles.cityCardBorderContainer}>
      <TouchableOpacity
        style={
          item?.city === cityName
            ? [styles.container, styles.selectedListItem]
            : styles.container
        }
        onPress={() => onPressAction(item?.city)}>
        <ImageBackground
          source={getImage(item?.background)}
          style={styles.backgroundContainer}
          imageStyle={{borderRadius: 20}}>
          <Text style={styles.textStyle}>{item?.city}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.cityCardContainer}>
      <FlatList
        data={CityListData}
        renderItem={renderItemCity}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => uuid()}
      />
    </View>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  container: {},
  cityCardBorderContainer: {
    height: hp('26.3%'),
    width: wp('41%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('4.5%'),
  },
  cityCardContainer: {
    alignItems: 'center',
    paddingBottom: wp('2.5%'),
  },
  backgroundContainer: {
    flexDirection: 'row',
    height: hp('25%'),
    width: wp('40%'),
    justifyContent: 'space-evenly',
    paddingTop: 20,
    borderRadius: 0,
  },
  textStyle: {
    fontSize: 24,
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  selectedListItem: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 25,
  },
});
