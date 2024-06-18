import { View, Text, useColorScheme, StatusBar } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";

export default function SearchScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <View style={[
      styles.container,
      {
        flexDirection: 'column',
        backgroundColor: backgroundStyle.backgroundColor, 
      },
    ]}>
      <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      <Text style={[{color: isDarkMode ? Colors.white : Colors.black}]}>SearchScreen</Text>
    </View>  
  );
}

export {SearchScreen};