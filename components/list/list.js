import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import ImageComponent from './../image/image';

import {NativeModules} from 'react-native';


export default class ListComponent extends React.Component {

    itemSelected(details) {
        let newSrc = details.src.replace('_m.', '_h.');
        NativeModules.WallpaperManagerModule.setNewWallpaperFromUrl(newSrc);
    }

    endReached() {
        this.props.getData();
    }

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <View>
                <FlatList
                    extraData={this.state}
                    data={this.props.items}
                    renderItem={({item, index}) => {
                        return (
                            <View style={index%2? styles.listItemOdd: styles.listItemEven}>
                                <ImageComponent
                                    details={item}
                                    onItemSelected={this.itemSelected.bind(this)}
                                ></ImageComponent>
                            </View>
                        )
                        }
                    }
                    onEndReached={this.endReached.bind(this)}
                ></FlatList>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listItemOdd: {
        backgroundColor: '#CFD8DC',
    },
    listItemEven: {
        backgroundColor: '#ECEFF1'
    }
});

