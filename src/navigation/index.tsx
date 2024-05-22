import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import { registerRootComponent } from 'expo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Discover" component={DiscoverScreen}/>
        <Tab.Screen name="Saved" component={SavedScreen}/>
        <Tab.Screen name="Search" component={SearchScreen }/>
      </Tab.Navigator>
    );
  };

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={TabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

registerRootComponent (App);