import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images} from '@app/constants';
import uuid from 'react-uuid';
import {heightToDp, widthToDp} from '@app/utils';

const CityCard = ({
  cityName,
  onCityCardPress,
  CityListData,
  deleteCityCard,
  myRef,
  highlightIndex = 0,
}) => {
  const onPressAction = (currentCity, index) => {
    onCityCardPress(currentCity, index);
  };

  const highlightedStyle = currentIndex => {
    if (currentIndex === highlightIndex) {
      return [styles.container, styles.selectedListItem];
    } else {
      return styles.container;
    }
  };

  const renderItemCity = ({item, index}) => (
    <View style={styles.cityCardBorderContainer}>
      <TouchableOpacity
        style={highlightedStyle(index)}
        onPress={() => onPressAction(item?.city, index)}
        onLongPress={() => deleteCityCard(item?.city)}>
        <ImageBackground
          style={styles.backgroundContainer}
          source={Images.minimalCardBackground}
          imageStyle={{borderRadius: 20}}>
          <Text style={[styles.textStyle]}>{item?.city}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.cityCardContainer}>
      <FlatList
        data={CityListData}
        ref={myRef}
        getItemLayout={(_, index) => ({
          length: widthToDp(190),
          offset: widthToDp(190) * (index - 1),
          index,
        })}
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
  container: {
    // marginHorizontal: 20,
  },
  cityCardBorderContainer: {
    height: heightToDp(175),
    width: widthToDp(140),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: widthToDp(20),
  },
  cityCardContainer: {
    alignItems: 'flex-start',
    paddingBottom: heightToDp(10),
  },
  backgroundContainer: {
    flexDirection: 'row',
    height: heightToDp(171),
    width: widthToDp(140),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: heightToDp(20),
    borderRadius: widthToDp(20),
  },
  textStyle: {
    fontSize: widthToDp(24),
    color: Colors.whiteColor,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 20,
  },
  selectedListItem: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: widthToDp(2),
    borderColor: 'rgba(0,0,0,0.7)',
    borderRadius: widthToDp(22),
  },
});
