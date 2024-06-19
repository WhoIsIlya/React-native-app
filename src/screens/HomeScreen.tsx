import { View, Text, useColorScheme, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const stylesLocal = StyleSheet.create ({
    text: {
        color: backgroundStyle.oppositeColor,
        fontWeight: 'bold',
        fontSize: 48,
        textAlign: 'center',
    }
});

  return (
    <GestureHandlerRootView>
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
      </View>  
    </GestureHandlerRootView>

  );
}

export {HomeScreen};