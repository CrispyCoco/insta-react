import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      myLike: false,
      modal: false,
      comment: "",
      comments: "",
      commented: false,
    };
  }

  render() {
    return (
      <View style={styles.post}>
        <Image
          style={styles.image}
          source={{ uri: this.props.data.data.picture }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
  },
  post: {
    flex: 2
  },
  closeButton: {
    color: "#fff",
    padding: 5,
    backgroundColor: "#dc3545",
    alignSelf: "flex-end",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  comment: {
    color: "#fff",
  },
});

export default Post;
