import React, { useEffect } from "react";
import { View, Text, useColorScheme, StatusBar } from "react-native";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

export default function CategoriesCards({categories, activeCategory, handleCategoryChange}:{categories: {id: number, title: string}[], activeCategory: number, handleCategoryChange: (index: number) => void}) {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    contrastColor: isDarkMode? Colors.dark.tint : Colors.light.tint,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
    categoryBarActiveColor: isDarkMode ? Colors.dark.categoryBarActiveColor : Colors.light.categoryBarActiveColor,
  };

  return(
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle= {[{
          paddingRight: 20,
          paddingLeft: 20,
        }]}
      >
        {
          categories.map((category: any, index: number) => {
            let isActive = category.id == activeCategory;
            let activeButtonColor = isActive ? colorStyle.categoryBarActiveColor : colorStyle.searchBarBackgroundColor;

            return(
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoryChange(index)}
                style={[{
                  paddingRight: 10,
                }]}
              >
                <View style={[{
                  backgroundColor: activeButtonColor,
                  padding: 5,
                  borderRadius: 15,
                }]}>
                  <Text style={[{
                    color: colorStyle.searchBarTextColor,
                    padding: 5
                  }
                  ]}> 
                    {category.title} 
                  </Text>
                </View>
                
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </View>
  )
}