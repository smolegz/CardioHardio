import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import NotificationsScreen from '../screens/NotifScreen';
import SupportScreen from '../screens/SupportScreen';
import React from "react";


const Drawer = createDrawerNavigator();

function MyDrawer() {

  return (
    <Drawer.Navigator
        screenOptions={{
            drawerPosition: 'right',
            swipeEnabled: 'true',
            swipeEdgeWidth: 600,
            swipeMinDistance: 10,
            drawerStyle: {
            backgroundColor: '#F9F9F9',
            width: 220,
            },
            drawerLabelStyle: {
                fontFamily: 'PassionOne_400Regular',
                fontSize: 23,
            },
            drawerItemStyle: {
                borderRadius: 15,
                paddingLeft: 10,
            },
            drawerInactiveTintColor: '#8EA7B9',
            drawerActiveTintColor: 'black',
            drawerType: 'back',
            drawerHideStatusBarOnOpen: true,
            drawerActiveBackgroundColor: '#E9E9E9'
        }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <Drawer.Screen name="About Us" component={AboutScreen} options={{headerShown:false}}/>
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{headerShown:false}}/>
      <Drawer.Screen name="Support" component={SupportScreen} options={{headerShown:false}}/>
    
    </Drawer.Navigator>
  );
}

export default MyDrawer;