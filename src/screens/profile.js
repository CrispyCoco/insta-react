import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { db } from "../firebase/config";
import MyPost from "../components/MyPost";

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
      <View style={styles.view}>
        <Text style={styles.text}> {this.props.user.email} </Text>
        <Text style={styles.text}> {this.props.user.displayName} </Text>
        <Text style={styles.text}>
          {" "}
          {this.props.user.metadata.lastSignInTime}{" "}
        </Text>
        {this.state.loading ? (
          <Text style={styles.text}></Text>
        ) : (
          <View style={styles.list}>
            <Text style={styles.text}> {this.state.posts.length} Posts </Text>
            <FlatList
              data={this.state.posts}
              keyExtractor={(post) => post.id}
              renderItem={({ item }) => <MyPost data={item} />}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => this.props.logout()}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
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
  },
  list: {
    width: "100%",
  },
  text: {
    color: "rgba(87, 84, 95, 0.445)",
  },
});
export default profile;
