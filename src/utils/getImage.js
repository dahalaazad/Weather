import {Images} from '@app/constants';

export const getImage = backgroundImageId => {
  switch (backgroundImageId) {
    case '1':
      return Images.sunriseCardBackground;
    case '2':
      return Images.rainyCardBackground;
    default:
      return Images.rainyCardBackground;
  }
};
