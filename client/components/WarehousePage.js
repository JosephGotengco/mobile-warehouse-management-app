import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, Button} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

//react native built in icons: 1 = ballot-outline, 2 = ballot-outline, 3 = image-filter-none, 4 = rotate-left, 5 = map, 6 = icon

class WarehousePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            QRModalVisble: false,
            hasCameraPermission: null,
            scanned: false,
        }
    }

    async componentDidMount() {
        this.getPermissionsAsync();
      }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    setQRModalVisible = (visible) => {
        this.setState({QRModalVisble: visible})
    }

    render() {

        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
        }

        return (
            <View style={styles.container}>
            <Modal
                animationType="slide" 
                visible={this.state.QRModalVisble}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'black'}}>
                    <BarCodeScanner 
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}/>
                    {scanned && (<Button title={'Tap to Scan Again'}
                    onPress={() => this.setState({ scanned: false })}/>)}
                </View>
                <Button
                    title="Hide Modal"
                    onPress={()=> {this.setQRModalVisible(!this.state.QRModalVisble)}}/>
            </Modal>
                <View 
                    style={{ flexDirection: "row" }}>
	                <TouchableOpacity
                        style={styles.box}
                        onPress={() => this.setQRModalVisible(true)}>
	                    <MaterialCommunityIcons
                            name="ballot-outline"
                            size={45}
                            color="#000000" />
	                            <Text>In</Text>
	                </TouchableOpacity>

	                <TouchableOpacity
                        style={styles.box}
                        onPress={() => this.setQRModalVisible(true)}>
	                	    <MaterialCommunityIcons name="ballot" size={45} color="#000000" />
	                	        <Text>Out</Text>
	                </TouchableOpacity>

                </View>

                <View style={{flexDirection: "row"}}>

	                <TouchableOpacity style={styles.box}>
	                	<MaterialCommunityIcons name="image-filter-none" size={45} color="#000000" />
	                	<Text>Stocks</Text>
	                </TouchableOpacity>

	                <TouchableOpacity style={styles.box}>
	                	<MaterialIcons name="rotate-left" size={45} color="#000000" />
	                	<Text>History</Text>
	                </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row"}}>

	                <TouchableOpacity style={styles.box}>
	                	<Feather name="map" size={45} color="#000000" />
	                	<Text>Map</Text>
	                </TouchableOpacity>

	                <TouchableOpacity style={styles.box}>
	                	<MaterialIcons name="add" size={45} color="#000000" />
	                	<Text>Add</Text>
	                </TouchableOpacity>
	            </View>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    box: {
        width: 122,
        height: 117,
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
    },
    layerTop: {
        flex: 0.5,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
      },
      layerLeft: {
        flex: 1,
        backgroundColor: opacity
      },
      focused: {
        flex: 10
      },
      layerRight: {
        flex: 1,
        backgroundColor: opacity
      },
      layerBottom: {
        flex: 0.5,
        backgroundColor: opacity
      }
});

export default WarehousePage;