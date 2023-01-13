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
import uuid from 'react-uuid';
import {getImage} from '@app/utils/getImage';
import {heightToDp, widthToDp} from '@app/utils';
import LinearGradient from 'react-native-linear-gradient';

const CityCard = ({
  cityName,
  onCityCardPress,
  CityListData,
  deleteCityCard,
}) => {
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
        onPress={() => onPressAction(item?.city)}
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
