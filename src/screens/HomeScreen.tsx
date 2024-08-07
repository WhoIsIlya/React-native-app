import { View, useColorScheme, StatusBar, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import HomeScreenHeader from "../components/HomeScreenHeader";
import SkeletonContent from "../components/SkeletonContent";
import Footer from "../components/Footer";
import FlatListCard from '../components/FlatListCard'
import { database } from "../utils/DatabaseProvider";
import { DataProps } from "../constants/DataInterface";
import { styles } from "../styles/Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
  };

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

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return(
      <FlatListCard item={item}/>
    )
  }

  return (
    <GestureHandlerRootView>
    <SafeAreaView style={[ styles.rootView, {backgroundColor: backgroundStyle.backgroundColor}]}>
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
            ListHeaderComponent={<HomeScreenHeader data={carouselData} label={"BrakingNews"}/>}
            ListFooterComponent={<Footer/>}
            data={flatListData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.articles}
            renderItem={renderItem}
            horizontal={false}
          />
        ) 
      }
    </SafeAreaView>
    </GestureHandlerRootView>  
  );
}

export {HomeScreen};