import { View, Text, useColorScheme, StatusBar, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CategoriesCards from "../components/CategoriesCards";
import { categories } from "../constants/Categories";
import { database } from "../utils/DatabaseProvider";
import FlatListCard from "../components/FlatListCard";
import { DataProps } from "../constants/DataInterface";


export default function DiscoverScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    contrastColor: isDarkMode? Colors.dark.tint : Colors.light.tint,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };

  const [activeCategory, setActiveCategory] = useState(0);
  const [discoverNews, setDiscoverNews] = useState<any>();
  const handleCategoryChange = (category: number) => {
    setActiveCategory(category);
    setDiscoverNews([]);
  }

  useEffect (() => {
    getDiscoverData(activeCategory)
  }, [activeCategory]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    <GestureHandlerRootView>
      <SafeAreaView style={[
        styles.rootView,
        {
          flexDirection: 'column',
          backgroundColor: colorStyle.backgroundColor,
        },
      ]}>
          <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={"transparent"}
              translucent={true}
            />
          <View style={[styles.safeAreaPadding]}>
            <View style={[{paddingLeft: 20, paddingRight: 20}]}>
              {/* Header */}
              <TouchableOpacity style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]} onPress={() =>navigation.navigate('Search')}>
                <TouchableOpacity>
                  <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
                </TouchableOpacity>
                <Text style={[{paddingLeft: 5, color: colorStyle.searchBarTextColor}]}>
                  Искать среди всех новостей
                </Text>
              </TouchableOpacity>
              
              {/* Title */}
              <Text style={[styles.textDiscoverScreenTitle,{color: colorStyle.textColor}]}>Обзор</Text>
            </View>

              
            <View>
              {/* Categories */}
              <CategoriesCards 
                categories={categories}
                activeCategory={activeCategory}
                handleCategoryChange={handleCategoryChange}
              />
            </View>
          
          </View>
            {
              !discoverNews ? (
                <Text>Loading</Text>
              ) : (
                <FlatList
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                  data={discoverNews}
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

export {DiscoverScreen};