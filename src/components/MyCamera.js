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
      showCamera: true,
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
    this.camera.takePictureAsync().then((response) => {
      this.setState({
        photo: response.uri,
        showCamera: false,
      });
    });
  }
  newPicture() {
    this.setState({
      photo: "",
      showCamera: true,
    });
  }

  savePicture() {
    fetch(this.state.photo)
      .then((response) => response.blob())
      .then((picture) => {
        const ref = storage.ref(`photos/${Date.now()}.jpg`);
        ref.put(picture).then(() => {
          ref.getDownloadURL().then((url) => {
            this.props.uploadImage(url);
            this.setState({
              photo: "",
            });
          });
        });
      });
  }
  render() {
    return (
      <View style={styles.viewCamera}>
        {this.state.permissions ? (
          this.state.showCamera ? (
            <View style={styles.viewCamera}>
              <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                ref={(reference) => (this.camera = reference)}
              />
              <View style={styles.viewButtonsPic}>
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => this.props.leave()}
                >
                  <Text style={styles.textButtonOp}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={() => this.takePicture()}
                >
                  <Text style={styles.textButton}>Take picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Image style={styles.camera} source={{ uri: this.state.photo }} />
              <View style={styles.viewButtonsPic}>
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => this.newPicture()}
                >
                  <Text style={styles.textButtonOp}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={() => this.savePicture()}
                >
                  <Text style={styles.textButton}>Save</Text>
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
  camera: {
    flex: 4,
    width: "80%",
    marginTop: 15,
  },
  button: {
    // width: "80%",
    backgroundColor: "rgb(223, 0, 231)",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: 'none'
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  viewCamera: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewButtons: {
    flex: 1,
    width: "80%",
  },
  buttonSave: {
    backgroundColor: "rgb(223, 0, 231)",
    borderRadius: "10px",
    marginTop: 15,
    width: "45%",
    outlineStyle: 'none'

  },
  buttonCancel: {
    backgroundColor: "white",
    borderRadius: "10px",
    marginTop: 15,
    width: "45%",
    outlineStyle: 'none'
  },
  textButtonOp: {
    color: "rgb(223, 0, 231)",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  viewButtonsPic: {
    flex: 1,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
});
export default MyCamera;
