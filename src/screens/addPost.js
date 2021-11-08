import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MyCamera from "../components/MyCamera";
import {db} from '../firebase/config'
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
            <TouchableOpacity onPress={() => console.log("AGREGAR post")}>
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
