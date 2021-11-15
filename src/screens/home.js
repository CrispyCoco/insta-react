import React, { Component } from 'react'
import { Text, View, FlatList, TouchableHighlightBase } from 'react-native'
import Post from "../components/Post"
import {db} from '../firebase/config'

 class home extends Component {
     constructor (props){
         super(props)
         this.state ={
             posts: null
             
         }
     }
     componentDidMount(){
         db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
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
                <FlatList 
                data= {this.state.posts}
                keyExtractor= {post=> post.id}
                renderItem= {({item})=> <Post data={item}/>}
                />
            </View>
        )
    }
}

export default home;