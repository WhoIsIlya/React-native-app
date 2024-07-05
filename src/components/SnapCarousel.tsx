import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Card from "./Card";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ItemProps {
  title: string;
}

export default function SnapCarousel(data: any, label: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  const ref = React.useRef<ICarouselInstance>(null);

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
          //onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index, item }: {item: ItemProps, index: number}) => (
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
                {/*item.title.length > 90 ? item.title.slice (0, 88) + "..." : item.title*/}
                {item.title}
              </Text>
            </View>
          )}
        />
    </View>
    </View>
  );
}