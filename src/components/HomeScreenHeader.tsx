import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Dimensions, useColorScheme, TouchableOpacity, SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarouselCard from "./CarouselCard";
import { Colors } from "../constants/Colors";
import { DataProps } from "../constants/DataInterface";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/Styles";

export default function HomeScreenHeader({data, label}: {data: any, label: string}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
  const handleClick = (item: DataProps) => {
    navigation.navigate("ContentDetails", {item});
  };

  const width = Dimensions.get('window').width;

  const stylesLocal = StyleSheet.create({
    carouselContainer: {
      width: width,
      height: width/2,
      borderRadius: 15,
    },
    text: {
      color: colorStyle.textColor,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    }
  });
  
  return(
    <SafeAreaView style={[styles.safeAreaPadding]}>

      <View style={[styles.container]}>
        <TouchableOpacity style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]} onPress={() =>navigation.navigate('Search')}>
          <TouchableOpacity>
            <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
          </TouchableOpacity>
          <Text style={[{color: colorStyle.searchBarTextColor, paddingLeft: 5}]}>
            Искать среди всех новостей
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[stylesLocal.text]}>От редакции</Text>
     
      <View style={stylesLocal.carouselContainer}>
        <View style={styles.flex}>
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
            data={data}
            scrollAnimationDuration={500}
            renderItem={({ index, item }: {item: DataProps, index: number}) => (
              <CarouselCard item={item} index={index} handleClick={handleClick}/>
            )}
          />
        </View>
      </View>

      <Text style={[stylesLocal.text]}>Новости</Text>

    </SafeAreaView>
  );
}