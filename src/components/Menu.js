import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
const Drawer = createBottomTabNavigator();
import { auth, db } from "../firebase/config";
import Icon from 'react-native-vector-icons/AntDesign'
const iconHome = <Icon name="home" size={30} color='rgba(87, 84, 95, 0.445)'/>
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
      loaded: false
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
        loaded: true
      })
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
      this.state.loaded?(      
      <NavigationContainer>
        {!this.state.loggedIn ? (
          <Drawer.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
          })}>
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
          <Drawer.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
          })}>
            <Drawer.Screen name="Home" component={() => <Home />}/>
            <Drawer.Screen name="Add Post" component={(drawerProps) => <AddPost drawerProps={drawerProps} />} />
            <Drawer.Screen name="Profile" component={() => <Profile user={this.state.user} logout={()=>this.logout()}/>} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>):(
        <Text></Text>
      )
    );
  }
}

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Profile':
      iconName = 'user';
      break;
    case 'Add Post':
      iconName = 'plus';
      break;
    case 'Register':
      iconName= 'form'
      break
      case 'Login':
      iconName= 'lock'
      break
    // default:
    //   break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};


export default Menu;
