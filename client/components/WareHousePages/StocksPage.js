import React, { Component } from 'react'
import { View, FlatList, } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { getInventory } from '../../actions/inventoryActions'

export class StocksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: []
        }
    }

    componentWillMount() {
        this.props.getInventory()
    }

    componentDidMount() {
        this.setState({
            source: this.props.items
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <FlatList
                    data={this.props.items}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <ListItem
                            containerStyle={{ backgroundColor: "#f1f1f1", borderBottomColor: "black", borderBottomWidth: 1 }}
                            key={item.id}
                            title={item.name}
                            subtitle={"Current Stock: " + item.quantity}
                            subtitleStyle={{ fontSize: 13 }}
                            bottomDivider={true}
                        />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.inventory.items
})

export default withNavigation(connect(mapStateToProps, { getInventory })(StocksPage))
