import React from 'react';
import {CheckBox, ScrollView, Image, StyleSheet, Text, View} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

export default class FavoritesComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filesList: []
        };

        this.getImagesList();
    }


    getImagesList() {
        this.path = RNFetchBlob.fs.dirs.DocumentDir + '/images';

        RNFetchBlob.fs.ls(this.path)
            .then((files) => {
                this.setState({filesList: files})
            })
    }

    render() {
        return (
            <View>
                <Text style={styles.heading}>Favorite Images:</Text>
                <ScrollView horizontal={true}>
                    <View style={styles.scrollViewContent}>
                    {this.state.filesList.map(function(url, i){
                        return <Image style={styles.image}
                                    source={{uri: 'file://' + this.path + '/' + url}}
                        ></Image>
                    }.bind(this))}
                    </View>
                </ScrollView>
                <Text style={styles.heading}>Fetch Images From:</Text>
                <View style={styles.checkboxGroup}>
                    <CheckBox/><Text>Flickr</Text>
                </View>
                <View style={styles.checkboxGroup}>
                    <CheckBox/><Text>Instagram</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        flexDirection: 'row'
    },
    heading: {
        padding: 10,
        fontSize: 16
    },
    image: {
        width: 200,
        height: 200
    },
    checkboxGroup: {

    }
});

