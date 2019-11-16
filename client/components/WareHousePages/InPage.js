import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class InPage extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>In page</Text>
            </View>
        );
    }
}


export default withNavigation(InPage);