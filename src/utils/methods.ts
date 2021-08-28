import ImageColors from 'react-native-image-colors';

export const getColorsImage = async (uri: string) => {
  const colorsImage = {
    primary: '',
  };
  const colors = await ImageColors.getColors(uri, {
    fallback: 'gray',
  });
  if (colors.platform === 'ios') {
    colorsImage.primary = colors.background || 'gray';
  } else {
    colorsImage.primary = colors.dominant || 'gray';
  }
  return {
    ...colorsImage,
  };
};
