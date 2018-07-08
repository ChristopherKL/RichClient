import React, {Component} from 'react';
import { 
    StyleSheet, 
    TextInput, 
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from "react-redux";
import createToken from '../apiCom/createToken';

export class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchTerm: '',
            lowPrice: '',
            highPrice: '',
            hashtags: '',
            dropdownSubOptions: [],
			dropdownMainOptions: [],
			selectedMainIndex: '',
			catId: ''
        };
    }

    componentDidMount() {
		this.props.cats.mainCats.forEach(element => {
			this.state.dropdownMainOptions.push(element.Name)
		});
	}

    dropdownOnSelect(idx, value){
		let newDropSub = [];

		this.props.cats.subCats[idx].forEach(element => {
			newDropSub.push(element.Name)
		});
		this.setState({
			dropdownSubOptions: newDropSub,
			selectedMainIndex: idx,
			catId: -1
		})
	}
	dropdownOnSelectSub(idx, value){
		this.setState({
			catId: this.props.cats.subCats[this.state.selectedMainIndex][idx].KategorieID
		});
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View>
                    <TextInput
                        placeholder="Suchbegriff"
                        onChangeText={(text) => this.setState({searchTerm: text})}
					    value={this.state.searchTerm}
                        underlineColorAndroid='transparent'
                        placeholderTextColor={'grey'}
                        style={styles.searchInputStyle}
                    />
                </View>
                <View style={styles.flowContainer}>
				    <ModalDropdown
					    style={styles.dropdown}
					    textStyle={styles.dropdown_text}
					    dropdownStyle={styles.dropdown_dropdown}
					    options={this.state.dropdownMainOptions}
					    onSelect={(idx, value) => this.dropdownOnSelect(idx, value)}
					    defaultValue={'Kategorie'}
				    />
				    <ModalDropdown
					    style={styles.dropdown}
					    textStyle={styles.dropdown_text}
					    dropdownStyle={styles.dropdown_dropdown}
					    options={this.state.dropdownSubOptions}
					    onSelect={(idx, value) => this.dropdownOnSelectSub(idx, value)}
					    defaultValue={'Unterkategorie'}
				    />
			    </View>
                <View style={styles.inputContainer}>
                    <Text>Preis</Text>
                </View>
                <View style={styles.flowContainer}>
                    <View style={styles.priceTags}>
                        <Text>von</Text>
                    </View>
                    <TextInput
					    style={styles.flowInput}
					    onChangeText={(text) => this.setState({lowPrice: text})}
					    value={this.state.lowPrice}
					    maxLength={13}
					    underlineColorAndroid='transparent'
					    width={120}
					    keyboardType='numeric'
				    />
                    <View style={styles.priceTags}>
                        <Text>bis</Text>
                    </View>
                    <TextInput
					    style={styles.flowInput}
					    onChangeText={(text) => this.setState({lowPrice: text})}
					    value={this.state.lowPrice}
					    maxLength={13}
					    underlineColorAndroid='transparent'
					    width={120}
					    keyboardType='numeric'
				    />
                </View>
                <View>
                <TextInput
					style={styles.input}
					placeholder={"Hashtag1,Hashtag2,..."}
					placeholderTextColor={'grey'}
					onChangeText={(text) => this.setState({descriptionText: text})}
					value={this.state.descriptionText}
					maxLength={265}
					multiline = {true}
					numberOfLines = {2}
					underlineColorAndroid='transparent'
				/>
                </View>
                <View style={styles.inputContainer}>
       			    <TouchableOpacity
         			    style={styles.button}
         			    onPress={this.onPress}>
					    <Text> Suche starten </Text>
       			    </TouchableOpacity>
			    </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    searchInputStyle:{
        margin: 10,
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF"  
    },
    priceTags:{
        marginTop: 7
    },
    flowContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between'
	},
	flowInput: {
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		textAlignVertical: 'top',
		height: 40
    },
    inputContainer: {
		padding: 10
	},
	input: {
		margin: 10,
		borderColor: 'black',
		borderWidth: 1,
		textAlignVertical: 'top'
	},
    dropdown: {
		marginLeft: 10,
    	alignSelf: 'flex-start',
    	width: 150,
    	right: 8,
		borderWidth: 0,
    	borderRadius: 3,
    	backgroundColor: 'cornflowerblue',
  	},
  	dropdown_text: {
   		marginVertical: 10,
    	marginHorizontal: 6,
    	fontSize: 18,
    	color: 'white',
    	textAlign: 'center',
    	textAlignVertical: 'center',
 	},
  	dropdown_dropdown: {
    	width: 150,
    	height: 300,
    	borderColor: 'cornflowerblue',
    	borderWidth: 2,
    	borderRadius: 3,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
      padding: 10
  }
});     

const mapStateToProps = (state) => {
    return {
		loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
		cats: state.CatsReducer.cats,
		serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);