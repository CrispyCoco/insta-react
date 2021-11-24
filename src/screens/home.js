import React, { Component } from 'react'
import { Text, View, FlatList, TouchableHighlightBase, StyleSheet } from 'react-native'
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
            <View style={styles.home}>
                <FlatList 
                data= {this.state.posts}
                keyExtractor= {post=> post.id}
                renderItem= {({item})=> <Post data={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor: 'rgb(12, 11, 14)',
        // color: 'white',
        borderRadius: 2,
        padding: 5,
    }
})

export default home;