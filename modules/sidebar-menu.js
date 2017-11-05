import React from 'react';
import {View, StyleSheet} from 'react-native';

import FavoritesComponent from './../components/favorites/favorites';

export default class SidebarMenu extends React.Component {
    static navigationOptions = ({navigation})=> {
        return {
            title: 'Menu Options'
        }
    };
    render() {
        return (
            <View style={styles.sidebarMenu}>
                <FavoritesComponent/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    sidebarMenu: {
        flex: 1
    }
});