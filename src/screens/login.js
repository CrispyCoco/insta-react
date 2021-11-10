import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

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
      <View>
        <TextInput
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
        />
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          keyboardType="default"
          value={this.state.password}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => this.props.login(this.state.email, this.state.password)}>
          <Text> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default login;
