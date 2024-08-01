import { TouchableWithoutFeedback, useColorScheme, View, Image, Text } from "react-native"
import { DataProps } from "../constants/DataInterface"
import { styles } from "../styles/Styles"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export default function FlatListCard ({item, index}: {item: DataProps, index?: number}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleClick = (item: DataProps) => {
    navigation.navigate("ContentDetails", {item});
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View style={[styles.containerHelper]}>
          <View style={[styles.cardInfo, {backgroundColor: backgroundStyle.trueColor, minHeight: 160, justifyContent: 'flex-end',}]}>
            <Image
              source={{
                uri:
                  item.image_url || 
                  "https://images.unsplash.com/photo-1650194622440-caccb2ec83f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              resizeMode = 'cover'
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 15,
              }}
              blurRadius = {item.image_url ? 0 : 5}
            />
            <LinearGradient
              colors={[isDarkMode ? "transparent" : "transparent", isDarkMode ? "rgba(20,20,20,1)" : "rgba(0,0,0, 0.6)"]}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderRadius: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <Text style={{ 
              textAlign: 'left',
              fontSize: 15,
              color: Colors.white,
              paddingHorizontal: 20,
              paddingBottom: 20,
              position: 'absolute',
            }}>
              {item.articles}
            </Text>
            <Text style={{ 
              textAlign: 'left',
              fontSize: 8,
              color: "#888888",
              paddingHorizontal: 20,
              paddingBottom: 10,
              position: 'absolute',
            }}>
              {item.source_name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}