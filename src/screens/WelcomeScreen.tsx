import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/Styles"
import { LinearGradient } from "expo-linear-gradient";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <ImageBackground
      source={require('../../assets/images/splash.png')}
      style={[styles.backgroundImage]}
    >
      <LinearGradient 
        colors={['transparent', 'rgba(0,0,0,0.8)']}
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