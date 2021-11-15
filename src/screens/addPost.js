import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MyCamera from "../components/MyCamera";
import {auth, db} from '../firebase/config'
class addPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      showCamera: true,
      url: ''
    };
  }

  uploadImage(url){
      this.setState({
        showCamera: false,
        url: url
      })
  }
  submitPost(){
    db.collection('posts').add({
      owner: auth.currentUser.displayName,
      description: this.state.description,
      createdAt: Date.now(),
      picture: this.state.url
    })
    .then(()=>{
      this.setState({
        description:""
      })
      this.props.drawerProps.navigation.navigate('Home')
    })
  }
  render() {
    return (
      <View style={styles.viewCamera}>
        {this.state.showCamera ? (
          <MyCamera uploadImage={(url) => this.uploadImage(url)}/>
        ) : (
          <View>
            <TextInput
              onChangeText={(text) => this.setState({ description: text })}
              placeholder="Description"
              keyboardType="default"
              value={this.state.description}
            />
            <TouchableOpacity onPress={() => this.submitPost()}>
              <Text> Add Post </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera:{
      flex: 7
  },
  button:{
      flex: 1
  },
  viewCamera:{
      flex: 1
  }
})
export default addPost;
