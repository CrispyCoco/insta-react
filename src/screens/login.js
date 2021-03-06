import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
  }
  render() {
    return (
      <View style={styles.view}>
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
        <Text style = {styles.textError}>
          {this.props.error}
        </Text>
        <TouchableOpacity  style={
            this.state.email.length == 0 || this.state.password.length < 6 
                  ? styles.buttonD
                  : styles.button
              }
        disabled={
          this.state.email.length == 0 || this.state.password.length < 6
            ? true
            : false
        }
         onPress={() => this.props.login(this.state.email, this.state.password)}>
          <Text style={styles.textButton}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view:{
    backgroundColor: 'rgb(12, 11, 14)',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    width: '80%',
    border: '1px solid black',
    borderRadius: '10px',
    paddingHorizontal: 8,
    paddingVertical: 5, 
    marginVertical: 4,
    backgroundColor: 'rgba(87, 84, 95, 0.445)',
    color: 'white',
    outlineStyle: 'none'
  },
  button:{
    width: '80%',
    backgroundColor: 'rgb(223, 0, 231)',
    borderRadius: '10px',
    marginTop: 15,
    outlineStyle: 'none'
  },
  textButton:{
    color: 'white',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
  buttonD: {
    width: "80%",
    backgroundColor: "gray",
    borderRadius: "10px",
    marginTop: 15,
    outlineStyle: 'none'
  },
  textError: {
    color: 'red',
  }
})
export default login;
