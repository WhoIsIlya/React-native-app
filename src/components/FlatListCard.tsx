import { TouchableWithoutFeedback, useColorScheme, View, Image, Text } from "react-native"
import { DataProps } from "../constants/DataInterface"
import { styles } from "../styles/Styles"
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export default function FlatListCard ({item, index, isLocalView}: {item: DataProps, index?: number, isLocalView?: boolean}) {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  const handleClick = (item: DataProps) => {
    navigation.navigate("ContentDetails", {item, isLocalView, index});
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View style={[styles.containerHelper]}>
          <View style={[styles.cardInfo]}>
            <Image
              source={{
                uri:
                  item.image_url || 
                  "https://images.unsplash.com/photo-1650194622440-caccb2ec83f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              resizeMode = 'cover'
              style={styles.flatListCardImage}
              blurRadius = {item.image_url ? 0 : 5}
            />
            <LinearGradient
              colors={[isDarkMode ? "transparent" : "transparent", isDarkMode ? "rgba(20,20,20,1)" : "rgba(0,0,0, 0.6)"]}
              style={styles.flatListCardLinearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <Text style={styles.flatListCardArticleText}>
              {item.articles}
            </Text>
            <Text style={styles.flatListCardSourceText}>
              {item.source_name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}