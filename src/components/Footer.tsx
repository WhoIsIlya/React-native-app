import React from "react";
import { useColorScheme, Text, View, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Footer() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const localStyles = StyleSheet.create({
    footer: {
      flex: 1,
      minHeight: 150,
    },
    text: {
      color: backgroundStyle.oppositeColor,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    }
  });
  
  return (
    <View style={[localStyles.footer]}>
      <Text style={[localStyles.text]}>@app</Text>
    </View>
  );
}