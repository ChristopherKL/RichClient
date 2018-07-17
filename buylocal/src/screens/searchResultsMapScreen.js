import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export class SearchResultsMapScreen extends Component {
    constructor(props) {
        super(props);
        this.state={isReady: false};
    }

    getRegionForCoordinates = (angebote) => {
        // points should be an array of { latitude: X, longitude: Y }
        let minX, maxX, minY, maxY;
      
        // init first point
        ((angebot) => {
          minX = angebot.lat;
          maxX = angebot.lat;
          minY = angebot.lon;
          maxY = angebot.lon;
        })(angebote[0]);
      
        // calculate rect
        angebote.map((angebot) => {
          minX = Math.min(minX, angebot.lat);
          maxX = Math.max(maxX, angebot.lat);
          minY = Math.min(minY, angebot.lon);
          maxY = Math.max(maxY, angebot.lon);
        });
      
        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX);
        const deltaY = (maxY - minY);
      
        return {
          latitude: midX,
          longitude: midY,
          latitudeDelta: deltaX*1.3,
          longitudeDelta: deltaY*1.3
        };
      }
    componentDidMount() {
        this.setState({isReady:true, region: this.getRegionForCoordinates(this.props.results)})
        
    }
    onRegionChange(region) {
        this.setState({ region });
    }
    onPress = (id) => {
        this.props.navigator.push({
            screen: 'buylocal.viewOfferScreen',
            passProps: { offerId: id },
            title: "Angebot"
        });
    }
    render() {
        if(!this.state.isReady) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <View style ={styles.container}>
                <MapView
                style={styles.map}
                region={this.state.region}
                >
                    {this.props.results.map(angebot => (
                        <Marker
                        key={"marker"+angebot.AngebotID}
                        coordinate={{latitude: Number(angebot.lat), longitude: Number(angebot.lon)}}
                        title={angebot.Title}
                        description={angebot.Beschreibung}
                        onPress={() => this.onPress(angebot.AngebotID)}
                        />
                    ))}
                </MapView>
          </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsMapScreen);
