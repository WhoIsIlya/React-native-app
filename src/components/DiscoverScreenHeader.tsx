import React from "react";
import { Text, View, useColorScheme, TouchableOpacity,SafeAreaView } from "react-native";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import CategoriesCards from "./CategoriesCards";
import { Colors } from "../constants/Colors";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function DiscoverScreenHeader ({categories, activeCategory, handleCategoryChange}:{categories: {id: number, title: string}[], activeCategory: number, handleCategoryChange: (index: number) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

        <Text style={[styles.textDiscoverScreenTitle,{color: colorStyle.textColor}]}>Категории</Text>
        
      </View>

      <View style={[styles.flex]}>
        <CategoriesCards 
          categories={categories}
          activeCategory={activeCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </View>

    </SafeAreaView>
  )
}