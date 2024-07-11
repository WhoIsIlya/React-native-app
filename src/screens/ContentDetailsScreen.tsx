import { View, Text, Alert, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { WebView } from "react-native-webview";

interface ItemProps {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
}

type ParamList = {
  ContentDetails: {
    item: ItemProps;
  };
};

const { height, width } = Dimensions.get("window");

export default function ContentDetailsScreen() {
  const item = useRoute<RouteProp<ParamList, 'ContentDetails'>>();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <Text>{item.params.item.author}</Text>
      <Text>{item.params.item.content}</Text>
      <Text>{item.params.item.description}</Text>
      <Text>{item.params.item.publishedAt}</Text>
      <Text>{item.params.item.title}</Text>
      <WebView
        source={{ uri: item.params.item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />
      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"green"}
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}

    </View>
  );
}