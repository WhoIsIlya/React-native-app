const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const black = '#000000'
const darker = '#101010'
const jetBlack = '#252525'
const white = '#ffffff'
const lighter = '#e9e9e9'
const grey = '#888888'
const lightGray = '#aaaaaa'
const darkGray = '#444444'

export const Colors = {
  light: {
    text: black,
    background: lighter,
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: lightGray,
    tabIconSelected: darkGray,
    tabBarBackground: white,
    tabBarBorder: lightGray,
    searchBarBackgroundColor: white,
    searchBarTextColor: darkGray,
    carouselCardBackgroundColor: lightGray,
    categoryBarActiveColor: lightGray,
  },
  dark: {
    text: white,
    background: darker,
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: grey,
    tabIconSelected: white,
    tabBarBackgroundColor: black,
    tabBarBorderColor: darkGray,
    searchBarBackgroundColor: jetBlack,
    searchBarTextColor: lighter,
    carouselCardBackgroundColor: darkGray,
    categoryBarActiveColor: darkGray,
  },
};
