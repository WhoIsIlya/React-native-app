import React from "react";
import { Text, View, useColorScheme, StyleSheet, Dimensions } from "react-native";
import { styles } from "../styles/Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function SkeletonContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  
  const width = Dimensions.get('window').width;

  const localStyles = StyleSheet.create({
    carouselContainer: {
      width: width,
      height: width/2,
      borderRadius: 15,
    },
    text: {
      color: backgroundStyle.oppositeColor,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
  }
  });

  return (
    <View style={[
      styles.container,
      {
        flexDirection: 'column',
        backgroundColor: backgroundStyle.backgroundColor,
        flex:1, 
        paddingTop: 40
      },
    ]}>
      <Text style={[localStyles.text]}>Новости</Text>
      <View style={[styles.containerHelper, {paddingTop: 10}]}>
        <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: width/2*0.9,}]}>
        </View>
      </View>
      <View style={[styles.containerHelper]}>
        <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
        </View>
      </View>
      <View style={[styles.containerHelper]}>
        <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
        </View>
      </View>
      <View style={[styles.containerHelper]}>
        <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
        </View>
      </View>
    </View>
  );
}