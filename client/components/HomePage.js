import React, { Component } from "react";
import { View, Text } from "react-native";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home Page!</Text>
      </View>
    );
  }
}

export default HomePage;
