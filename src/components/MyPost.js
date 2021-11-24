import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
    };
  }

  delete() {
    db.collection("posts").doc(this.props.data.id).delete();
  }

  showAlert() {
    if (this.state.alert) {
      this.setState({
        alert: false,
      });
    } else {
      this.setState({
        alert: true,
      });
    }
  }
  render() {
    return (
      <View style={styles.post}>
        <Image
          style={styles.image}
          source={{ uri: this.props.data.data.picture }}
        />

        {this.props.data.data.owner == auth.currentUser.displayName ? (
          <>
            <TouchableOpacity onPress={() => this.showAlert()}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
            {this.state.alert ? (
              <Modal
                visible={this.state.modal}
                animtationType="slide"
                transparent={false}
              >
                <Text> Are you sure you want to delete this post? </Text>
                <TouchableOpacity onPress={() => this.showAlert()}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.delete()}>
                  <Text style={styles.text}>Accept</Text>
                </TouchableOpacity>
              </Modal>
            ) : null}
          </>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
  },
  post: {
    width: "100%",
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
