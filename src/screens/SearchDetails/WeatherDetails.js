import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {capitalizeFirstLetterInWords, Colors, Images} from '@app/constants';
import {Details, Search} from './components';
import {useDispatch, useSelector} from 'react-redux';
import {CityCard} from './components';
import {
  deleteSearchedCity,
  getCurrentWeather,
  setCurrentCityData,
} from '@app/redux/slices/weatherData/weatherSlice';
import {widthToDp, heightToDp} from '@app/utils';
import {showToast} from '@app/constants/Utils';

const WeatherDetails = () => {
  const flatlistRef = useRef(null);

  const dispatch = useDispatch();

  const [cityName, setCityName] = useState('Patan');
  const [searchText, setSearchText] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

  const cityWeatherDetails = useSelector(
    state => state?.weather?.currentWeatherData || {},
  );
  const CityListData = useSelector(state => state?.weather?.defaultCities);

  useEffect(() => {
    dispatch(getCurrentWeather(cityName));
  }, []);

  let current = cityWeatherDetails?.data || {};
  const icon = Array.isArray(current?.weather) ? current?.weather[0].icon : '';
  const description = Array.isArray(current?.weather)
    ? current?.weather[0].description
    : '';

  const submitCityName = text => {
    if (text !== '') {
      setCityName(text);
      dispatch(getCurrentWeather(text))
        .unwrap()
        .then(originalPromiseResult => {
          let duplicatedCityIndex = CityListData.findIndex(
            item => item.city === originalPromiseResult?.cityName,
          );
          setHighlightIndex(duplicatedCityIndex);

          if (duplicatedCityIndex) {
            flatlistRef.current.scrollToIndex({
              animated: true,
              index: duplicatedCityIndex,
            });
          }
        })
        .catch(rejectedValueOrSerializedError => {
          console.error(rejectedValueOrSerializedError);
        });
    } else {
      showToast('warningToast', 'Error', 'City cannot be empty');
    }
  };

  const handleCityPress = (city, i) => {
    setHighlightIndex(i);
    setCityName(city);
    current = CityListData.filter(i => i.city === city)[0]?.data;
    dispatch(setCurrentCityData({cityName: current?.name, data: current}));
  };

  const deleteCityCard = city =>
    Alert.alert('Are you sure you want to delete?', '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => dispatch(deleteSearchedCity(city)),
        style: 'default',
      },
    ]);

  const handleTextChange = text => {
    setSearchText(text);
    if (text === '') {
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.sunnyDayBackground} style={{flex: 1}}>
        <View style={styles.topHalf}>
          <Search
            cityName={cityName}
            setCityName={setCityName}
            submitCityName={submitCityName}
            searchText={searchText}
            setSearchText={setSearchText}
            handleTextChange={handleTextChange}
          />

          <View style={{marginHorizontal: widthToDp(23)}}>
            <CityCard
              cityName={cityName}
              CityListData={CityListData}
              onCityCardPress={handleCityPress}
              deleteCityCard={deleteCityCard}
              flatlistRef={flatlistRef}
              highlightIndex={highlightIndex}
            />
          </View>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.weatherIconContainer}>
            <Text style={styles.bigText}>{`${Math.round(
              current?.main?.temp || 0,
            )}°C`}</Text>

            <View style={{alignItems: 'center'}}>
              <View>
                <Image
                  style={styles.weatherIconLogo}
                  source={{
                    uri:
                      `https://openweathermap.org/img/wn/${icon}@4x.png` || '',
                  }}
                />
              </View>

              <Text style={styles.weatherOutlookText}>
                {description !== ''
                  ? capitalizeFirstLetterInWords(description)
                  : ''}
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <View>
              <View style={styles.weatherDataContainer}>
                <View style={styles.leftDataContainer}>
                  <Details
                    title="Pressure"
                    value={`${current?.main?.pressure || 0} hPa`}
                  />
                </View>

                <View style={styles.centerDataContainer}>
                  <Details
                    title="Humidity"
                    value={`${current?.main?.humidity || 0}%`}
                  />
                </View>

                <View style={{flex: 1}}>
                  <Details
                    title="Wind Degree"
                    value={`${current?.wind?.deg || 0}°`}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.weatherDataContainer}>
            <View style={styles.leftDataContainer}>
              <Details title="UVI" value={current?.uvi || 0} />
            </View>

            <View style={styles.centerDataContainer}>
              <Details
                title="Wind Speed"
                value={`${Math.round(current?.wind?.speed || 0)} km/h`}
              />
            </View>

            <View style={{flex: 1}}>
              <Details
                title="Visibility"
                value={`${Math.round(current?.visibility / 1000 || 0)} km`}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackgroundColor,
    flex: 1,
  },
  topHalf: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cityTitleText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: widthToDp(44),
    fontWeight: '800',
    paddingBottom: heightToDp(90),
    color: Colors.whiteColor,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: widthToDp(25),
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderTopLeftRadius: heightToDp(30),
    borderTopRightRadius: heightToDp(30),
  },
  weatherIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(72),
    fontWeight: '700',
    color: Colors.whiteColor,
    paddingLeft: widthToDp(10),
    alignSelf: 'center',
  },
  weatherCategoryText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(12),
    fontWeight: '400',
    color: Colors.whiteColor,
  },
  weatherDataText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(24),
    fontWeight: '400',
    color: Colors.whiteColor,
  },
  weatherOutlookText: {
    fontFamily: 'Poppins',
    fontSize: widthToDp(22),
    fontWeight: '600',
    color: Colors.whiteColor,
  },
  weatherDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  leftDataContainer: {
    flex: 1,
    marginLeft: widthToDp(15),
  },
  centerDataContainer: {
    flex: 1,
    paddingHorizontal: widthToDp(20),
  },
  weatherIconLogo: {
    width: widthToDp(170),
    height: heightToDp(100),
  },
});
