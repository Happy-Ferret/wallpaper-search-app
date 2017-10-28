import React from 'react';
import {Keyboard, Button, StyleSheet, TextInput, View} from 'react-native';

export default class MenuComponent extends React.Component {

    searchForImages(){
        this.props.searchForImages(this.state.searchText);
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.menuContainer}>
                    <TextInput onChangeText={(text) => this.setState({'searchText': text || ""})}  style={styles.searchInput} editable={true}/>
                    <Button
                        title="Search"
                        color="#455A64"
                        accessibilityLabel=""
                        onPress={()=> {this.searchForImages()}}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    menu: {
        backgroundColor: '#607D8B',
        height: 50
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    searchInput: {
        width: 200
    }
});
