import React, { useEffect } from "react";
import { View, Text, useColorScheme, Image, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { DataProps } from "../constants/DataInterface";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({ index, item, handleClick }: {item: DataProps, index: number, handleClick: (item: DataProps) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    oppositeSecondColor: isDarkMode ? '#777777' : '#333333',
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const width = Dimensions.get('window').width;
  
  return(
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View
        style={{
          height: "100%",
          justifyContent: 'flex-end',
          borderRadius: 15,
          backgroundColor: backgroundStyle.trueColor,
        }}
      >
        <Image
          source={{
            uri:
              item.image_url ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          resizeMode = 'cover'
          style={{
            width: width * 1, 
            height: width * 0.5,
            borderRadius: 15,
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 15,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={{ 
          textAlign: 'left',
          fontSize: 8,
          color: "#888888",
          paddingHorizontal: 20,
          paddingBottom: 10,
          position: 'absolute',
        }}>
          {item.source_name}
        </Text>
        <Text style={{ 
          textAlign: 'left',
          fontSize: 15,
          color: Colors.white,
          paddingHorizontal: 20,
          paddingBottom: 20,
          position: 'absolute',
        }}>
          {item.articles.length > 80
                  ? item.articles.slice(0, 78) + "..."
                  : item.articles}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}