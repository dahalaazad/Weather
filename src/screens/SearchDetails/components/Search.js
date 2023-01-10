import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';

const Search = ({cityName, setCityName, submitCityName}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search your city"
        // value={cityName}
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
        // onChangeText={text => setCityName(text)}
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
