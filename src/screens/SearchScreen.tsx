import { View, Text, useColorScheme, StatusBar, TouchableOpacity, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SearchScreen() {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    contrastColor: isDarkMode? Colors.dark.tint : Colors.light.tint,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const inputRef = useRef<any>();
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  }

  useEffect(() => {
    if (isFocused) {
      onFocusHandler();
    }
  }, [isFocused]);

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
            <View style={[styles.container]}>
              {/* Header */}
              <View style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]}>
                <TouchableOpacity>
                  <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
                </TouchableOpacity>
                <TextInput
                  ref={inputRef}
                  placeholder="Искать среди всех новостей"
                  style={[{paddingLeft: 5, color: colorStyle.textColor}]}
                  placeholderTextColor={colorStyle.searchBarTextColor}
                  cursorColor={colorStyle.textColor}
                  
                />
              </View>

              {/* Search */}
            </View>
          </View> 
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export {SearchScreen};