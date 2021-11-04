import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'

 class addPost extends Component {
     constructor (props){
         super(props)
         this.state ={
             description: '',
         }
     }
    render() {
        return (
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
        )
    }
}

export default addPost;