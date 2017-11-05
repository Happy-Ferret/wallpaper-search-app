import React from 'react';
import {Switch, ScrollView, Image, StyleSheet, Text, View} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

export default class FavoritesComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filesList: [],
            flickrSwitchOn: true,
            instagramSwitchOn: false
        };

        this._getImagesList();
    }

    _getImagesList() {
        this.path = RNFetchBlob.fs.dirs.DocumentDir + '/images';

        RNFetchBlob.fs.ls(this.path)
            .then((files) => {
                this.setState({filesList: files})
            })
    }

    render() {
        return (
            <View style={styles.favoritesContainer}>
                <Text style={styles.headingText}>Favorite Images:</Text>
                <ScrollView horizontal={true}>
                    <View style={styles.scrollViewContent}>
                    {this.state.filesList.map(function(url, i){
                        return <Image style={styles.favoriteImage}
                                    source={{uri: 'file://' + this.path + '/' + url}}
                        ></Image>
                    }.bind(this))}
                    </View>
                </ScrollView>
                <Text style={styles.headingText}>Fetch Images From:</Text>
                <View style={styles.checkboxGroup}>
                    <Switch
                        style={styles.checkboxGroupSwitch}
                        onValueChange={(value) => this.setState({flickrSwitchOn: value})}
                        value={this.state.flickrSwitchOn} />
                    <Text
                        style={styles.checkboxGroupText}>Flickr</Text>
                </View>
                <View style={styles.checkboxGroup}>
                    <Switch
                        style={styles.checkboxGroupSwitch}
                        onValueChange={(value) => this.setState({instagramSwitchOn: value})}
                        value={this.state.instagramSwitchOn} />
                    <Text
                        style={styles.checkboxGroupText}>Instagram</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    favoritesContainer: {},
    scrollViewContent: {
        flexDirection: 'row'
    },
    headingText: {
        padding: 10,
        fontSize: 16
    },
    favoriteImage: {
        width: 200,
        height: 200
    },
    checkboxGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    checkboxGroupText: {
        marginLeft: 10
    },
    checkboxGroupSwitch:{}
});

