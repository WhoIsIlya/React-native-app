import { View, Text, useColorScheme, StatusBar, SafeAreaView, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { DataProps } from "../constants/DataInterface";
import FlatListCard from "../components/FlatListCard";
import { database } from "../utils/DatabaseProvider";
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
            <Text style={[{paddingLeft: 5, color: colorStyle.searchBarTextColor}]}>
              Искать среди всех новостей
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20, paddingTop: 45}]}>
          <Text style={[styles.textDiscoverScreenTitle,{color: colorStyle.textColor, flex: 1}]}>Сохраненное</Text>
          <View style={[{paddingTop: 5}]}>
            <TouchableOpacity 
              style={[{
                backgroundColor: colorStyle.searchBarBackgroundColor, 
                borderRadius: 15,
                height: 35,
                paddingLeft: 15,
                paddingRight: 15,
              }]}
              onPress={_clearData}
            >
              <Text style={[styles.textWhiteSmall,{color: colorStyle.textColor, flex: 1, alignSelf: 'flex-end', textAlignVertical:'center'}]}>Очистить</Text>
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