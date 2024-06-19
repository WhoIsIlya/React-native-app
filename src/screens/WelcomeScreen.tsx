import { View, Text, ImageBackground, TouchableOpacity, useColorScheme, StatusBar, Button, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { styles } from "../styles/Styles"
import { LinearGradient } from "expo-linear-gradient";
import { Link, ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
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

  const stylesLocal = StyleSheet.create ({
    text: {
        color: backgroundStyle.oppositeColor,
        fontSize: 20, 
        textAlign: 'left', 
        fontWeight: 200,
    }
});

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ImageBackground
          source={require('../../assets/images/splash.png')}
          style={[styles.backgroundImage]}
        >
          <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? 'rgba(0,0,0,0.81)' : backgroundStyle.backgroundColor}
            />
          <LinearGradient 
            colors={[ isDarkMode ? 'rgba(0,0,0,0.8)' : 'transparent', isDarkMode ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.4  )']}
            style={[styles.backgroundGradientFullscreen]}
            start={{ x: 0.5, y:0.5 }}
            end={{ x:0.5, y:1 }}
          />
          <View style={[styles.welcomeViewBox]}>
            <Text style={[styles.textWhite]}>{'WELCOME'}</Text>
            <Text style={[styles.textWhiteSmall]}>Hello, and welcome</Text> 
          </View>
          <View style={[styles.touchableOpacityViewBox]}>
            <Pressable
              onPress={handlePresentModalPress}
              style={[styles.touchableOpacity]}
            >
              <Text style={[{color: Colors.white, textAlign: 'center', fontSize: 24, fontWeight: '200'}]}>Getting started</Text>
            </Pressable>
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
                  <Text style={[stylesLocal.text]}>Hello, the application is provided "As is", for feedback:</Text>
                  <Text style={[stylesLocal.text]}>worked.mail@mail.ru</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.touchableOpacityModal]}
                  onPress={() => navigation.navigate('HomeTabs')}
                >
                  <Text style={[{color: Colors.white, textAlign: 'center', fontSize: 24, fontWeight: '300'}]}>Apply</Text>
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