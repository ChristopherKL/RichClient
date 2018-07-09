import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';



export class NegotiationListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = ({isLoading: true});
    }

    onNegotiationPress = (id) => {
        this.props.navigator.push({
            screen: 'buylocal.viewNegotiationScreen',
            passProps: {negotiationId: id},
            title: "Angebot"
        });
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              backgroundColor: "#CED0CE"
            }}
          />
        );
    };

    renderNegotiation = ({item}) => (
        <TouchableOpacity
            onPress={() => this.onNegotiationPress(item.id)}
            >
            <View>
                <View style={styles.flowContainer}>
                    <Text style={item.read ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                        {item.Absender}
                    </Text>
                    <Text style={item.read ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                        {item.date}
                    </Text>
                </View>
                <Text style={item.read ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                    {item.Betreff}
                </Text>
            </View>
        </TouchableOpacity>
)

    render() {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.negotiations}
                    renderItem={this.renderNegotiation}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flowContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between'
	}
})

export default NegotiationListScreen;