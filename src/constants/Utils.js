import Toast from 'react-native-toast-message';

export const capitalizeFirstLetterInWords = str =>
  str
    ? str
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
    : str;

export const showToast = (type, title, subTitle, time) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
    visibilityTime: 2000,
    autoHide: true,
  });
};
