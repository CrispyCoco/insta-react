import React, { Component } from "react";
import {
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { db, auth } from "../firebase/config";
import Post from "../components/Post";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true,
      user: "",
    };
  }
  search() {
    console.log(this.state.user);
    db.collection("posts")
      .where("owner", "==", this.state.user)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state.posts);
    return (
      <View style={styles.view}>
        <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ user: text })}
          placeholder="Search"
          keyboardType="default"
          value={this.state.user}
        />
        <TouchableOpacity onPress={() => this.search()} style={styles.button}>
          <Icon name="search" color="white" size={25} style={styles.icon}/>
        </TouchableOpacity>
        </View>

        <View styles={styles.list}>
        <FlatList 
                data= {this.state.posts}
                keyExtractor= {post=> post.id}
                renderItem= {({item})=> <Post data={item}/>}
        />
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgb(12, 11, 14)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh",
    width:'100%',
    color: "rgba(87, 84, 95, 0.445)",
  },
  search:{
    width:'90%',
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: 'space-around'
  },
  input:{
    width: '80%',
    border: '1px solid black',
    borderRadius: '10px',
    paddingHorizontal: 8,
    paddingVertical: 8, 
    marginVertical: 4,
    backgroundColor: 'rgba(87, 84, 95, 0.445)',
    color: 'white',
    outlineStyle: 'none'
  },
  button:{
    width: '18%',
    backgroundColor: 'none',
    borderRadius: '10px',
    outlineStyle: 'none'
  },
  icon:{
    // color: 'white',
    // width: '100%',
    // height: '100%',
    textAlign: 'center',
    // paddingTop: '20%',
  },
  list: {
    flex:1,
    // backgroundColor: 'rgb(12, 11, 14)',
    color: 'white',
    borderRadius: 2,
    padding: 5,
  },
  text: {
    color: "rgba(87, 84, 95, 0.445)",
  },
});
export default search;
