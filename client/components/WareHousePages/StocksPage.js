import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

class StocksPage extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Stocks Page</Text>
      </View>
    );
  }
}

export default withNavigation(StocksPage);
