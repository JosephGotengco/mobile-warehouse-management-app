import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

class HistoryPage extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>History Page</Text>
      </View>
    );
  }
}

export default withNavigation(HistoryPage);
