import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  rootView: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
  },
  homeScreenText: {
    fontSize: 20, 
    textAlign: 'left', 
    fontWeight: 200,
    color: '#ffffff',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradientUpper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  backgroundGradientFullscreen: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  textBlack:{
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center',
  },
  textWhiteBig:{
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center',
  },
  textWhiteSmall: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  textWhiteMedium: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
  textDiscoverScreenTitle:{
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 8,
    marginBottom: 8,
  },
  welcomeViewBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  touchableOpacity: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: '20%',
    borderRadius: 15,
    textAlign: 'center',
    alignContent: 'center',
  },
  touchableOpacityModal: {
    alignItems: 'center',
    backgroundColor: '#0070f2',
    paddingVertical: 10,
    paddingHorizontal: '20%',
    borderRadius: 5,
    textAlign: 'center',
    alignContent: 'center',
  },
  touchableOpacityViewBox: {
    marginBottom: 50,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: 300,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerSkeleton: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  mainContainerHelper: {
    borderRadius: 15,
  },
  containerHelper: {
    borderRadius: 15,
    paddingBottom: 10,
  },
  scrollContainerr: {
    padding: 20,
  },
  containerHelperGradient: {
    padding: 20,
    borderRadius: 15,
  },
  contentContainer: {
    paddingTop: 25,
    flex: 1,
    alignItems: 'center',
  },
  cardInfo: {
    borderRadius: 15,
    justifyContent: 'center',
  },
  cardStyle: {
    height: "100%",
    justifyContent: 'flex-end',
    borderRadius: 15,
  },
  searchView: {
    marginBottom: 5,
    flexDirection: 'row',
    padding: 2,
    paddingLeft: 20,
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    height: 40,
  },
  safeAreaPadding: {
    paddingTop: 30,
    paddingBottom: 10,
  },
});

export {styles, Section};