import { View, Text, useColorScheme, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews } from "../utils/Api";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [breakingNews, setBreakingNews] = useState([]);
  const [businessNews, setbusinessNews] = useState([]);
  const [technologyNews, settechnologyNews] = useState([]);

  //Breaking news

  const { data, isLoading, isError} = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews
  });

  const stylesLocal = StyleSheet.create ({
    text: {
        color: backgroundStyle.oppositeColor,
        fontWeight: 'bold',
        fontSize: 48,
        textAlign: 'center',
    }
});

  return (
    <GestureHandlerRootView>
      <View style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: backgroundStyle.backgroundColor, 
        },
        ]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </View>  
    </GestureHandlerRootView>

  );
}

export {HomeScreen};