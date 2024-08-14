import { View, Text, ActivityIndicator, Dimensions, StyleSheet, useColorScheme, FlatList, StatusBar, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { DataProps, ParamList } from "../constants/DataInterface";
import { database } from "../utils/DatabaseProvider";
import { styles } from "../styles/Styles";
import { Colors } from '../constants/Colors'
import ContentFooter from "../components/ContentFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function ContentDetailsScreen() {  
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
  };

  const item = useRoute<RouteProp<ParamList, 'ContentDetails'>>();
  const [flatListData, setFlatListData] = useState<any>();

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('news');
      if (value !== null) {
        const parseAsyncStorageData = JSON.parse(value);
        setFlatListData([parseAsyncStorageData[item.params.index]]);
      }
    } catch (error) {
      console.log("Error with asyncstorage:", error);
    }
  };

  const getFlatListData = async () => {
    try {
      const { data: flatListData, error, status } = await database
        .from('todos')
        .select()
        .eq('id', item.params.item.id)
        .limit(1)

      if (error) {
        console.error('Error fetching todos:', error.message);
        return;
      }

      if (flatListData && flatListData.length > 0) {
        setFlatListData(flatListData);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    if (item.params.isLocalView == true) {
      _retrieveData();
    } else {
      getFlatListData();
    }
  }, []);

  const stylesLocal = StyleSheet.create ({
    article: {
      color: colorStyle.textColor,
      fontSize: 23,
      paddingBottom: 20,
    },
    text: {
        color: colorStyle.textColor,
        fontSize: 13,
        paddingTop: 20,
    },
    image: {
      flex: 1,
      width: width * 0.9,
      height: width * 0.5,
      borderRadius: 15, 
    },
  });

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return (
      <View style={[styles.renderItemRootViewPadding]}>
        <Text style={[stylesLocal.article]}>{item.articles}</Text>
        { item.image_url ? 
          <Image
            source={{ uri: item.image_url || ""}}
            resizeMode = 'cover'
            style={stylesLocal.image}
          /> : ''
        }
        <Text style={[stylesLocal.text]}>{item.text}</Text>
        <Text style={[stylesLocal.text]}>{item.source_name}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.rootView, {backgroundColor: colorStyle.backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"transparent"}
        translucent={true}
      />
      { 
        !flatListData ? (
          <ActivityIndicator
            size={"large"}
            color={"gray"}
            style={{
              position: "absolute",
              top: height / 2,
              left: width / 2,
            }}
          />
        ) : (
          <FlatList 
              nestedScrollEnabled={true}
              scrollEnabled={true}
              data={flatListData}
              ListFooterComponent={ !item.params.isLocalView == true ? <ContentFooter data={flatListData}/> : undefined}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.articles}
              renderItem={renderItem}
            />
        )
      }
    </View>
  );
}