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
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              style={styles.userImg}
              source={{ uri: this.props.data.data.ownerPic }}
              reziseMode="contain"
            />
            <Text style={styles.username}>@{this.props.data.data.owner}</Text>
          </View>
          {this.props.data.data.owner == auth.currentUser.displayName ? (
            <TouchableOpacity onPress={() => this.showAlert()}>
              <Icon name="trash" color="red" size={15} style={styles.trash} />
            </TouchableOpacity>
          ) : null}
        </View>
        <Image
          style={styles.image}
          source={{ uri: this.props.data.data.picture }}
          reziseMode="contain"
        />
        <View style={styles.infoContainer}>
          <View style={styles.flexContainer}>
            {this.state.myLike ? (
              <TouchableOpacity onPress={() => this.unLike()}>
                <Icon name="heart" color="red" size={15} style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.like()}>
                <Icon name="heart" color="gray" size={15} style={styles.icon} />
              </TouchableOpacity>
            )}
            <Text style={styles.text}>
              {this.state.likes} {this.state.likes == 1 ? "Like" : "Likes"}{" "}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.username}>{this.props.data.data.owner}</Text>
            <Text style={styles.text}>{this.props.data.data.description}</Text>
          </View>

          {this.state.modal ? (
            <Modal
              visible={this.state.modal}
              animationType="fade"
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
                  this.state.comment.length == 0
                    ? styles.buttonD
                    : styles.button
                }
                disabled={this.state.comment.length == 0 ? true : false}
                onPress={() => this.comment()}
              >
                <Text style={styles.textButton}>Comment</Text>
              </TouchableOpacity>
            </Modal>
          ) : (
            <TouchableOpacity onPress={() => this.viewComments()}>
              <Text style={styles.viewComments}>
                {" "}
                {this.state.commented
                  ? `View ${this.state.comments.length > 1 ? "all" : ""} ${
                      this.state.comments.length
                    } ${
                      this.state.comments.length > 1 ? "comments" : "comment"
                    } `
                  : "Press to comment"}{" "}
              </Text>
            </TouchableOpacity>
          )}

          {this.props.data.data.owner == auth.currentUser.displayName ? (
            <>
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
          <Text style={styles.irrelevant}>
            Creation date: {this.props.data.data.createdAt}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    color: "white",
    border: "solid 1px rgba(128, 128, 128, 0.2)",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },
  trash:{
    // marginRight:20
  },
  userInfo: {
    // border: 'solid 1px rgba(128, 128, 128, 0.1)',
    borderTopWidth: 0,
    marginBottom: 13,
    marginTop: 7,
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  userImg: {
    height: 30,
    width: 30,
    borderRadius: "50%",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginTop: 0,
    marginLeft: 5,
  },
  image: {
    height: 250,
    width: 250,
  },
  infoContainer: {
    width: "90%",
    display: "flex",
    marginTop: 7,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  viewComments: {
    color: "rgba(87, 84, 95, 0.8)",
  },
  irrelevant: {
    fontSize: 12,
    color: "rgba(87, 84, 95, 0.445)",
    marginTop: 7,
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
    paddingLeft: 4,
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
