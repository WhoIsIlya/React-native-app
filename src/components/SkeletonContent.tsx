import React from "react";
import { Text, View, useColorScheme, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "../styles/Styles";
import { Colors } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SkeletonContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    contrastColor: isDarkMode? Colors.dark.tint : Colors.light.tint,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
    carouselCardBackgroundColor: isDarkMode ? Colors.dark.carouselCardBackgroundColor : Colors.light.carouselCardBackgroundColor,
  };
  const width = Dimensions.get('window').width;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const localStyles = StyleSheet.create({
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

  return (
    <SafeAreaView style={[styles.safeAreaPadding]}>
      <View style={[styles.containerSkeleton]}>
        <TouchableOpacity style= {[styles.searchView, {backgroundColor: colorStyle.searchBarBackgroundColor}]} onPress={() =>navigation.navigate('Search')}>
          <TouchableOpacity>
            <Ionicons name="search" color={colorStyle.searchBarTextColor} size={15}/>
          </TouchableOpacity>
          <Text style={[{paddingLeft: 5, color: colorStyle.searchBarTextColor}]}>
            Искать среди всех новостей
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.containerSkeleton]}>
        <Text style={[localStyles.text]}>От редакции</Text>
        
        <View style={[styles.containerHelper, {paddingTop: 10}]}>
          <View style={[styles.cardInfo, {backgroundColor: colorStyle.carouselCardBackgroundColor, minHeight: width/2*0.9,}]}>
            <LinearGradient
              colors={[isDarkMode ? 'transparent' : colorStyle.backgroundColor, isDarkMode ? colorStyle.backgroundColor : 'transparent']}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderRadius: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        </View>
        
        <Text style={[localStyles.text]}>Новости</Text>
        <View style={[styles.containerHelper, {paddingTop: 10}]}>
          <View style={[styles.cardInfo, {backgroundColor: colorStyle.carouselCardBackgroundColor, minHeight: 160}]}>
            <LinearGradient
              colors={[isDarkMode ? 'transparent' : colorStyle.backgroundColor, isDarkMode ? colorStyle.backgroundColor : 'transparent']}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderRadius: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        </View>
        <View style={[styles.containerHelper]}>
          <View style={[styles.cardInfo, {backgroundColor: colorStyle.carouselCardBackgroundColor, minHeight: 160}]}>
            <LinearGradient
              colors={[isDarkMode ? 'transparent' : colorStyle.backgroundColor, isDarkMode ? colorStyle.backgroundColor : 'transparent']}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderRadius: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        </View>
        <View style={[styles.containerHelper]}>
          <View style={[styles.cardInfo, {backgroundColor: colorStyle.carouselCardBackgroundColor, minHeight: 160}]}>
            <LinearGradient
              colors={[isDarkMode ? 'transparent' : colorStyle.backgroundColor, isDarkMode ? colorStyle.backgroundColor : 'transparent']}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderRadius: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
        </View>
      </View>
      
    </SafeAreaView>
    // <View style={[
    //   styles.container,
    //   {
    //     flexDirection: 'column',
    //     backgroundColor: backgroundStyle.backgroundColor,
    //     flex:1, 
    //     paddingTop: 40
    //   },
    // ]}>
    //   <Text style={[localStyles.text]}>Новости</Text>
    //   <View style={[styles.containerHelper, {paddingTop: 10}]}>
    //     <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: width/2*0.9,}]}>
    //     </View>
    //   </View>
    //   <View style={[styles.containerHelper]}>
    //     <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
    //     </View>
    //   </View>
    //   <View style={[styles.containerHelper]}>
    //     <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
    //     </View>
    //   </View>
    //   <View style={[styles.containerHelper]}>
    //     <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160}]}>
    //     </View>
    //   </View>
    // </View>
  );
}