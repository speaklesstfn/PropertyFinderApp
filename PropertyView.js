/**
 * Created by tfn on 16-12-23.
 */

import React, {Component} from 'react';
import {
    StyleSheet, BackAndroid, View, Image, Text,
} from 'react-native';

export default class PropertyView extends Component {
    componentDidMount() {
        let {navigator} = this.props;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });
    }

    componentDidUnMount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        let property = this.props.property;
        let stats = property.bedroom_number + ' bed ' + property.property_type;
        if (property.bathroom_number) {
            stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
        }
        let price = property.price_formatted;

        return (
            <View>
                <Text style={styles.porpertyTitle}>{this.props.title}</Text>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: property.img_url}}/>
                    <View style={styles.heading}>
                        <Text style={styles.price}>{price}</Text>
                        <Text style={styles.title}>{property.title}</Text>
                        <View style={styles.separator}/>
                    </View>
                    <Text style={styles.description}>{stats}</Text>
                    <Text style={styles.description}>{property.summary}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    porpertyTitle: {
        color: '#333333',
        textAlign: 'center',
        backgroundColor: '#F5FCFF',
        fontSize: 30,
        marginBottom: 5,
    },
    container: {
        marginTop: 5
    },
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: 400,
        height: 300
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        margin: 5,
        color: '#656565'
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    },
});