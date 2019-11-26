import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

class OutPage extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Out Page</Text>
      </View>
    );
  }
}

export default withNavigation(OutPage);
