import React from "react";
import { useColorScheme, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/Colors";
import { DataProps } from "../constants/DataInterface";
import { Ionicons } from "@expo/vector-icons";

export default function ContentFooter({data}:{data:[DataProps]}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    touchableOpacityColor: isDarkMode ? Colors.dark.categoryBarInactiveColor : Colors.light.categoryBarInactiveColor,
    textColor: isDarkMode ? Colors.dark.icon : Colors.light.icon,
  };

  const localStyles = StyleSheet.create({
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
      const value = await AsyncStorage.getItem('news');
      if (value !== null) {
        var asyncStorageData = JSON.parse(value);
        asyncStorageData.push(data[0]);
      }
    } catch (error) {
      console.log("Error with asyncstorage:", error);
    }
    try {
      await AsyncStorage.setItem(
        'news',
        JSON.stringify(asyncStorageData),
      );
    } catch (error) {
      console.log("Error with asyncstorage:", error);
    }
  };
  
  return (
    <View style={[localStyles.footer]}>
      <TouchableOpacity 
        style={[localStyles.touchableOpacity,{
          flexDirection: 'row'
        }]}
        onPress={_storeData}
        
      >
        <Ionicons name="save" color={colorStyle.textColor} size={25} style={[{flex: 1, paddingLeft: 10}]}/>
        <Text style={[localStyles.text,{flex: 10}]}>Сохранить на устройстве</Text>
      </TouchableOpacity>
    </View>
  );
}