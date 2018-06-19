import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
	Image,
	ScrollView
} from 'react-native';

import { showImagePicker } from 'react-native-image-picker';

export default class NewOfferScreen extends Component {

	constructor(props){
		super(props);
		this.state = {images: [null,null,null,null,null]}
		this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
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
	
	renderScrollViewImage(imageNumber){
    return(
				<TouchableOpacity onPress={() => this.selectPhotoTapped(imageNumber)}>
					<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
					{ this.state.images[imageNumber] === null ? <Text>Select a Photo</Text> :
						<Image style={styles.avatar} source={this.state.images[imageNumber]} />
					}
					</View>
				</TouchableOpacity>
    )
  }

  render() {
    return (
			<View>
      	<ScrollView horizontal>
					{this.renderScrollViewImage(0)}
        	{this.renderScrollViewImage(1)}
        	{this.renderScrollViewImage(2)}
        	{this.renderScrollViewImage(3)}
        	{this.renderScrollViewImage(4)}
				</ScrollView>
			</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
	}
});