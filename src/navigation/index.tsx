import { registerRootComponent } from 'expo';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import SplashScreens from '../screens/SplashScreens';
import WelcomeScreen from '../screens/WelcomeScreen';
import ContentDetailsScreen from '../screens/ContentDetailsScreen';
import { Ionicons } from "@expo/vector-icons"
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: isDarkMode  ? '#ffffff' : '#454545',
          tabBarInactiveTintColor: isDarkMode  ? '#888888' : '#aaaaaa',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: isDarkMode  ? "black" : "white",
            borderColor: isDarkMode ? "#444444": "#dddddd",
            elevation: isDarkMode  ? 0 : 3,
            height: 50,
          },  
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Discover" 
          component={DiscoverScreen}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedScreen}
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen }
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreens}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen 
          name="ContentDetails" 
          component={ContentDetailsScreen}
          options={{animation: "slide_from_bottom"}}
        />

        <Stack.Screen name="HomeTabs" component={TabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent (App);