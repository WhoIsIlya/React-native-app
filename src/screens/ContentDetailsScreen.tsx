import { View, Text } from "react-native";
import React from "react";

interface ItemProps {
  title: string;
  author: string;
}

export default function ContentDetailsScreen({item, index}: {item: ItemProps, index: number}) {
  return (
    <View>
      <Text>ContentDetailsScreen</Text>
    </View>  
  );
}

export {ContentDetailsScreen};