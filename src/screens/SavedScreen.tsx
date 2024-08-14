import { View, Text, useColorScheme, StatusBar, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { DataProps } from "../constants/DataInterface";
import FlatListCard from "../components/FlatListCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SavedScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [savedListData, setSavedListData] = useState<any>();

  const _clearData = async () => {
    try {
      await AsyncStorage.setItem(
        'news',
        '',
      );
      setSavedListData(undefined);
    } catch (error) {
      console.log("Error clearing async storage: ", error);
    }
  }

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

  const stylesLocal = StyleSheet.create ({
    touchableOpacity: {
      backgroundColor: colorStyle.searchBarBackgroundColor, 
      borderRadius: 15,
      height: 35,
      paddingLeft: 15,
      paddingRight: 15,
    },
    searchText: {
      color: colorStyle.searchBarTextColor,
      paddingLeft: 5,
    },
    text: {
      color: colorStyle.textColor,
      flex: 1,
    },
    touchableOpacityText: {
      color: colorStyle.textColor,
      flex: 1,
      alignSelf: 'flex-end',
      textAlignVertical:'center',
      fontSize: 12,
      textAlign: 'center',
    }
  })

  return (
    <SafeAreaView style={[styles.rootView, {backgroundColor: colorStyle.backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <View style={[styles.safeAreaPadding]}>
        <View style={[styles.container]}>
          <TouchableOpacity style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]} onPress={() =>navigation.navigate('Search')}>
            <TouchableOpacity>
              <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
            </TouchableOpacity>
            <Text style={[stylesLocal.searchText]}>
              Искать среди всех новостей
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.savedScreenView]}>
          <Text style={[styles.textDiscoverScreenTitle, stylesLocal.text]}>Сохраненное</Text>
          <View style={[styles.paddingTop5]}>
            <TouchableOpacity 
              style={[stylesLocal.touchableOpacity]}
              onPress={_clearData}
            >
              <Text style={[stylesLocal.touchableOpacityText]}>Очистить</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={savedListData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.articles}
            renderItem={renderItem}
            horizontal={false}
            inverted={true}
          />
      </View>   
    </SafeAreaView>  
  );
}

export {SavedScreen};