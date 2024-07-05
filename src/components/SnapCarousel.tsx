import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Card from "./Card";

interface ItemProps {
  title: string;
  author: string;
}

export default function SnapCarousel(data: any, label: any) {
  
  const ref = React.useRef<ICarouselInstance>(null);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
  const handleClick = (item: any) => {
    navigation.navigate("ContentDetails", item);
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
      <View style={{ flex: 1}}>
        <Carousel
          loop
          width={width}
          height={width/2}
          autoPlay={true}
          mode={'parallax'}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 30,
            parallaxAdjacentItemScale: 0.9,
          }}
          autoPlayInterval={5000}
          data={data.data.articles}
          scrollAnimationDuration={3000}
          renderItem={({ index, item }: {item: ItemProps, index: number}) => (
            <Card item={item} index={index}/>
          )}
        />
    </View>
    </View>
  );
}