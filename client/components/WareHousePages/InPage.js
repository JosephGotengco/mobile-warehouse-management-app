import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons'; // 6.2.2


class InPage extends Component {
    state = {
        open: false
    }
    render() {
        let cardWidth = this.state.open ? "auto" : 150;
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1, height: 30, alignItems: "center" }}>
                    <Text style={{ color: "#828282", fontFamily: "Rubik-Regular", fontSize: 16, flex: 3 }}>Date</Text>
                    <Text style={{ color: "#828282", fontFamily: "Rubik-Regular", fontSize: 16, flex: 3, paddingLeft: '5%' }}>Item</Text>
                    <Text style={{ color: "#828282", fontFamily: "Rubik-Regular", fontSize: 16, flex: 4, textAlign: 'right' }}>Quantity</Text>
                </View>
                <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: 15, backgroundColor: "#E0E0E0", marginTop: 15, padding: 10, paddingBottom: 0, position: 'relative' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ height: '100%', borderRightWidth: 1, flex: 3 }}>
                                <Text style={{ fontFamily: "Rubik-Bold", fontSize: 24, color: "#333333" }}>Dec</Text>
                                <Text style={{ fontFamily: "Rubik-Bold", fontSize: 24, color: "#333333" }}>01</Text>
                                <Text style={{ fontFamily: "Rubik-Bold", fontSize: 16, color: "#333333" }}>5:00PM</Text>
                            </View>
                            <View style={{ height: cardWidth, flex: 7, paddingLeft: 15, paddingRight: 5, flexDirection: 'column', overflow: 'hidden' }}>
                                <View style={{
                                    display: 'flex', flexDirection: 'row',
                                    borderBottomWidth: 1, borderBottomColor: "#BDBDBD", paddingBottom: 5
                                }}>
                                    <Text style={{ marginRight: 'auto', fontFamily: "Rubik-Regular", fontSize: 16 }}>Memes</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>x5</Text>
                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row',
                                    borderBottomWidth: 1, borderBottomColor: "#BDBDBD", paddingBottom: 5
                                }}>
                                    <Text style={{ marginRight: 'auto', fontFamily: "Rubik-Regular", fontSize: 16, flex: 9 }}>A Really Long Name That Cannot Fit</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, flex: 1 }}>x5</Text>
                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', paddingBottom: 5
                                }}>
                                    <Text style={{ marginRight: 'auto', fontFamily: "Rubik-Regular", fontSize: 16, flex: 9 }}>A Really Long Name That Cannot Fit</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, flex: 1 }}>x5</Text>
                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', paddingBottom: 5
                                }}>
                                    <Text style={{ marginRight: 'auto', fontFamily: "Rubik-Regular", fontSize: 16, flex: 9 }}>A Really Long Name That Cannot Fit</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, flex: 1 }}>x5</Text>
                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', paddingBottom: 5
                                }}>
                                    <Text style={{ marginRight: 'auto', fontFamily: "Rubik-Regular", fontSize: 16, flex: 9 }}>A Really Long Name That Cannot Fit</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, flex: 1 }}>x5</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "#E0E0E0", borderTopWidth: 1, borderTopColor: "#BDBDBD", marginHorizontal: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name={this.state.open ? "expand-less" : "expand-more"} size={24} onPress={() => { this.setState({ open: !this.state.open }) }} />
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default withNavigation(InPage);