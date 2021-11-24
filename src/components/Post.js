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
import Icon from "react-native-vector-icons/FontAwesome";
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
      alert: false,
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
        <Text>{this.props.data.data.owner}</Text>
        <Image
          style={styles.image}
          source={{ uri: this.props.data.data.picture }}
          reziseMode="contain"
        />
        <Text style={styles.text}>{this.props.data.data.description}</Text>
        <Text style={styles.text}>
          {this.state.likes} {this.state.likes == 1 ? "Like" : "Likes"}{" "}
        </Text>
        <Text>Creation date: {this.props.data.createdAt}</Text>
        {this.state.myLike ? (
          <TouchableOpacity onPress={() => this.unLike()}>
            <Icon name="heart" color="red" size={25} style={styles.icon}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()}>
            <Icon name="heart" color="gray" size={25} style={styles.icon}/>
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
              <Text style={styles.text}>No comments</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ comment: text })}
              placeholder="Add comment..."
              keyboardType="default"
              value={this.state.comment}
            />
            <TouchableOpacity
              style={
                this.state.comment.length == 0 ? styles.buttonD : styles.button
              }
              disabled={this.state.comment.length == 0 ? true : false}
              onPress={() => this.comment()}
            >
              <Text style={styles.textButton}>Comment</Text>
            </TouchableOpacity>
          </Modal>
        ) : (
          <TouchableOpacity onPress={() => this.viewComments()}>
            <Text style={styles.text}>
              {" "}
              {this.state.commented
                ? `View ${this.state.comments.length > 1 ? "all" : ""} ${
                    this.state.comments.length
                  } ${this.state.comments.length > 1 ? "comments" : "comment"} `
                : "Press to comment"}{" "}
            </Text>
          </TouchableOpacity>
        )}

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
    height: 250,
    width: 250,

  },
  post: {
    color: "white",
    borderRadius: 2,
    padding: 5,
    backgroundColor: 'rgb(87, 84, 95)',
    marginVertical: 10
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
  text: {
    color: "white",
    padding: 4,
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "rgb(223, 0, 231)",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonD: {
    width: "80%",
    backgroundColor: "gray",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  input: {
    width: "80%",
    border: "1px solid black",
    borderRadius: "10px",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 4,
    backgroundColor: "rgba(87, 84, 95, 0.445)",
    color: "white",
    outlineStyle: "none",
  },

});

export default Post;
