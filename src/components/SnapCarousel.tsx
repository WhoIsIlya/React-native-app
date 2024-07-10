import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Card from "./Card";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ItemProps {
  title: string;
  author: string;
}

export default function SnapCarousel({data, label}: {data: any, label: string}) {
  
  const ref = React.useRef<ICarouselInstance>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
  const handleClick = (item: ItemProps) => {
    navigation.navigate("ContentDetails", item);
  };

  const width = Dimensions.get('window').width;

  const localStyles = StyleSheet.create({
    carouselContainer: {
      width: width,
      height: width/2,
      borderRadius: 15,
    },
    text: {
      color: backgroundStyle.oppositeColor,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    }
  });
  
  return(
    <View style={[{flex:1, paddingTop: 40}]}>
      <Text style={[localStyles.text]}>Новости</Text>
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
            data={data.articles}
            scrollAnimationDuration={500}
            renderItem={({ index, item }: {item: ItemProps, index: number}) => (
              <Card item={item} index={index} handleClick={handleClick}/>
            )}
          />
        </View>
      </View>
    </View>
  );
}