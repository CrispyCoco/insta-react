import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import {db} from '../firebase/config'
import MyPost from '../components/MyPost'

 class profile extends Component {
     constructor (props){
         super(props)
         this.state ={
             posts: null,
             loading: true
         }
     }
     componentDidMount(){
         console.log(this.props.user)
         db.collection('posts').where('owner', '==', this.props.user.displayName).onSnapshot(
             docs=>{
                 let posts = []
                 docs.forEach(doc=>{
                     posts.push({
                         id: doc.id,
                         data: doc.data()
                     })
                 })
                 this.setState({
                     posts: posts,
                     loading: false
                 })
             }
         )
     }

    render() {
        return (
            <View>
                <Text> {this.props.user.email} </Text>
                <Text> {this.props.user.displayName} </Text>
                <Text> {this.props.user.metadata.lastSignInTime} </Text>
                {this.state.loading?(
                    <Text></Text>
                ):(
                    <>
                    <Text> {this.state.posts.length} Posts </Text>
                    <FlatList data= {this.state.posts}
                keyExtractor= {post=> post.id}
                renderItem= {({item})=> <MyPost data={item}/>}/>
                    </>
                )}
                <TouchableOpacity onPress={()=>this.props.logout()}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default profile;