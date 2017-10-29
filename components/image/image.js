import React from 'react';
import {CheckBox, TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';

export default class ImageComponent extends React.Component {
    _onAreaPress() {
        this.props.onItemSelected(this.props.details);
    }

    render() {
        return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.image}
                        source={{uri: this.props.details.src}}
                    />
                    <View style={styles.details}>
                        <TouchableOpacity style={styles.clickableOption} onPress={this._onAreaPress.bind(this)}>
                            <View>
                                <Text>Set wallpaper</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clickableOption}>
                            <View>
                                <Text>Add to favorites</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    imageWrapper: {
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 200,
        height: 200,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    clickableOption: {
        paddingTop: 5,
        paddingBottom: 5
    }
});

