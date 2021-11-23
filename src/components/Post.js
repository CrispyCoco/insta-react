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
      likes: 0,
      myLike: false,
      modal: false,
      comment: "",
      comments: "",
      commented: false,
    };
  }

  componentDidMount() {
    if (this.props.data.data.likes) {
      this.setState({
        likes: this.props.data.data.likes.length,
        myLike: this.props.data.data.likes.includes(
          auth.currentUser.displayName
        ),
      });
    }
    if (this.props.data.data.comments) {
      this.setState({
        comments: this.props.data.data.comments,
        commented: true,
      });
    }
  }

  like() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.displayName
        ),
      })
      .then(() => {
        this.setState({
          likes: this.state.likes + 1,
          myLike: true,
        });
      });
  }

  unLike() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.displayName
        ),
      })
      .then(() => {
        this.setState({
          likes: this.state.likes - 1,
          myLike: false,
        });
      });
  }

  comment() {
    let commentObject = {
      createdAt: Date.now(),
      owner: auth.currentUser.displayName,
      comment: this.state.comment,
    };
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentObject),
      })
      .then(() => {
        this.setState({
          comments: this.props.data.data.comments,
          commented: true,
          comment: "",
        });
      });
  }

  viewComments() {
    if (this.state.modal) {
      this.setState({
        modal: false,
      });
    } else {
      this.setState({
        modal: true,
      });
    }
  }

  delete() {
    db.collection("posts").doc(this.props.data.id).delete();
  }

  render() {
    return (
      <View style={styles.post}>
        <Text>{this.props.data.data.owner}</Text>
        <Image
          style={styles.image}
          source={{ uri: this.props.data.data.picture }}
          reziseMode="contain"
        />
        <Text style={styles.text}>{this.props.data.data.description}</Text>
        <Text style={styles.text}>{this.state.likes} Likes </Text>
        {this.state.myLike ? (
          <TouchableOpacity onPress={() => this.unLike()}>
            <Text style={styles.text}>Unlike </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()}>
            <Text style={styles.text}>Like </Text>
          </TouchableOpacity>
        )}

        {this.state.modal ? (
          <Modal
            visible={this.state.modal}
            animtationType="slide"
            transparent={false}
          >
            <TouchableOpacity onPress={() => this.viewComments()}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            {this.state.commented ? (
              <FlatList
                data={this.state.comments}
                keyExtractor={(comment) => comment.createdAt.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.text}>
                    {" "}
                    {item.owner}: {item.comment}
                  </Text>
                )}
              />
            ) : (
              <Text style={styles.text}>No comments </Text>
            )}

            <TextInput
              onChangeText={(text) => this.setState({ comment: text })}
              placeholder="Add comment..."
              keyboardType="default"
              value={this.state.comment}
            />
            <TouchableOpacity onPress={() => this.comment()}>
              <Text style={styles.text}>Comment</Text>
            </TouchableOpacity>
          </Modal>
        ) : (
          <TouchableOpacity onPress={() => this.viewComments()}>
            <Text style={styles.text}>View comments</Text>
          </TouchableOpacity>
        )}

        {this.props.data.data.owner == auth.currentUser.displayName ? (
          <TouchableOpacity onPress={() => this.delete()}>
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: "100px",
  },
  post: {
    color: "white",
    borderRadius: 2,
    padding: 5,
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
  text:{
    color: 'white',
    padding: 4,
    alignItems: "center"
  }

});

export default Post;
