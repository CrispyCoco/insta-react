import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Drawer = createBottomTabNavigator();
import { auth, db } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/home";
import Register from "../screens/register";
import Login from "../screens/login";
import Profile from "../screens/profile";
import AddPost from "../screens/addPost";
import Search from "../screens/search";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      loaded: false,
      error: "",
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
      this.setState({
        loaded: true,
      });
    });
  }
  register(email, pass, username, url) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("Registered");
        auth.currentUser.updateProfile({ displayName: username, photoURL: url }).then(() => {
          console.log(auth.currentUser.displayName);
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        this.setState({
          loggedIn: true,
          user: response.user,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
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
    return this.state.loaded ? (
      <NavigationContainer>
        {!this.state.loggedIn ? (
          <Drawer.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
              headerShown: false,
            })}
            tabBarOptions={{
              activeBackgroundColor: "rgb(12, 11, 14)",
              inactiveBackgroundColor: "black",
              activeTintColor: "rgb(223, 0, 231)",
              // showLabel: false,
            }}
          >
            <Drawer.Screen
              name="Register"
              component={() => (
                <Register
                  register={(email, password, username, url) =>
                    this.register(email, password, username, url)
                  }
                  error = {this.state.error}
                />
              )}
            />
            <Drawer.Screen
              name="Login"
              component={() => (
                <Login
                  login={(email, password) => this.login(email, password)}
                  error = {this.state.error}
                />
              )}
            />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
              headerShown: false,
            })}
            tabBarOptions={{
              activeBackgroundColor: "rgb(12, 11, 14)",
              inactiveBackgroundColor: "black",
              activeTintColor: "rgb(223, 0, 231)",
              // showLabel: false,
            }}
          >
            <Drawer.Screen name="Home" component={() => <Home />} />
            <Drawer.Screen name="Search" component={() => <Search />} />
            <Drawer.Screen
              name="Add Post"
              component={(drawerProps) => <AddPost drawerProps={drawerProps} />}
            />
            <Drawer.Screen
              name="Profile"
              component={() => (
                <Profile user={this.state.user} logout={() => this.logout()} />
              )}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    ) : (
      <Text></Text>
    );
  }
}

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Profile":
      iconName = "user";
      break;
    case "Add Post":
      iconName = "plus";
      break;
    case "Register":
      iconName = "file";
      break;
    case "Login":
      iconName = "lock";
      break;
    case "Search":
      iconName = "search";
      break;
    // default:
    //   break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const styles = StyleSheet.create({
  drawer: {
    color: "red",
  },
});
export default Menu;
