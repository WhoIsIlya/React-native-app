import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';

interface ItemProps {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
}

type ParamList = {
  ContentDetails: {
    item: ItemProps;
  };
};


export default function ContentDetailsScreen() {

  

  const item = useRoute<RouteProp<ParamList, 'ContentDetails'>>();
  console.log(item.params.item.author);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <Text>{item.params.item.author}</Text>
      <Text>{item.params.item.content}</Text>
      <Text>{item.params.item.description}</Text>
      <Text>{item.params.item.publishedAt}</Text>
      <Text>{item.params.item.title}</Text>
    </View>
  );
}