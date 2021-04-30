import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as React from 'react';
import {
  StyleSheet,
  LogBox,
  Linking,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/Login (not used)';
import SearchOptions from './src/screens/SearchOptions';
import OU from './src/screens/OU';
import DownSyncChildData from './src/screens/DownSyncChildData';
import ChildSearchedList from './src/screens/ChildSearchedList';
import ChildDetail from './src/screens/ChildDetail';
import {SvgXml} from 'react-native-svg';
import SearchIcon from './assets/images/search-icon.svg';
LogBox.ignoreLogs(['VirtualizedList']);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = ({navigationProps, backbutton}) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigationProps.toggleDrawer();
  };

  return (
    <TouchableOpacity
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
      style={{marginLeft: 15}}
      onPress={() => toggleDrawer()}>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
        }}
        style={{width: 25, height: 25, marginLeft: 5}}
      />
    </TouchableOpacity>
  );
};

const NavigationHeaderRight = ({navigation, icon}) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
      style={styles.headerRightIconStyle}
      onPress={() => navigation.navigate('Filters')}>
      <SvgXml style={{marginRight: 15}} xml={icon} width="30" height="30" />
    </TouchableOpacity>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'CERV Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
              title="CERV HOME"
            />
          ),
          headerRight: () => (
            <NavigationHeaderRight navigation={navigation} icon={SearchIcon} />
          ),
          headerStyle: {
            backgroundColor: '#1885BE', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="ChildSearchedList"
        component={ChildSearchedList}
        options={{
          title: 'Child Listing', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure
              navigationProps={navigation}
              title="Child Listing"
            />
          ),
          headerRight: () => (
            <NavigationHeaderRight navigation={navigation} icon={SearchIcon} />
          ),
          headerStyle: {
            backgroundColor: '#1885BE', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            //fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ChildListingStack = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1276AA" />
      <Stack.Navigator initialRouteName="ChildSearchedList">
        <Stack.Screen
          name="ChildSearchedList"
          component={ChildSearchedList}
          options={{
            title: 'Child Listing', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure
                navigationProps={navigation}
                title="Child Listing"
              />
            ),
            headerRight: () => (
              <NavigationHeaderRight
                navigation={navigation}
                icon={SearchIcon}
              />
            ),
            headerStyle: {
              backgroundColor: '#1885BE', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              //fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ChildDetail"
          component={ChildDetail}
          options={{
            title: 'Child Card', //Set Header Title
            headerRight: () => (
              <NavigationHeaderRight
                navigation={navigation}
                icon={SearchIcon}
              />
            ),
            headerStyle: {
              backgroundColor: '#1885BE', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              //fontWeight: 'bold', //Set Header text style
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="About Us"
        onPress={() => Linking.openURL('http://pace-tech.com')}
      />
    </DrawerContentScrollView>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{}}
          drawerLabel="CERV">
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreenStack}
            options={{
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name="Filters"
            component={SearchOptions}
            options={{
              title: 'Search Child',
            }}
          />
          <Drawer.Screen
            name="ChildSearchedList"
            component={ChildListingStack}
            options={{
              title: 'Child Listing',
            }}
          />
          <Drawer.Screen
            name="DownSync OU"
            component={OU}
            options={{
              title: 'Down-sync Organizational Units',
            }}
          />
          <Drawer.Screen
            name="DownSync Child Data"
            component={DownSyncChildData}
            options={{
              title: 'Down-sync Child Data',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
