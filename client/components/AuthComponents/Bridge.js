import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import AuthStackNavigator from "./AuthStackNavigator";
import BottomTabNavigator from "./../BottomTabNavigator";

class Bridge extends Component {
  state = {};
  render() {
    console.log(this.props.loggedIn);
    return (
      <View style={{ flex: 1 }}>
        {this.props.loggedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps, {})(Bridge);
