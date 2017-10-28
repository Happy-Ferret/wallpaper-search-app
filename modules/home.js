import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import ListComponent from '../components/list/list';
import MenuComponent from '../components/menu/menu';

const flickrAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=';

export default class HomeModule extends React.Component {
    static navigationOptions = ({navigation})=> {
        return {
            title: 'Images Search App',
            headerLeft: <Button
                title="|||"
                color="#455A64"
                accessibilityLabel=""
                onPress={() => {
                    navigation.navigate('Menu')
                }}
            />
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            imagesList: []
        };
    }

    getImagesDataCallback(responseJson) {
        let imagesList = responseJson.items.map((item) => {
            return {
                src: item.media.m,
                title: item.title
            }
        });

        this.setState({imagesList: imagesList});
    }

    getImagesData(searchTerm) {
        fetch(flickrAPI + searchTerm, {
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this.getImagesDataCallback(responseJson);
        });
    }

    render() {
        return (
            <View>
                <View>
                    <MenuComponent searchForImages={this.getImagesData.bind(this)}></MenuComponent>
                </View>
                <View style={styles.listWrapper}>
                    <ListComponent items={this.state.imagesList}></ListComponent>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listWrapper: {
        height: '100%',
        backgroundColor: '#A1887F'
    }
});


