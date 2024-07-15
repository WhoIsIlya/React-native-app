import { View, Text, Alert, ActivityIndicator, Dimensions, StyleSheet, useColorScheme, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { WebView } from "react-native-webview";
import { DataProps } from "../constants/DataInterface";
import { database } from "../utils/DatabaseProvider";
import { styles } from "../styles/Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

type ParamList = {
  ContentDetails: {
    item: DataProps;
  };
};

const { height, width } = Dimensions.get("window");

export default function ContentDetailsScreen() {
  const item = useRoute<RouteProp<ParamList, 'ContentDetails'>>();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#141414' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  const stylesLocal = StyleSheet.create ({
    article: {
      color: backgroundStyle.oppositeColor,
      fontSize: 23,
    },
    text: {
        color: backgroundStyle.oppositeColor,
        fontSize: 13,
    }
  });

  const [flatListData, setFlatListData] = useState<any>();

  useEffect(() => {
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
          console.log(flatListData);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getFlatListData();
  }, []);

  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return (
      <View style={[{flex:1, padding: 20, paddingTop: 60}]}>
        <Text style={[stylesLocal.article]}>{item.articles}</Text>
        <Text style={[stylesLocal.text]}>{item.text}</Text>
      </View>
    )
  }

  return (
    <View style={[ styles.mainView, {backgroundColor: backgroundStyle.backgroundColor}]}>
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