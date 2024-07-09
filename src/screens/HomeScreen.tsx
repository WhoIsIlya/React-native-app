import { View, Text, useColorScheme, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, GestureHandlerRootView, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchBusinessNews } from "../utils/Api";
import SnapCarousel from "../components/SnapCarousel";
import SkeletonContent from "../components/SkeletonContent";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#141414' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const stylesLocal = StyleSheet.create ({
    text: {
        color: backgroundStyle.oppositeColor,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
  });

  const [breakingNews, setBreakingNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);
  
  const { data: breakingNewsData, isLoading: isBreakingNewsLoading, isSuccess: isBreakingNewsLoadSuccess, isError: isBreakingNewsError} = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    setBreakingNews(breakingNewsData);
  }, [isBreakingNewsLoadSuccess])
  
  const { data: businessNewsData, isLoading: isBusinessNewsLoading, isSuccess: isBusinessNewsLoadSuccess, isError: isBusinessNewsError} = useQuery({
    queryKey: ["businessNews"],
    queryFn: fetchBusinessNews,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    setBusinessNews(businessNewsData);
  }, [isBusinessNewsLoadSuccess])

  const renderFlatListItem = () => {
    return (
      <View style={[styles.container]}>
        <TouchableWithoutFeedback>
          <View style={[styles.containerHelper]}>
            <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
              <Text style={[stylesLocal.text]}></Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <View style={[ styles.mainView, {backgroundColor: backgroundStyle.backgroundColor}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={"transparent"}
          translucent={true}
        />
        {
          isBreakingNewsLoading && isBusinessNewsLoading ? (
            <SkeletonContent/>
          ) : (
            <FlatList 
              ListHeaderComponent={<SnapCarousel data={breakingNewsData} label={"BrakingNews"}/>}
              data={businessNewsData.articles}
              renderItem={renderFlatListItem}
            />
          )
        }
      </View>   
    </GestureHandlerRootView>
  );
}

export {HomeScreen};