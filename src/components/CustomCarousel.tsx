import * as React from 'react';
import { Dimensions, Text, useColorScheme, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function CustomCarousel() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#101010' : Colors.lighter,
    secondColor: isDarkMode ? Colors.darker : Colors.white,
    oppositeColor: isDarkMode ? Colors.white : Colors.black,
    trueColor: isDarkMode ? Colors.black : Colors.white,
  };
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width/2}
        autoPlay={true}
        mode={'parallax'}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
        autoPlayInterval={5000}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={3000}
        //onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: backgroundStyle.trueColor,
            }}
          >
            <Text style={{ 
              textAlign: 'center', 
              fontSize: 30,
              color: backgroundStyle.oppositeColor,
            }}>
              {index}
            </Text>
          </View>
        )}
      />
    </View>
  );
}