import React from 'react';
import {View} from 'react-native';

import FavoritesComponent from './../components/favorites/favorites';

export default class SidebarMenu extends React.Component {
    static navigationOptions = ({navigation})=> {
        return {
            title: 'Menu Options'
        }
    };
    render() {
        return (
            <View>
                <FavoritesComponent/>
            </View>
        );
    }
}