import React from 'react';
import {CameraRoll, Platform, ActivityIndicator, Alert, TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

export default class ImageComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showDetails: false,
            animating: false,
        };

        this.showDownloadAlert = true;
    }

    _onSetWallpaper() {
        if(Platform.OS === 'android') {
            this.setState({animating: true});
            this.props.onItemSelected(this.props.details);
            this.setState({animating: false});
        }
    }

    _addToFavorites() {
        let path = RNFetchBlob.fs.dirs.DocumentDir + '/images';
        RNFetchBlob
            .config({
                path: path + '/img-'+ Date.now() + '.jpg',
            })
            .fetch('GET', this.props.details.srcLarge)
            .then((res) => {})
            .catch((err)=> {})
    }

    _notShowAlertAgain() {
        this.showDownloadAlert = false;
    }

    _downloadToDevice() {
        this.setState({animating: true});

        RNFetchBlob
            .config({
                path : RNFetchBlob.fs.dirs.DocumentDir + '/temp-images/img-'+ Date.now() + '.jpg'
            })
            .fetch('GET', this.props.details.srcLarge)
            .then((res) => {
                this.setState({animating: false});

                let path = res.path();
                if(Platform.OS === 'android'){
                    path = 'file:///' + path;
                }

                 CameraRoll.saveToCameraRoll(this.props.details.srcLarge)
                     .then(()=> {
                         if(this.showDownloadAlert) {
                             Alert.alert(
                                 'Download Success',
                                 'Downloaded file is available in Photos/Gallery',
                                 [
                                     {text: 'Dont show again', onPress: () => this._notShowAlertAgain()},
                                     {text: 'OK'}
                                 ],
                                 {cancelable: false}
                             )
                         }
                     })
                     .catch((err)=> {console.error(err)});


                /*if(Platform.OS === 'android'){
                    RNFetchBlob.fs.scanFile([ { path : res.path(),  mime : 'image/jpeg' }]);
                }*/
            })
            .catch((err) => {console.error(err)})
    }

    render() {
        return (
            <View style={styles.imageTileContainer}>
                <TouchableOpacity style={styles.imageTouchable} onPress={()=> {this.setState({showDetails: true})}}>
                    <Image style={[styles.image]}
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
                        <TouchableOpacity style={styles.detailsClickableOption} onPress={this._downloadToDevice.bind(this)}>
                            <View>
                                <Text style={styles.detailsText}>Download</Text>
                            </View>
                        </TouchableOpacity>
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
        position: 'relative'
    },
    imageTouchable: {
        flex: 1
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

