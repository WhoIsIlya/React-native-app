import { View, Text, useColorScheme, StatusBar, SafeAreaView, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { DataProps } from "../constants/DataInterface";
import FlatListCard from "../components/FlatListCard";
import { database } from "../utils/DatabaseProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function SavedScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };
  const isFocused = useIsFocused();

  const [savedListData, setSavedListData] = useState<any>();

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('news');
      if (value !== null) {
        setSavedListData(JSON.parse(value));
      }
    } catch (error) {
      console.log("Error with asyncstorage:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      _retrieveData();
    }
  }, [isFocused]);

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return(
      <FlatListCard item={item} isLocalView={true} index={index}/>
    )
  }

  return (
    <SafeAreaView style={[styles.rootView, {backgroundColor: colorStyle.backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <View style={[styles.safeAreaPadding]}>
        <View style={[styles.container]}>
          <View style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]}>
            <TouchableOpacity>
              <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
            </TouchableOpacity>
            <TextInput
              placeholder="Искать среди всех новостей"
              style={[{paddingLeft: 5, color: colorStyle.textColor}]}
              placeholderTextColor={colorStyle.searchBarTextColor}
              cursorColor={colorStyle.textColor}
            />
          </View>
        </View>
        <View style={[{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 45}]}>
          <Text style={[styles.textDiscoverScreenTitle,{color: colorStyle.textColor}]}>Закладки</Text>
        </View>
        <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={savedListData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.articles}
            renderItem={renderItem}
            horizontal={false}
          />
      </View>
      
    </SafeAreaView>  
  );
}

export {SavedScreen};