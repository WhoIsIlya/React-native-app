import React from "react";
import { View, Text, useColorScheme, Image, Dimensions, StyleSheet } from "react-native";
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

  const stylesLocal = StyleSheet.create ({
    image: {
      width: width * 1, 
      height: width * 0.5,
      borderRadius: 15,
    },
  });
  
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
          style={stylesLocal.image}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.carouselLinearGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={styles.carouselSourceTextStyle}>
          {item.source_name}
        </Text>
        <Text style={styles.carouselTitleTextStyle}>
          {item.articles.length > 80
            ? item.articles.slice(0, 78) + "..."
            : item.articles
          }
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}