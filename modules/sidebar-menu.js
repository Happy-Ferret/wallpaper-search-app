import React from 'react';
import {ListItem, Header, SectionList, Text, View} from 'react-native';

export default class SidebarMenu extends React.Component {
    static navigationOptions = ({navigation})=> {
        return {
            title: 'Menu Options'
        }
    };
    render() {
        return (
            <View>
            </View>
        );
    }
}


