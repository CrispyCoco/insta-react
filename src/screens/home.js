import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {db} from '../firebase/config'

 class home extends Component {
     constructor (props){
         super(props)
         this.state ={
             posts: null
             
         }
     }
     componentDidMount(){
         db.collection('posts').onSnapshot(
             docs=>{
                 let posts = []
                 docs.forEach(doc => {
                     posts.push({
                         id:doc.id,
                         data:doc.data()
                     })
                 });
                 this.setState({posts:posts})
             }
         )
     }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default home;