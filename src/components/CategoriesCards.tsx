import React from "react";
import { View, Text, useColorScheme, StatusBar } from "react-native";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";

export default function CategoriesCards({categories, activeCategory, handleCategoryChange}:{categories: any, activeCategory: any, handleCategoryChange: any}) {
    const isDarkMode = useColorScheme() === 'dark';
    const colorStyle = {
        backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
        contrastColor: isDarkMode? Colors.dark.tint : Colors.light.tint,
        textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
        searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
        searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
    };

    return(
        <Text>
            Hello world!
        </Text>
    )
}