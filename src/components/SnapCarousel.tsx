import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Card from "./Card";
import CustomCarousel from "./CustomCarousel";

export default function SnapCarousel(data: any, label: any) {
  const ref = React.useRef<ICarouselInstance>(null);
  const data2 = [...new Array(6).keys()];

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
  const handleClick = (item: any) => {
    navigation.navigate("NewsDetails", item);
  };

  const width = Dimensions.get('window').width;

  const localStyles = StyleSheet.create({
    carouselContainer: {
      width: width,
      height: width/2,
      borderRadius: 15,
    }
  });
  
  return(
    <View style={localStyles.carouselContainer}>
      <CustomCarousel/>
    </View>
  );
}