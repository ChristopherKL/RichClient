import React, {Component} from 'react';
import {
  	StyleSheet,
  	Text,
  	View,
  	PixelRatio,
  	TouchableOpacity,
	Image,
	ScrollView,
	TextInput,
	Alert
} from 'react-native';

import { showImagePicker } from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import newOffer from '../apiCom/newOffer';
import * as categories from '../categories';

export default class NewOfferScreen extends Component {

	constructor(props){
		super(props);
		this.state = {
			images: [null,null,null,null,null],
			titleText: '',
			descriptionText: '',
			street: '',
			streetNr: '',
			plz: '',
			price: '',
			category: '',
			subcategory: '',
			hashtag: '',
			dropdownOptions: []
		};
		this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
	}

  selectPhotoTapped(imageNumber) {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			mediaType: 'photo',
			storageOptions: {
				skipBackup: true,
				cameraRoll: true
			}
		};

		showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled photo picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let imageArray = this.state.images;
        imageArray[imageNumber] = source
				this.setState({
					images: imageArray
				});
			}
		});
	}
	
	dropdownOnSelect(idx,value){
		this.setState({
			category: value
		});
		
		/*
		switch (idx) {
			case 0:
				this.setState({dropdownOptions: SUBCATEGORIES0});
				break;
			case 1:
				this.setState({dropdownOptions: SUBCATEGORIES1});
				break;
			case 2:
				this.setState({dropdownOptions: SUBCATEGORIES2});
				break;
			case 3:
				this.setState({dropdownOptions: SUBCATEGORIES3});
				break;
			case 4:
				this.setState({dropdownOptions: SUBCATEGORIES4});
				break;
			case 5:
				this.setState({dropdownOptions: SUBCATEGORIES5});
				break;
			case 6:
				this.setState({dropdownOptions: SUBCATEGORIES6});
				break;
			case 7:
				this.setState({dropdownOptions: SUBCATEGORIES7});
				break;
			case 8:
				this.setState({dropdownOptions: SUBCATEGORIES8});
				break;
			case 9:
				this.setState({dropdownOptions: SUBCATEGORIES9});
				break;
			case 10:
				this.setState({dropdownOptions: SUBCATEGORIES10});
				break;
			case 11:
				this.setState({dropdownOptions: SUBCATEGORIES11});
				break;
			case 12:
				this.setState({dropdownOptions: SUBCATEGORIES12});
				break;
			case 13:
				this.setState({dropdownOptions: SUBCATEGORIES13});
				break;
		}*/
	}

dropdownOnSelectSub(value){
	this.setState({
		subcategory: value
	});
}

validateInput(){
	var alertmessage = '';
	if(this.state.titleText.replace(/(\r\n\t|\n|\r\t|\s)/gm,"").length == 0){alertmessage += '-Titel fehlt \n';}
	if(this.state.images[0] == null){alertmessage +='-Bild fehlt \n';}
	if(this.state.descriptionText.replace(/(\r\n\t|\n|\r\t|\s)/gm,"").length == 0){alertmessage +='-Beschreibung fehlt \n';}
	if(this.state.category.length == 0){alertmessage +='-Kategorie fehlt \n';}
	if(this.state.subcategory.length == 0){alertmessage += '-Unterkategorie fehlt \n';}
	if(this.state.street.length != 0 && this.state.street.replace(/(\r\n\t|\n|\r\t|\s)/gm,"").length == 0){alertmessage +='-Straße fehlerhaft \n';}
	if(this.state.streetNr.length != 0 && this.state.streetNr.replace(/(\r\n\t|\n|\r\t|\s)/gm,"").length == 0){alertmessage +='-Hausnummer fehlerhaft \n';}
	if(this.state.plz.match(/\d\d\d\d\d/)===null){alertmessage += '-Postleitzahl fehlerhaft \n';}
	if(this.state.hashtag.length != 0 && this.state.hashtag.replace(/(\r\n\t|\n|\r\t|\s)/gm,"").length == 0){alertmessage +='-Hashtag fehlerhaft \n';}
	if(this.state.price.length == 0 || this.state.price.match(/^([1-9]\d{1,10}|0)(\.\d{1,2})?$/)===null){alertmessage +='-Preis fehlerhaft';}
	return alertmessage;
}

