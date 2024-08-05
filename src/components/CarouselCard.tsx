import React from "react";
import { View, Text, useColorScheme, Image, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";
import { DataProps } from "../constants/DataInterface";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";

export default function CarouselCard({ index, item, handleClick }: {item: DataProps, index: number, handleClick: (item: DataProps) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
  };

  const width = Dimensions.get('window').width;
  
  return(
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View
        style={[styles.cardStyle, {backgroundColor: colorStyle.backgroundColor}]}
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
          fontSize: 25,
          fontWeight: '500',
          color: "#ffffff",
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