import { View, Text, useColorScheme, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews } from "../utils/Api";
import SnapCarousel from "../components/SnapCarousel";
import Carousel from "react-native-reanimated-carousel";

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

  const [breakingNews, setBreakingNews] = useState([]);
  const [businessNews, setbusinessNews] = useState([]);
  const [technologyNews, settechnologyNews] = useState([]);
  
  const { data, isLoading, isSuccess, isError} = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    setBreakingNews(data);
  }, [isSuccess])
  
  

  return (
    <GestureHandlerRootView>
      <View style={[ styles.mainView, {backgroundColor: backgroundStyle.backgroundColor}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView>
          <View style={[styles.mainContainer]}>
            <View style={[styles.mainContainerHelper]}>
              <LinearGradient
                colors={[ isDarkMode ? 'rgba(140,140,255,0.3)' : 'rgba(0,0,140,0.4  )', isDarkMode ? 'rgba(255,140,140,0.3)' : 'rgba(140,0,0,0.4)']}
                style={[styles.containerHelperGradient]}
                start={{ x: 0.0, y:0.0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={[stylesLocal.text]}>Hello!</Text>
              </LinearGradient>
            </View>
          </View>
          <SnapCarousel/>
          <View style={[styles.container]}>
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
        </ScrollView>
      </View>  
    </GestureHandlerRootView>

  );
}

export {HomeScreen};