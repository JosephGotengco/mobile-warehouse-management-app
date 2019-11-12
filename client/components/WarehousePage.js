import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

//react native built in icons: 1 = ballot-outline, 2 = ballot-outline, 3 = image-filter-none, 4 = rotate-left, 5 = map, 6 = icon

class WarehousePage extends Component {
    state = {}
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                flexDirection: "row"
            }}>
	                <TouchableOpacity style={styles.box1}>
	                	<MaterialCommunityIcons name="ballot-outline" size={45} color="#000000" />
	                	<Text>In</Text>
	                </TouchableOpacity>
	                <TouchableOpacity style={styles.box1}>
	                	<MaterialCommunityIcons name="ballot" size={45} color="#000000" />
	                	<Text>Out</Text>
	                </TouchableOpacity>
                </View>
                <View style={{
                flexDirection: "row"
            }}>
	                <TouchableOpacity style={styles.box1}>
	                	<MaterialCommunityIcons name="image-filter-none" size={45} color="#000000" />
	                	<Text>Stocks</Text>
	                </TouchableOpacity>
	                <TouchableOpacity style={styles.box1}>
	                	<MaterialIcons name="rotate-left" size={45} color="#000000" />
	                	<Text>History</Text>
	                </TouchableOpacity>
                </View>
                <View style={{
                flexDirection: "row"
            }}>
	                <TouchableOpacity style={styles.box1}>
	                	<Feather name="map" size={45} color="#000000" />
	                	<Text>Map</Text>
	                </TouchableOpacity>
	                <TouchableOpacity style={styles.box1}>
	                	<MaterialIcons name="add" size={45} color="#000000" />
	                	<Text>Add</Text>
	                </TouchableOpacity>
	            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box1: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
        backgroundColor: "#f7f7f7",
        borderRadius: 20,
        borderColor: '#ffffff',
        borderWidth: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
});

export default WarehousePage;