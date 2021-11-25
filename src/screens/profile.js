import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";
import Icon from "react-native-vector-icons/AntDesign";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true,
    };
  }
  componentDidMount() {
    console.log(this.props.user);
    db.collection("posts")
      .where("owner", "==", this.props.user.displayName)
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
      <View style={styles.list}>
        <View style={styles.info}>
          <View style={styles.mainInfo}>
            <Image
              style={styles.picture}
              source={{ uri: this.props.user.photoURL }}
            />
            <View style={styles.user}>
              <Text style={styles.username}>
                {" "}
                @{this.props.user.displayName}{" "}
              </Text>
              <Text style={styles.text}> {this.props.user.email} </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {" "}
            {this.props.user.metadata.lastSignInTime}{" "}
          </Text>
          <Text style={styles.text}>
            {" "}
            {this.state.posts ? this.state.posts.length : "0"}{" "}
            {this.state.posts && this.state.posts.length == 1
              ? "Post"
              : "Posts"}{" "}
          </Text>
          <TouchableOpacity onPress={() => this.props.logout()} style={styles.logout}>
            <Icon name="logout" color="white" size={15} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {this.state.loading ? null : (
          // <View style={styles.list}>
          <FlatList
            data={this.state.posts}
            keyExtractor={(post) => post.id}
            renderItem={({ item }) => <Post data={item} />}
          />
          // </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  info: {
    marginBottom: 15,
    display: "flex",
  },
  mainInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8

  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: "50%",
    marginTop: 15,
    marginLeft: 15,
  },
  logout:{
    alignSelf: "flex-end",
  },
  icon: {
    marginRight: 15
  },
  list: {
    flex: 1,
    backgroundColor: "rgb(12, 11, 14)",
    // color: 'white',
    borderRadius: 2,
    padding: 5,
  },
  text: {
    color: "rgba(87, 84, 95, 0.6)",
  },
});
export default profile;
