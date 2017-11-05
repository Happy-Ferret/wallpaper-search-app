import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

export default class ImageComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showDetails: false
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
            .fetch('GET', this.props.details.src)
            .then((res) => {})
            .catch((err)=> {})
    }

    render() {
        return (
            <View style={styles.imageTileContainer}>
                <TouchableOpacity style={styles.imageTouchable} onPress={()=> {this.setState({showDetails: true})}}>
                    <Image style={styles.image}
                    source={{uri: this.props.details.src}}
                    />
                </TouchableOpacity>
                {
                    this.state.showDetails === true &&
                    <TouchableOpacity style={styles.details} onPress={()=> {this.setState({showDetails: false})}}>
                        <TouchableOpacity style={styles.detailsClickableOption} onPress={this._onSetWallpaper.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Set wallpaper</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailsClickableOption} onPress={this._addToFavorites.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Add to favorites</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageTileContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    imageTouchable: {
        flex: 1
    },
    image: {
        flex: 1,
        height: 200,
        width: '100%'
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    detailsText: {
        color: '#FFFFFF'
    },
    detailsClickableOption: {
        paddingTop: 5,
        paddingBottom: 5
    }
});

