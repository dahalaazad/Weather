import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  Colors,
  Images,
  CityListData,
  capitalizeFirstLetterInWords,
} from '@app/constants';
import {useSelector} from 'react-redux';

const Search = ({cityName, setCityName}) => {
  const isError = useSelector(state => state?.weather?.error);
  const [inputTextValue, setInputTextValue] = useState('');
  const submitCityName = text => {
    setCityName(text);
    isError !== null
      ? alert(capitalizeFirstLetterInWords(isError?.message))
      : CityListData.unshift({
          city: text,
          background: Images.sunriseCardBackground,
        });
    setInputTextValue('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search your city"
        value={inputTextValue}
        style={styles.textInputStyle}
        mode="outlined"
        theme={{roundness: 12}}
        outlineColor="transparent"
        activeOutlineColor="transparent"
        selectionColor="#000"
        right={
          <TextInput.Icon
            // forceTextInputFocus={false}
            icon="search-web"
            onPress={() => {}}
          />
        }
        onChangeText={text => setInputTextValue(text)}
        onSubmitEditing={({nativeEvent: {text}}) => {
          submitCityName(text);
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInputStyle: {
    // borderRadius: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
});
