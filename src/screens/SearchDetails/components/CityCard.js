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
import {heightToDp, widthToDp} from '@app/utils';

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
    height: heightToDp(180),
    width: widthToDp(140),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthToDp(20),
  },
  cityCardContainer: {
    alignItems: 'flex-start',
    paddingBottom: heightToDp(10),
  },
  backgroundContainer: {
    flexDirection: 'row',
    height: heightToDp(171),
    width: widthToDp(140),

    justifyContent: 'space-evenly',
    paddingTop: heightToDp(20),
    borderRadius: 0,
  },
  textStyle: {
    fontSize: widthToDp(24),
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  selectedListItem: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: widthToDp(5),
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: widthToDp(22),
  },
});
