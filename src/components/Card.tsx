import React, { useEffect } from "react";
import { View, Text, useColorScheme } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { DataProps } from "../constants/DataInterface";

export default function Card({ index, item, handleClick }: {item: DataProps, index: number, handleClick: (item: DataProps) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  return(
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View
        style={{
          height: "100%",
          justifyContent: 'center',
          borderRadius: 15,
          backgroundColor: backgroundStyle.trueColor,
        }}
      >
        <Text style={{ 
          textAlign: 'center',
          fontSize: 15,
          color: backgroundStyle.oppositeColor,
          padding: 20,
        }}>
          {item.articles}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}