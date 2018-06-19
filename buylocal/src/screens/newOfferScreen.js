import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
	Image,
	ScrollView,
	TextInput
} from 'react-native';

import { showImagePicker } from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';

const DROPDOWN_CATEGORIES = ['Auto, Rad & Boot', 'Dienstleistungen', 'Eintrittskarten & Tickets', 'Elektronik',
	'Familie, Kind & Babie', 'Freizeit, Hobby & Nachbarschaft', 'Haus & Garten', 'Haustiere', 'Immobilien', 'Jobs',
	'Mode & Beauty', 'Musik, Filme & Bücher', 'Unterricht & Kurse', 'Zu veschenken & Tauschen'];

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
			tag: ''
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
	
	dropdownOnSelect(value){
		this.setState({
			category: value
		});
	}

	dropdownOnSelectSub(value){
		this.setState({
			subcategory: value
		});
	}

	renderScrollViewImage(imageNumber){
    return(
				<TouchableOpacity onPress={() => this.selectPhotoTapped(imageNumber)}>
					<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
					{ this.state.images[imageNumber] === null ? <Text>Foto wählen</Text> :
						<Image style={styles.avatar} source={this.state.images[imageNumber]} />
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
					<ModalDropdown ref="dropdown_2"
						style={styles.dropdown}
						textStyle={styles.dropdown_text}
						dropdownStyle={styles.dropdown_dropdown}
						options={DROPDOWN_CATEGORIES}
						onSelect={(idx, value) => this.dropdownOnSelect(value)}
						defaultValue={'Kategorie'}
					/>
					<ModalDropdown ref="dropdown_2"
						style={styles.dropdown}
						textStyle={styles.dropdown_text}
						dropdownStyle={styles.dropdown_dropdown}
						options={DROPDOWN_CATEGORIES}
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
						width={190}
					/>
					<TextInput
						style={styles.flowInput}
						placeholder={"Nr."}
						onChangeText={(text) => this.setState({streetNr: text})}
						value={this.state.streetNr}
						maxLength={10}
						underlineColorAndroid='transparent'
						width={55}
					/>
					<TextInput
						style={styles.flowInput}
						placeholder={"PLZ"}
						onChangeText={(text) => this.setState({plz: text})}
						value={this.state.plz}
						maxLength={4}
						underlineColorAndroid='transparent'
						width={100}
					/>
				</View>
			</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10
	},
	flowContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-evenly'
	},
	flowInput: {
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		textAlignVertical: 'top',
		height: 40
	},
	input: {
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		textAlignVertical: 'top'
	},
  avatarContainer: {
    borderColor: 'black',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
	},
	dropdown: {
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
	}
});