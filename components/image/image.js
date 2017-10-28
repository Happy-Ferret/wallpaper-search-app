import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View, Image} from 'react-native';

export default class ImageComponent extends React.Component {
    _onAreaPress() {
        this.props.onItemSelected(this.props.details);
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onAreaPress.bind(this)}>
                <View style={styles.imageWrapper}>
                    <Text>{this.props.details.title}</Text>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: this.props.details.src}}
                    />
                </View>
            </TouchableHighlight>

        );
    }
}

const styles = StyleSheet.create({
    imageWrapper: {
        padding: 10,
        borderBottomWidth: 1
    }
});

