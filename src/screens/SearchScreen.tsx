import { View, useColorScheme, StatusBar, TouchableOpacity, TextInput, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "../constants/Colors";
import { styles } from "../styles/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { database } from "../utils/DatabaseProvider";
import { debounce } from "lodash";
import { DataProps } from "../constants/DataInterface";
import FlatListCard from "../components/FlatListCard";

export default function SearchScreen() {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const colorStyle = {
    backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    textColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    searchBarBackgroundColor: isDarkMode ? Colors.dark.searchBarBackgroundColor : Colors.light.searchBarBackgroundColor,
    searchBarTextColor: isDarkMode ? Colors.dark.searchBarTextColor : Colors.light.searchBarTextColor,
  };

  const [searchData, setSearchData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<any>();
  
  const handleSearch = async (search: string) => {
    if(search && search.length <= 2) {
      setIsLoading(false);
      setSearchData(undefined);
    }
    if(search && search.length > 2) {
      setIsLoading(true);
      setRequest(search);

      try {
        const { data: searchResponce, error, status } = await database
          .from('todos')
          .select('id, articles, image_url, source_name')
          .ilike('text', '%' + search + '%')
          .limit(20)
          .order('id', { ascending: false });
  
        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (searchResponce && searchResponce.length > 0) {
          setSearchData(searchResponce);
          setIsLoading(false);
        }

        if (searchResponce && searchResponce.length == 0) {
          setSearchData(undefined);
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const inputRef = useRef<any>();
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  }

  useEffect(() => {
    if (isFocused) {
      onFocusHandler();
    }
  }, [isFocused]);
  
  const renderItem = ({item, index}: {item: DataProps, index: number}) => {
    return(
      <FlatListCard item={item}/>
    )
  }

  return (
    <SafeAreaView style={[styles.rootView, {backgroundColor: colorStyle.backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <View style={[styles.safeAreaPadding]}>
        <View style={[styles.container]}>
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
              onChangeText={handleTextDebounce}
            />
          </View>             
        </View>
      </View> 
      <View style={[styles.paddingTop40]}>
        {
          isLoading ?  
            <ActivityIndicator
              size={"large"}
              color={"gray"}
              style={{
                position: 'absolute',
                left: 30,
                top: -8,

              }}
            /> :
            ('')
        }
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={true}
          data={searchData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.articles}
          renderItem={renderItem}
          horizontal={false}
        />
      </View>
    </SafeAreaView>
  );
}

export {SearchScreen};