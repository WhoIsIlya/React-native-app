import { View, Text, ImageBackground, TouchableOpacity, useColorScheme, StatusBar } from "react-native";
import React from "react";
import { styles } from "../styles/Styles"
import { LinearGradient } from "expo-linear-gradient";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <ImageBackground
      source={require('../../assets/images/splash.png')}
      style={[styles.backgroundImage]}
    >
      <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? 'rgba(0,0,0,0.81)' : backgroundStyle.backgroundColor}
        />
      <LinearGradient 
        colors={[ isDarkMode ? 'rgba(0,0,0,0.8)' : 'transparent', isDarkMode ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.8)']}
        style={[styles.backgroundGradientFullscreen]}
        start={{ x: 0.5, y:0.5 }}
        end={{ x:0.5, y:1 }}
      />
      <View style={[styles.welcomeViewBox]}>
        <Text style={[styles.textWhite]}>{'WELCOME'}</Text>
        <Text style={[styles.textWhiteSmall]}>Hello, and welcome</Text> 
      </View>
      <View style={[styles.touchableOpacityViewBox]}>
        <TouchableOpacity 
          style={[styles.touchableOpacity]}
          onPress={() => navigation.navigate('HomeTabs')}  
        >
          <Text style={[styles.textWhiteMedium]}>Getting started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export {WelcomeScreen};