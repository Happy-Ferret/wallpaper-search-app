import React from 'react';
import {Text, Keyboard, TouchableOpacity, StyleSheet, TextInput, View} from 'react-native';

export default class MenuComponent extends React.Component {

    _searchForImages(){
        this.props.searchForImages(this.searchText || '');
        Keyboard.dismiss();

    }

    render() {
        return (
            <View style={styles.menuContainer}>
                <TextInput  underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(text) => this.searchText = text}  style={styles.searchInput} editable={true}/>
                <TouchableOpacity style={styles.searchButton} onPress={this._searchForImages.bind(this)}>
                    <Text adjustsFontSizeToFit={true} style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#455A64'
    },
    searchInput: {
        flex: 0.8,
        backgroundColor: '#FFFFFF',
        margin: 8,
        borderRadius: 5,
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 16
    },
    searchButton: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ECEFF1'
    }
});
