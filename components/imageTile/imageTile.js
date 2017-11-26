import React from 'react';
import {Platform, ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import FileSystemHelper from './../../services/file-system.service';
import config from './../../config/config';

export default class ImageComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showDetails: false,
            animating: false,
        };
    }

    _onSetWallpaper() {
        if(Platform.OS === 'android') {
            this.setState({animating: true});
            this.props.onItemSelected(this.props.details);
            this.setState({animating: false});
        }
    }

    _addToFavorites() {
       FileSystemHelper.addToFavorites({
           srcLarge: this.props.details.srcLarge
       });

        this.setState({
            showDetails: false
        });
    }

    _downloadToDevice() {
        this.setState({animating: true});

        let successCallback = () => {
            this.setState({
                animating: false,
                showDetails: false
            });
        };

        let dontShowAgainCallback = () => {
            config.showDownloadAlert = false;
        };

        FileSystemHelper.downloadToDevice({
            successCallback: successCallback,
            dontShowAgainCallback: dontShowAgainCallback,
            srcLarge: this.props.details.srcLarge,
        });
    }

    _removeFromDevice() {
        let successCallback = () => {
            this.props.details.favoritesItemRemoved();
        };

        this.setState({
            showDetails: false
        });
        FileSystemHelper.removeFromFavorites({
            path: this.props.details.src,
            successCallback: successCallback
        });
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
                        { Platform.OS === 'android' &&
                            <TouchableOpacity style={styles.detailsClickableOption} onPress={this._onSetWallpaper.bind(this)}>
                                <View>
                                    <Text style={styles.detailsText}>Set wallpaper</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {!this.props.details.favoritesList &&
                        <TouchableOpacity style={styles.detailsClickableOption}
                                          onPress={this._addToFavorites.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Add to favorites</Text>
                            </View>
                        </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.detailsClickableOption} onPress={this._downloadToDevice.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Download</Text>
                            </View>
                        </TouchableOpacity>
                        {this.props.details.favoritesList &&
                        <TouchableOpacity style={styles.detailsClickableOption} onPress={this._removeFromDevice.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Remove from favorites</Text>
                            </View>
                        </TouchableOpacity>
                        }
                        <ActivityIndicator
                            animating={true}
                            style={{opacity: this.state.animating? 1 : 0}}
                        />
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageTileContainer: {
        flex: 1,
        position: 'relative',
    },
    imageTouchable: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 150
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

