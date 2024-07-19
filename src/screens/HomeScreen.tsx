import { View, Text, useColorScheme, StatusBar, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, GestureHandlerRootView, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import SnapCarousel from "../components/SnapCarousel";
import SkeletonContent from "../components/SkeletonContent";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Footer from "../components/Footer";
import { database } from "../utils/DatabaseProvider";
import { DataProps } from "../constants/DataInterface";

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#141414' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };

  const stylesLocal = StyleSheet.create ({
    text: {
        color: backgroundStyle.oppositeColor,
        fontSize: 13,
        textAlign: 'center',
    }
  });

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [carouselData, setCarouselData] = useState<any>();
  const [flatListData, setFlatListData] = useState<any>();

  const getCarouselData = async () => {
    try {
      const { data: carouselData, error, status } = await database
        .from('todos')
        .select('id, articles, image_url, source_name')
        .eq('is_carosel_item', true)
        .limit(5)
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }
      
      if (carouselData && carouselData.length > 0) {
        setCarouselData(carouselData);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const getFlatListData = async () => {
    try {
      const { data: flatListData, error, status } = await database
        .from('todos')
        .select('id, articles, image_url, source_name')
        .eq('is_carosel_item', false)
        .limit(20)
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }
      
      if (flatListData && flatListData.length > 0) {
        setFlatListData(flatListData);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
};

  useEffect(() => {
    getCarouselData();
    getFlatListData();
  }, []);

  const handleClick = (item: DataProps) => {
    navigation.navigate("ContentDetails", {item});
  };

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return (
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
          <View style={[styles.containerHelper]}>
            <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
              <Text style={[stylesLocal.text]}>{item.articles}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <View style={[ styles.mainView, {backgroundColor: backgroundStyle.backgroundColor}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={"transparent"}
          translucent={true}
        />
        {
          !flatListData ? (
            <SkeletonContent/>
          ) : (
            <FlatList 
              nestedScrollEnabled={true}
              scrollEnabled={true}
              ListHeaderComponent={<SnapCarousel data={carouselData} label={"BrakingNews"}/>}
              ListFooterComponent={<Footer/>}
              data={flatListData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.articles}
              renderItem={renderItem}
            />
          ) 
        }
      </View>   
    </GestureHandlerRootView>
  );
}

export {HomeScreen};