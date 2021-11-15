import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import { auth, db } from "../firebase/config";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    render() {
        return (
            <View>
                <Text>{this.props.data.data.owner}</Text>
                <Image source={{uri:this.props.data.data.picture}}/>
                <Text>{this.props.data.data.description}</Text>
                
            </View>
        )
    }
}

export default Post;
