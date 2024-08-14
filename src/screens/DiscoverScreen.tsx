import { useColorScheme, StatusBar, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { categories } from "../constants/Categories";
import { database } from "../utils/DatabaseProvider";
import FlatListCard from "../components/FlatListCard";
import { DataProps } from "../constants/DataInterface";
import DiscoverScreenHeader from "../components/DiscoverScreenHeader";


export default function DiscoverScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
  };

  const [activeCategory, setActiveCategory] = useState(0);
  const [discoverNews, setDiscoverNews] = useState<any>();
  const [isLoading, setIsLoaading] = useState<boolean>();

  const handleCategoryChange = (category: number) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setIsLoaading(true);
      setDiscoverNews([]);
    }
  }

  useEffect (() => {
    getDiscoverData(activeCategory)
  }, [activeCategory]);

  const getDiscoverData = async (category: number) => {
    try {
      const { data: discoverData, error, status } = await database
        .from('todos')
        .select('id, articles, image_url, source_name')
        .eq('category', category)
        .limit(20)
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }
      
      if (discoverData && discoverData.length > 0) {
        setDiscoverNews(discoverData);
        setIsLoaading(false);
      }
      
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return(
      <FlatListCard item={item}/>
    )
  }
  
  return (
    <SafeAreaView style={[styles.rootView,{backgroundColor: colorStyle.backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"transparent"}
        translucent={true}
      />

      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={true}
        ListHeaderComponent={<DiscoverScreenHeader categories={categories} activeCategory={activeCategory} handleCategoryChange={handleCategoryChange}/>}
        data={!isLoading ? discoverNews : ''}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.articles}
        renderItem={renderItem}
        horizontal={false}
      />
    </SafeAreaView>
  );
}

export {DiscoverScreen};