import { View, Text, ActivityIndicator, Dimensions, StyleSheet, useColorScheme, FlatList, StatusBar, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { DataProps, ParamList } from "../constants/DataInterface";
import { database } from "../utils/DatabaseProvider";
import { styles } from "../styles/Styles";
import { Colors } from '../constants/Colors'

const { height, width } = Dimensions.get("window");

export default function ContentDetailsScreen() {
  const item = useRoute<RouteProp<ParamList, 'ContentDetails'>>();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
  };
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
    }
  });

  const [flatListData, setFlatListData] = useState<any>();

  const getFlatListData = async () => {
    try {
      const { data: flatListData, error, status } = await database
        .from('todos')
        .select()
        .eq('id', item.params.item.id)

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
    getFlatListData();
  }, []);

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return (
      <View style={[{flex:1, padding: 20, paddingTop: 60}]}>
        <Text style={[stylesLocal.article]}>{item.articles}</Text>
        { item.image_url ? 
          <Image
            source={{ uri: item.image_url || ""}}
            resizeMode = 'cover'
            style={{
              flex: 1,
              width: width * 0.9,
              height: width * 0.5,
              borderRadius: 15,
            }}
          /> : ''
        }
        <Text style={[stylesLocal.text]}>{item.text}</Text>
        <Text style={[stylesLocal.text]}>{item.source_name}</Text>
      </View>
    )
  }

  return (
    <View style={[ styles.rootView, {backgroundColor: colorStyle.backgroundColor}]}>
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
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.articles}
              renderItem={renderItem}
            />
        )
      }
    </View>
  );
}