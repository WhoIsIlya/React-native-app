import React, { useEffect } from "react";
import { View, Text, useColorScheme } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

interface ItemProps {
  title: string;
  author: string;
}

export default function Card({ index, item }: {item: ItemProps, index: number}) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  
  useEffect (() => {
    console.log(item);
  })
  return(
    <View
      style={{
        flex: 1,
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
        {item.title.slice (0, item.title.length - item.author.length - 3)}
      </Text>
    </View>    
  );
}