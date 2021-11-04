import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();
import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login'
import Profile from '../screens/profile'
import AddPost from '../screens/addPost'

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={() => <Home />} />
          <Drawer.Screen name="Register" component={() => <Register />} />
          <Drawer.Screen name="Login" component={() => <Login />} />
          <Drawer.Screen name="Profile" component={() => <Profile />} />
          <Drawer.Screen name="Add Post" component={() => <AddPost />} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Menu;
