import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AccountPage extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Account Page!</Text>
            </View>
        );
    }
}

export default AccountPage;