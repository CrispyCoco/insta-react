import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Username"
          keyboardType="default"
          value={this.state.username}
        />
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
        <TouchableOpacity onPress={() => console.log("me registre")}>
          <Text> Register </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default register;
