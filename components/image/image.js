import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

export default class ImageComponent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            url: ''
        }
    }

    _onSetWallpaper() {
        this.props.onItemSelected(this.props.details);
    }



    _addToFavorites() {
        let path = RNFetchBlob.fs.dirs.DocumentDir + '/images';
        RNFetchBlob
            .config({
                path: path + '/img-'+ Date.now() + '.jpg',
            })
            .fetch('GET', this.props.details.src, {
                'Cache-Control': 'no-store'
            })
            .then((res) => {})
            .catch((err)=> {})
    }

    render() {
        return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.image}
                        source={{uri: this.props.details.src}}
                    />
                    <View style={styles.details}>
                        <TouchableOpacity style={styles.clickableOption} onPress={this._onSetWallpaper.bind(this)}>
                            <View>
                                <Text>Set wallpaper</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clickableOption} onPress={this._addToFavorites.bind(this)}>
                            <View>
                                <Text>Add to favorites</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    // imageWrapper: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     position: 'relative'
    // },
    image: {
        height: 100,
        resizeMode: 'contain'
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        display: 'none'
    },
    clickableOption: {
        paddingTop: 5,
        paddingBottom: 5
    }
});

