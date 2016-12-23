/**
 * Created by tfn on 16-12-22.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default class NavigatorTitle extends Component {
    static defaultProps = {
        title: 'Hello World',
    };

    render() {
        return <Text style={styles.text}>{this.props.title}</Text>;
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#333333',
        textAlign: 'center',
        backgroundColor: '#F5FCFF',
        fontSize: 30,
        // marginTop: 5,
    },
});