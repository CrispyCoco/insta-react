import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MyCamera from "../components/MyCamera";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      showCamera: false,
      url: "",
    };
  }
  uploadImage(url) {
    this.setState({
      showCamera: false,
      url: url,
    });
  }
  toggleCamera() {
    this.setState({
      showCamera: true,
    });
  }

  leave(){
    this.setState({
      showCamera: false,
    })
  }
  render() {
    return (
      <View style={styles.view}>
        {this.state.showCamera ? (
          <MyCamera
            uploadImage={(url) => this.uploadImage(url)}
            leave={() => this.leave()}
          />
        ) : (
          <>
            {this.state.url.length == 0 ? (
              <Text style={styles.title}>Please take a picture!</Text>
            ) : (
              <Image style={styles.picture} source={{ uri: this.state.url }} />
            )}
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ username: text })}
              placeholder="Username"
              keyboardType="default"
              value={this.state.username}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder="Email"
              keyboardType="email-address"
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="Password"
              keyboardType="default"
              value={this.state.password}
              secureTextEntry={true}
            />
            <Text style={styles.textError}>{this.props.error}</Text>
            <TouchableOpacity
              style={
                this.state.email.length == 0 ||
                this.state.password.length < 6 ||
                this.state.username.length == 0 || this.state.url.length == 0
                  ? styles.buttonD
                  : styles.button
              }
              disabled={
                this.state.email.length == 0 ||
                this.state.password.length < 6 ||
                this.state.username.length == 0 || this.state.url.length == 0
                  ? true
                  : false
              }
              onPress={() =>
                this.props.register(
                  this.state.email,
                  this.state.password,
                  this.state.username,
                  this.state.url
                )
              }
            >
              <Text style={styles.textButton}> Register </Text>
            </TouchableOpacity>
            {this.state.url.length == 0 ?(
              <TouchableOpacity
              style={
                this.state.url.length == 0 ? styles.button : styles.buttonD
              }
              onPress={() => this.toggleCamera()}
            >
              <Text style={styles.textButton}> Take Picture </Text>
            </TouchableOpacity>
            ):(
              <TouchableOpacity
              style={
                styles.button
              }
              onPress={() => this.toggleCamera()}
            >
              <Text style={styles.textButton}> Re-take Picture </Text>
            </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgb(12, 11, 14)",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    border: "1px solid black",
    borderRadius: "10px",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 4,
    backgroundColor: "rgba(87, 84, 95, 0.445)",
    color: "white",
    outlineStyle: "none",
  },
  button: {
    width: "80%",
    backgroundColor: "rgb(223, 0, 231)",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonD: {
    width: "80%",
    backgroundColor: "gray",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: "none",
  },
  textError: {
    color: "red",
  },
  picture: {
    height: 200,
    width: 200,
    borderRadius:'50%'
  },
  title: {
    color: "rgba(87, 84, 95, 0.445)",
    marginBottom: 30,
    fontSize: 20,
  },
});

export default register;
