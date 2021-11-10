import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();
import { auth, db } from "../firebase/config";

import Home from "../screens/home";
import Register from "../screens/register";
import Login from "../screens/login";
import Profile from "../screens/profile";
import AddPost from "../screens/addPost";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          user: user,
        });
      }
    });
  }
  register(email, pass, username) {
    auth.createUserWithEmailAndPassword(email, pass).then(() => {
      console.log("Registered");
      auth.currentUser.updateProfile({ displayName: username }).then(() => {
        console.log(auth.currentUser.displayName);
      });
    });
  }

  login(email, pass) {
    auth.signInWithEmailAndPassword(email, pass).then((response) => {
      this.setState({
        loggedIn: true,
        user: response.user,
      });
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        loggedIn: false,
        user: null,
      });
    });
  }
  render() {
    return (
      <NavigationContainer>
        {!this.state.loggedIn ? (
          <Drawer.Navigator>
            <Drawer.Screen
              name="Register"
              component={() => (
                <Register
                  register={(email, password, username) =>
                    this.register(email, password, username)
                  }
                />
              )}
            />
            <Drawer.Screen
              name="Login"
              component={() => (
                <Login
                  login={(email, password) => this.login(email, password)}
                />
              )}
            />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={() => <Home />} />
            <Drawer.Screen name="Profile" component={() => <Profile />} />
            <Drawer.Screen name="Add Post" component={() => <AddPost />} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default Menu;
