import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {Colors} from '@app/constants';

const Search = () => {
  return (
    <View style={styles.container}>
      <TextInput
        label="Search your city"
        style={styles.textInputStyle}
        selectionColor={Colors.blackColor}
        activeUnderlineColor="transparent"
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
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
