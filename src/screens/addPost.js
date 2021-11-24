import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MyCamera from "../components/MyCamera";
import { auth, db } from "../firebase/config";
import moment from "moment";
class addPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      showCamera: false,
      url: "",
    };
  }

  uploadImage(url) {
    this.setState({
      showCamera: false,
      url: url,
    });
  }
  submitPost() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.displayName,
        ownerPic: auth.currentUser.photoURL,
        description: this.state.description,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        picture: this.state.url,
      })
      .then(() => {
        this.setState({
          description: "",
          url:"",
        });
        this.props.drawerProps.navigation.navigate("Home");
      });
  }

  toggleCamera() {
    this.setState({
      showCamera: true,
    });
  }

  leave(){
    this.setState({
      showCamera: false,
    })
  }
  render() {
    return (
      <View style={styles.viewCamera}>
        {this.state.showCamera ? (
          <MyCamera uploadImage={(url) => this.uploadImage(url)} leave={()=> this.leave()}/>
        ) : (
          <View style={styles.viewCamera}>
            {this.state.url.length == 0 ? (
              <Text style={styles.title}>Please take a picture!</Text>
            ) : (
              <Image style={styles.picture} source={{ uri: this.state.url }} />
            )}
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ description: text })}
              placeholder="Description"
              keyboardType="default"
              value={this.state.description}
            />
            <TouchableOpacity
              style={
                this.state.url.length == 0 || this.state.description.length == 0
                  ? styles.buttonD
                  : styles.button
              }
              disabled={
                this.state.url.length == 0 || this.state.description.length == 0
                  ? true
                  : false
              }
              onPress={() => this.submitPost()}
            >
              <Text style={styles.textButton}> Add Post </Text>
            </TouchableOpacity>
            {this.state.url.length == 0 ?(
              <TouchableOpacity
              style={
                this.state.url.length == 0 ? styles.button : styles.buttonD
              }
              onPress={() => this.toggleCamera()}
            >
              <Text style={styles.textButton}> Take Picture </Text>
            </TouchableOpacity>
            ):(
              <TouchableOpacity
              style={
                styles.button
              }
              onPress={() => this.toggleCamera()}
            >
              <Text style={styles.textButton}> Re-take Picture </Text>
            </TouchableOpacity>
            )}
            
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 6,
  },
  button: {
    width: "80%",
    backgroundColor: "rgb(223, 0, 231)",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: 'none'
  },
  viewCamera: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(12, 11, 14)",
    width: "100%",
  },
  input: {
    width: "80%",
    border: "1px solid black",
    borderRadius: "10px",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 8,
    backgroundColor: "rgba(87, 84, 95, 0.445)",
    color: "white",
    outlineStyle: 'none'
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  picture: {
    height: 200,
    width: 200,
  },
  buttonD: {
    width: "80%",
    backgroundColor: "gray",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: 'none'
  },
  title: {
    color: "rgba(87, 84, 95, 0.445)",
    marginBottom: 30,
    fontSize: 20,
  },
});
export default addPost;
