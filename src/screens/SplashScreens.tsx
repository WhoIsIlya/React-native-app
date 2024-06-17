import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from '../styles/Styles'
import { LinearGradient } from 'expo-linear-gradient';



export default function SplashScreens() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [fontsLoaded, fontError] = useFonts({
      SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
      SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
      SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    });

    const onLayoutRootView = useCallback(async() => {
      if(fontsLoaded || fontError){
        await SplashScreen.hideAsync();
      }

      setTimeout(() => {
        navigation.navigate('Welcome');
      }, 3000);
    },[]);

    useEffect(() => {
      onLayoutRootView();
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded) {
      return null;
    }


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
        <View onLayout={onLayoutRootView}>
          <Text style={[styles.text]}>APP</Text>
        </View>
      </ImageBackground>
    );
}

export {SplashScreens};