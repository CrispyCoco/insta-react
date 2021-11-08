import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { db, storage } from "../firebase/config";

class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: false,
      photo: "",
      showCamera: true
    };
    this.camera;
  }
  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then((response) => {
        this.setState({
          permissions: true,
        });
      })
      .catch((error) => console.log(error));
  }

  takePicture(picture) {
      this.camera.takePictureAsync()
      .then((response) => {
          this.setState({
              photo: response.uri,
              showCamera: false
          })
      })
  }
  newPicture() {
      this.setState({
          photo: '',
          showCamera: true
      })
  }

  savePicture(){
      fetch(this.state.photo)
      .then(response => response.blob())
      .then(picture =>{
          const ref = storage.ref(`photos/${Date.now()}.jpg`)
          ref.put(picture)
          .then(()=>{
              ref.getDownloadURL()
              .then((url)=>{
                  this.props.uploadImage(url);
                  this.setState({
                      photo:'',
                  })
              })
          })

      })

  }
  render() {
    return (
      <View style={styles.viewCamera}>
        {this.state.permissions ? (
            this.state.showCamera?(
                <View style={styles.viewCamera}>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={(reference) => (this.camera = reference)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.takePicture()}
            >
              <Text>Tomar foto</Text>
            </TouchableOpacity>
          </View>
            ):(
                <>
                <Image style={styles.camera} source={{uri: this.state.photo}}/>
                <View>
                    <TouchableOpacity onPress={() => this.savePicture()}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.newPicture()}>
                        <Text>Take new picture</Text>
                    </TouchableOpacity>
                </View>
                </>
            )
          
        ) : (
          <Text>No hay permiso</Text>
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
export default MyCamera;
