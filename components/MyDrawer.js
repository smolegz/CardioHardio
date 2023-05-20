import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import React from "react";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
        screenOptions={{
            drawerPosition: 'right',
            swipeEnabled: 'true',
            swipeEdgeWidth: 400,
            swipeMinDistance: 50,
            drawerStyle: {
            backgroundColor: '#ffffff',
            width: 200,
            },
            drawerLabelStyle: {
                fontFamily: 'PassionOne_400Regular',
                fontSize: 23,
            },
            drawerItemStyle: {
                borderRadius: 15,
                paddingLeft: 10,
            },
            drawerActiveTintColor: 'black',
            drawerType: 'back',
            drawerHideStatusBarOnOpen: true,
            drawerActiveBackgroundColor: '#F0F0F0'
        }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Drawer.Screen name="About Us" component={AboutScreen} options={{headerShown:false}}/>
    </Drawer.Navigator>
  );
}

export default MyDrawer;