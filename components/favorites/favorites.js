import React from 'react';
import {Linking, Switch, ScrollView, Image, StyleSheet, Text, View} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import config from './../../config/config';

export default class FavoritesComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filesList: [],
            flickrSwitchOn: config.flickrActive,
            unsplashSwitchOn: config.unsplashActive
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
            //Linking.openURL('https://unsplash.com/oauth/authorize?client_id=0dcdc8339dc5acd862f68e947934119feef542a9ec30e212935dba03156a0c11&response_type=code&redirect_uri=myapp://people');
        }
    }


    componentDidMount() {
        Linking.getInitialURL().then((ev) => {
            if (ev) {
                //console.error(ev);
            }
        });

        Linking.addEventListener('url', (response)=> {
            console.error(response);
        });
    }

    shouldComponentUpdate(props, state) {
         config.flickrActive = state.flickrSwitchOn;

         return state;
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

