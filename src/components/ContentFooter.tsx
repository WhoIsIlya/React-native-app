import React from "react";
import { useColorScheme, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/Colors";
import { DataProps } from "../constants/DataInterface";
import { Ionicons } from "@expo/vector-icons";

export default function ContentFooter({data}:{data:[DataProps]}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    touchableOpacityColor: isDarkMode ? Colors.dark.categoryBarInactiveColor : Colors.light.categoryBarInactiveColor,
    textColor: isDarkMode ? Colors.dark.icon : Colors.light.icon,
  };

  const stylesLocal = StyleSheet.create({
    footer: {
      flex: 1,
      marginLeft: 40,
      marginRight: 40,
      alignItems: 'center',
      paddingBottom: 40,
    },
    text: {
      color: colorStyle.textColor,
      fontWeight: 300,
      fontSize: 18,
      textAlign: 'center',
    },
    touchableOpacity: {
      width: 300,
      backgroundColor: colorStyle.touchableOpacityColor,
      padding: 10,
      borderRadius: 30,
    },
  });

  const _storeData = async () => {
    try {
      const asyncStorageRequest = await AsyncStorage.getItem('news');
      if (asyncStorageRequest) {
        var asyncStorageData = JSON.parse(asyncStorageRequest);
        var isPreviousSaved = false;
        if (asyncStorageData[0]) {
          for (const property in asyncStorageData){
            if (asyncStorageData[property].id == data[0].id) {
              isPreviousSaved = true;
            }
          }
          if (isPreviousSaved === false) {
            asyncStorageData.push(data[0]);
          }
        }
      } else {
        asyncStorageData = data;
      }
    } catch (error) {
      console.log("Error with reading asyncstorage:", error);
    }
    try {
      await AsyncStorage.setItem(
        'news',
        JSON.stringify(asyncStorageData),
      );
    } catch (error) {
      console.log("Error with writing asyncstorage:", error);
    }
  };
  
  return (
    <View style={[stylesLocal.footer]}>
      <TouchableOpacity 
        style={[stylesLocal.touchableOpacity,{
          flexDirection: 'row'
        }]}
        onPress={_storeData}
        
      >
        <Ionicons name="save" color={colorStyle.textColor} size={25} style={[{flex: 1, paddingLeft: 10}]}/>
        <Text style={[stylesLocal.text,{flex: 10}]}>Сохранить на устройстве</Text>
      </TouchableOpacity>
    </View>
  );
}