import Toast from 'react-native-toast-message';

export const capitalizeFirstLetterInWords = str =>
  str
    ? str
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
    : str;

export const showToast = (type, text1, text2, time) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 2000,
    autoHide: true,
  });
};
