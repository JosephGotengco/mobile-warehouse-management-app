import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, Button } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux'
import { addItem } from '../../actions/inventoryActions'
import { withNavigation } from 'react-navigation';

//react native built in icons: 1 = ballot-outline, 2 = ballot-outline, 3 = image-filter-none, 4 = rotate-left, 5 = map, 6 = icon

class WarehouseHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            QRModalVisble: false,
            hasCameraPermission: null,
            scanned: false,
        }
    }

    async componentDidMount() {
        // Grabs camera permissions on initial component load.
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        // Grabs camera permissions
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    setQRModalVisible = (visible) => {
        // Closes modal
        this.setState({ QRModalVisble: visible })
        this.setState({ scanned: false})
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
                {/* QR CAMERA MODAL */}
                <Modal
                    animationType="slide"
                    visible={this.state.QRModalVisble}
                    onRequestClose={()=> {this.setQRModalVisible(!this.state.QRModalVisble)}}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'black' }}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}>
                                {/* Opacity for border */}
                                <View style={styles.layerTop} />
                                <View style={styles.layerCenter}>
                                <View style={styles.layerLeft} />
                                <View style={styles.focused} />
                                <View style={styles.layerRight} />
                                </View>
                                <View style={styles.layerBottom} />
                            </BarCodeScanner>
                        {scanned && (<Button title={'Tap to Scan Again'}
                            onPress={() => this.setState({ scanned: false })} />)}
                    </View>
                    <Button
                        title="Cancel"
                        onPress={() => { this.setQRModalVisible(!this.state.QRModalVisble) }} />
                </Modal>

                <View
                    style={{ flexDirection: "row" }}>
                    {/* IN PAGE */}
                    <TouchableOpacity style={styles.box}
                        onPress={() => this.props.navigation.push('InPage')}>
                        <MaterialCommunityIcons
                            name="ballot-outline"
                            size={55}
                            color="#000000" />
                        <Text>In</Text>
                    </TouchableOpacity>

                    {/* OUT PAGE */}
                    <TouchableOpacity style={styles.box}
                        onPress={() => this.props.navigation.push('OutPage')}>
                        <MaterialCommunityIcons name="ballot" size={55} color="#000000" />
                        <Text>Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    {/* STOCKS PAGE */}
                    <TouchableOpacity style={styles.box}
                        onPress={() => this.props.navigation.push('StocksPage')}>
                        <MaterialCommunityIcons name="image-filter-none" size={55} color="#000000" />
                        <Text>Stocks</Text>
                    </TouchableOpacity>

                    {/* HISTORY PAGE */}
                    <TouchableOpacity style={styles.box}
                        onPress={() => this.props.navigation.push('HistoryPage')}>
                        <MaterialIcons name="rotate-left" size={55} color="#000000" />
                        <Text>History</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    {/* MAPS PAGE IS PROBABLY GONNA BE CHANGED, IDK WHAT YET MAYBE A CHAT FEATURE */}
                    <TouchableOpacity style={styles.box}>
                        <MaterialIcons name="map" size={55} color="#000000" />
                        <Text>Map</Text>
                    </TouchableOpacity>

                    {/* ADD QR SCANNER MODAL */}
                    <TouchableOpacity style={[styles.box]}
                        onPress={() => this.setQRModalVisible(true)}>
                        <MaterialIcons name="add" size={55} color="#27AE60" />
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        let jsonData = JSON.parse(data);
        this.props.addItem(data)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: "#F2F2F2"
    },
    box: {
        width: 152.5,
        height: 146.25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
        backgroundColor: "#f7f7f7",
        borderRadius: 25,

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
    },
    addBox: {
        backgroundColor: "#27AE60",
        color: "white"
    }
});

const mapStateToProps = (state) => ({
    inventoryErr: state.inventory.inventoryErr
})

export default connect(mapStateToProps, { addItem })(WarehouseHome)
