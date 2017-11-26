import React from 'react';
import {NativeModules, Linking, Switch, ScrollView, StyleSheet, Text, View} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import config from './../../config/config';
import ImageTileComponent from '../imageTile/imageTile';
import FileSystemHelper from './../../services/file-system.service';

export default class FavoritesComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filesList: [],
            flickrSwitchOn: config.flickrActive,
            unsplashSwitchOn: !config.flickrActive
        };

        this._getImagesList();
    }

    _getImagesList() {
        FileSystemHelper.getImagesList().then((files) => {
            this.setState({filesList: files})
        });
    }

    _flickrSwitch(value) {
       this.setState({flickrSwitchOn: value});

       if(value === true){
           this.setState({unsplashSwitchOn: false})
       }
    }

    _unsplashSwitch(value) {
        this.setState({unsplashSwitchOn: value});

        if(value === true){
            this.setState({flickrSwitchOn: false});
            //Linking.openURL('https://unsplash.com/oauth/authorize?client_id=0dcdc8339dc5acd862f68e947934119feef542a9ec30e212935dba03156a0c11&response_type=code&redirect_uri=myapp://test');
        }
    }


    componentDidMount() {
        Linking.getInitialURL().then((ev) => {
            if (ev) {}
        });

        Linking.addEventListener('url', (response)=> {
            console.error(response);
        });
    }

    shouldComponentUpdate(props, state) {
         config.flickrActive = state.flickrSwitchOn;

         return state;
     }

    _setWallpaper(details) {
        NativeModules.WallpaperManagerModule.setNewWallpaperFromUrl(details.srcLarge);
    }

    render() {
        return (
            <View>
                <Text style={styles.headingText}>Favorite Images:</Text>
                <ScrollView horizontal={true}>
                    <View style={styles.scrollViewContent}>
                    {this.state.filesList.map(function(url, i){
                        return <View style={styles.favoriteImage}>
                                <ImageTileComponent
                                    details={
                                        {
                                            srcLarge: url,
                                            src: url,
                                            favoritesList: true,
                                            favoritesItemRemoved: this._getImagesList.bind(this)
                                        }
                                    }
                                    onItemSelected={this._setWallpaper.bind(this)}
                            ></ImageTileComponent>
                            </View>
                    }.bind(this))}
                    </View>
                </ScrollView>
                <Text style={styles.headingText}>Fetch Images From:</Text>
                <View style={styles.checkboxGroup}>
                    <Switch
                        style={styles.checkboxGroupSwitch}
                        onValueChange={this._flickrSwitch.bind(this)}
                        value={this.state.flickrSwitchOn} />
                    <Text
                        style={styles.checkboxGroupText}>Flickr</Text>
                </View>
                <View style={styles.checkboxGroup}>
                    <Switch
                        style={styles.checkboxGroupSwitch}
                        onValueChange={this._unsplashSwitch.bind(this)}
                        value={this.state.unsplashSwitchOn} />
                    <Text
                        style={styles.checkboxGroupText}>Unsplash</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    favoriteImage: {
        width: 200,
        height: 150
    },
    scrollViewContent: {
        flexDirection: 'row',
    },
    headingText: {
        padding: 10,
        fontSize: 16
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

