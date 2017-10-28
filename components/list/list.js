import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import ImageComponent from './../image/image';

import {NativeModules} from 'react-native';


export default class ListComponent extends React.Component {

    itemSelected(details) {
        NativeModules.MyModule.alert(details.src);
    }

    render() {
        return (
            <View style={styles.listWrapper}>
                <FlatList
                    data={this.props.items}
                    renderItem={({item}) =>
                        <ImageComponent
                            style={styles.listItem}
                            details={item}
                            onItemSelected={this.itemSelected.bind(this)}
                        ></ImageComponent>
                    }
                ></FlatList>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listWrapper: {
        backgroundColor: '#CFD8DC'
    },
    listItem: {
        borderWidth: 10
    }
});

