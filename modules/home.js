import React from 'react';
import {Image, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import config from './../config/config';
import ListComponent from '../components/list/list';
import MenuComponent from '../components/menu/menu';

export default class HomeModule extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Images Search',
            headerTitleStyle: {
            },
            headerLeft: (<TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => {
                                navigation.navigate('Menu')
                            }}>
                            <Text style={styles.menuButtonText}>|||</Text>
                        </TouchableOpacity>),
            headerRight: (<TouchableOpacity
                style={styles.searchButton}
                onPress={()=> {navigation.state.params.searchPress()}}>
                <Image style={styles.searchImage} source={require('./../images/magnifier.png')}></Image>
            </TouchableOpacity>)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            imagesList: [],
            ajaxInProgress: false,
            showSearchBox: false
        };
        this.searchTerm = '';
        this.idx = 0;
        this.ajaxInProgress = false;
    }

    searchPress(){
        this.setState({showSearchBox: !this.state.showSearchBox});
    }

    componentWillMount() {
        this.props.navigation.setParams({searchPress: this.searchPress.bind(this)});
    }

    getImagesDataCallback(responseJson) {
        let imagesList = responseJson.items.map((item) => {
            return {
                src: item.media.m,
                title: item.title
            }
        });

        if (this.idx) {
            this.setState({imagesList: this.state.imagesList.concat(imagesList)});
        }
        else {
            this.setState({imagesList: imagesList});
        }
    }


    getImagesData() {
        let endpoint = config.flickrAPI + this.searchTerm + '&idx=' + this.idx;
        this.fetchData({
            endpoint: endpoint
        });
    }

    getImagesWithSearchTerm(searchTerm) {
        if (searchTerm !== this.searchTerm || (!searchTerm)) {
            this.idx = 0;
        }

        this.searchTerm = searchTerm;
        this.getImagesData();
    }

    fetchData(obj) {
        if (this.ajaxInProgress) {
            return;
        }

        this.ajaxInProgress = true;
        this.setState({ajaxInProgress: this.ajaxInProgress});

        fetch(obj.endpoint, {
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this.getImagesDataCallback(responseJson);
            this.idx++;
            this.ajaxInProgress = false;
            this.setState({ajaxInProgress: this.ajaxInProgress});
        }).catch((error)=> {
            this.ajaxInProgress = false;
            this.setState({ajaxInProgress: this.ajaxInProgress});
        })
    }

    render() {
        return (
            <View style={styles.home}>
                {this.state.showSearchBox === true &&
                    <View style={styles.menu} elevation={5}>
                        <MenuComponent searchForImages={this.getImagesWithSearchTerm.bind(this)}></MenuComponent>
                    </View>
                }

                <View style={this.state.ajaxInProgress? styles.loader: styles.loaderHidden}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={styles.spinner}
                        size="large"
                    />
                </View>
                <View>
                    <ListComponent getData={this.getImagesData.bind(this)}
                                   items={this.state.imagesList}></ListComponent>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1
    },
    menu: {
        backgroundColor: '#607D8B',
        height: 50
    },
    menuButton: {
        paddingLeft: 20
    },
    searchButton: {
        paddingRight: 20
    },
    searchImage: {
        width: 20,
        height: 20
    },
    menuButtonText: {
        fontSize: 30,
        transform: [{rotate: '90deg'}]
    },
    loader: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        zIndex: 9999,
    },
    loaderHidden: {
        display: 'none'
    },
    spinner: {
        transform: [{scale: 1.5}]
    }
});