onPress = () => {
	var alertmessage = this.validateInput();
	if(alertmessage.length != 0){
		Alert.alert(
			'Fehlende Infos',
			alertmessage
		);
	} else {
		var subcategoryid = categories.subcategorieToID(this.state.category,this.state.subcategory);
		newOffer(createToken(this.props.userData.token, this.props.serverPublicKey), this.state.titleText, this.state.descriptionText,this.state.street,
		this.state.streetNr,this.state.plz,this.state.price,subcategoryid,this.state.hashtag,this.state.images).then(
            (res) => {
                if(res != true) {
                    alert("Fehler: "+ res);
                }
                else {
                    alert("Angebot erstellt!");
                    this.props.loginAction({username: this.state.inputUsername, mail: this.state.inputMail});
                    this.props.navigator.pop();
                }
            }
        )
	}
}

renderScrollViewImage(imageNumber){
    return(
		<TouchableOpacity onPress={() => this.selectPhotoTapped(imageNumber)}>
			<View style={[styles.imageField, styles.imageContainer, {marginBottom: 20}]}>
			{ this.state.images[imageNumber] === null ? <Text>Foto wählen</Text> :
				<Image style={styles.imageField} source={this.state.images[imageNumber]} />
			}
			</View>
		</TouchableOpacity>
    )
}

  render() {
    return (
		<ScrollView>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.flowInput}
					placeholder={"Titel"}
					placeholderTextColor={'grey'}
					onChangeText={(text) => this.setState({titleText: text})}
					value={this.state.titleText}
					maxLength={45}
					underlineColorAndroid='transparent'
				/>
			</View>
      		<ScrollView horizontal>
				{this.renderScrollViewImage(0)}
        		{this.renderScrollViewImage(1)}
        		{this.renderScrollViewImage(2)}
        		{this.renderScrollViewImage(3)}
        		{this.renderScrollViewImage(4)}
			</ScrollView>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder={"Beschreibung"}
					placeholderTextColor={'grey'}
					onChangeText={(text) => this.setState({descriptionText: text})}
					value={this.state.descriptionText}
					maxLength={512}
					multiline = {true}
					numberOfLines = {5}
					underlineColorAndroid='transparent'
				/>
			</View>
			<View style={styles.flowContainer}>
				<ModalDropdown
					style={styles.dropdown}
					textStyle={styles.dropdown_text}
					dropdownStyle={styles.dropdown_dropdown}
					options={categories.CATEGORIES}
					onSelect={(idx, value) => this.dropdownOnSelect(idx,value)}
					defaultValue={'Kategorie'}
				/>
				<ModalDropdown
					style={styles.dropdown}
					textStyle={styles.dropdown_text}
					dropdownStyle={styles.dropdown_dropdown}
					options={categories.SUBCATEGORIES0}
					onSelect={(idx, value) => this.dropdownOnSelectSub(value)}
					defaultValue={'Unterkategorie'}
				/>
			</View>
			<View style={styles.flowContainer}>
				<TextInput
					style={styles.flowInput}
					placeholder={"Straße"}
					onChangeText={(text) => this.setState({street: text})}
					value={this.state.street}
					maxLength={128}
					underlineColorAndroid='transparent'
					width={200}
				/>
				<TextInput
					style={styles.flowInput}
					placeholder={"Nr."}
					onChangeText={(text) => this.setState({streetNr: text})}
					value={this.state.streetNr}
					maxLength={10}
					underlineColorAndroid='transparent'
					width={75}
					keyboardType='numeric'
				/>
				
			</View>
			<View style={styles.flowContainer}>
				<TextInput
					style={styles.flowInput}
					placeholder={"Hashtag"}
					onChangeText={(text) => this.setState({hashtag: text})}
					value={this.state.hashtag}
					maxLength={45}
					underlineColorAndroid='transparent'
					width={200}
				/>
				<TextInput
					style={styles.flowInput}
					placeholder={"PLZ"}
					onChangeText={(text) => this.setState({plz: text})}
					value={this.state.plz}
					maxLength={5}
					underlineColorAndroid='transparent'
					width={75}
					keyboardType='numeric'
				/>
			</View>
			<View  style={styles.inputContainer}>
				<TextInput
					style={styles.flowInput}
					placeholder={"Preis"}
					onChangeText={(text) => this.setState({price: text})}
					value={this.state.price}
					maxLength={13}
					underlineColorAndroid='transparent'
					width={120}
					keyboardType='numeric'
				/>
			</View>
			<View style={styles.inputContainer}>
       			<TouchableOpacity
         			style={styles.button}
         			onPress={this.onPress}>
					<Text> Angebot erstellen </Text>
       			</TouchableOpacity>
			</View>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		textAlignVertical: 'top'
	},
  	imageContainer: {
    	borderColor: 'black',
    	borderWidth: 1 / PixelRatio.get(),
    	justifyContent: 'center',
    	alignItems: 'center'
  	},
  	imageField: {
		borderRadius: 75,
  		width: 150,
  		height: 150
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