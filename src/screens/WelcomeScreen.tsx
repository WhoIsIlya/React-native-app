import { View, Text, ImageBackground, TouchableOpacity, useColorScheme, StatusBar, Button, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { styles } from "../styles/Styles"
import { LinearGradient } from "expo-linear-gradient";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../constants/Colors";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '30%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <GestureHandlerRootView style={styles.flex}>
      <BottomSheetModalProvider>
        <ImageBackground
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Yoshkar-Ola_P8122176_2200.jpg/1920px-Yoshkar-Ola_P8122176_2200.jpg'
          }}
          style={[styles.backgroundImage]}
        >
          <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={'transparent'}
              translucent={true}
            />
          <LinearGradient 
            colors={[ isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)', isDarkMode ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,1)']}
            style={[styles.backgroundGradientFullscreen]}
            start={{ x: 0.5, y:0.4 }}
            end={{ x:0.5, y:1 }}
          />
          <View style={[styles.welcomeViewBox]}>
            <Text style={[styles.textWhiteBig]}>{'WELCOME'}</Text>
            <Text style={[styles.textWhiteSmall]}>Hello, and welcome</Text> 
          </View>
          <View style={[styles.touchableOpacityViewBox]}>
            <LinearGradient
                  colors={['rgba(140,140,255,1)', 'rgba(255,140,140,1)']}
                  style={[{borderRadius: 15}]}
                  start={{ x: 0.0, y:0.0 }}
                  end={{ x: 1, y: 1 }}
            >
              <Pressable
                onPress={handlePresentModalPress}
                style={[styles.touchableOpacity]}
              >
                <Text style={[styles.homeScreenText]}>Getting started</Text>  
              </Pressable>
            </LinearGradient>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundStyle={[{backgroundColor: isDarkMode ? "#363636" : "#ffffff",}]}
              handleStyle={[{backgroundColor: isDarkMode ? "#363636" : "#ffffff",}]}
              handleIndicatorStyle={[{backgroundColor: isDarkMode ? "#aaaaaa" : "#909090",}]}
            >
              <BottomSheetView style={[styles.contentContainer, {backgroundColor: isDarkMode ? "#363636" : "#ffffff",}]}>
                <View style={[{marginBottom:30, marginHorizontal: 10, maxWidth: 400}]}>
                  <Text style={[styles.homeScreenText, {color: colorStyle.textColor}]}>Hello, the application is provided "As is", for feedback:</Text>
                  <Text style={[styles.homeScreenText, {color: colorStyle.textColor}]}>worked.mail@mail.ru</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.touchableOpacityModal]}
                  onPress={() => navigation.navigate('HomeTabs')}
                >
                  <Text style={[styles.homeScreenText]}>Apply</Text>
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </ImageBackground>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
  
export {WelcomeScreen};