import React, { Component } from "react";
import {
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
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
    return (
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ user: text })}
          placeholder="Search"
          keyboardType="default"
          value={this.state.user}
        />
        <TouchableOpacity onPress={() => this.search()}>
          <Text>Search</Text>
        </TouchableOpacity>

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
    width:'100%'
  },
  list: {
    width: "100%",
  },
  input:{
    width: '80%',
    border: '1px solid black',
    borderRadius: '10px',
    paddingHorizontal: 8,
    paddingVertical: 5, 
    marginVertical: 4,
    backgroundColor: 'rgba(87, 84, 95, 0.445)',
    color: 'white',
  },
});
export default search;
