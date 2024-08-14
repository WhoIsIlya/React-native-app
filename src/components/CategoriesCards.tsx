import React from "react";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";

export default function CategoriesCards({categories, activeCategory, handleCategoryChange}:{categories: {id: number, title: string}[], activeCategory: number, handleCategoryChange: (index: number) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    categoryBarActiveColor: isDarkMode ? Colors.dark.categoryBarActiveColor : Colors.light.categoryBarActiveColor,
    categoryBarInactiveColor: isDarkMode ? Colors.dark.categoryBarInactiveColor : Colors.light.categoryBarInactiveColor,
    categoryBarActiveTextColor: isDarkMode ? Colors.dark.categoryBarActiveTextColor : Colors.light.categoryBarActiveTextColor,
    categoryBarInactiveTextColor: isDarkMode ? Colors.dark.categoryBarInactiveTextColor : Colors.light.categoryBarInactiveTextColor,
  };

  return(
    <View style={[styles.categoriesCardsRootView]}>
      {
        categories.map((category: {id: number, title: string}, index: number) => {
          let isActive = category.id == activeCategory;
          let activeButtonColor = isActive ? colorStyle.categoryBarActiveColor : colorStyle.categoryBarInactiveColor;
          let activeTextColor = isActive ? colorStyle.categoryBarActiveTextColor : colorStyle.categoryBarInactiveTextColor;

          return(
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryChange(index)}
              style={[styles.categoriesCardsTouchableOpacity]}
            >
              <View style={[{
                backgroundColor: activeButtonColor,
                padding: 5,
                borderRadius: 15,
              }]}>
                <Text style={[{
                  color: activeTextColor,
                  padding: 5
                }
                ]}> 
                  {category.title} 
                </Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}