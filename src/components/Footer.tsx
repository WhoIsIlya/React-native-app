import React from "react";
import { useColorScheme, Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";

export default function Footer() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
  };

  const localStyles = StyleSheet.create({
    text: {
      color: colorStyle.textColor,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    }
  });
  
  return (
    <View style={[styles.footerView]}>
      <Text style={[localStyles.text]}>@app</Text>
    </View>
  );
}