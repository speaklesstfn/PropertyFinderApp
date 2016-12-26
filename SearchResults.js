/**
 * Created by tfn on 16-12-23.
 */

import React, {Component} from 'react';
import {
    StyleSheet, ListView, Text, View, TouchableHighlight, BackAndroid, Image,
} from 'react-native';

import PropertyView from './PropertyView';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.lists),
        };
    }

    componentDidMount() {
        let {navigator} = this.props;
        let sdasdsa = this.props.aaaaa;
        console.log('aaaaa:' + sdasdsa);
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

    //点击房产项，跳转至详情页
    rowPressed(propertyGuid) {
        let property = this.props.lists.filter(prop => prop.guid === propertyGuid)[0];
        let {navigator} = this.props;
        //跳转到详情页
        navigator.push({
            title: 'PropertyView',
            component: PropertyView,
            params: {
                property: property,
            },
        });
    }

    //回调函数，返回一个可以渲染的组件
    renderRow(rowData, sectionID, rowID) {
        let price = rowData.price_formatted;
        return (
            <TouchableHighlight
                onPress={()=>this.rowPressed(rowData.guid)}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{uri:rowData.img_url}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{rowData.price_formatted}</Text>
                            <Text style={styles.title}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View >
                <Text style={styles.resultTitle}>{this.props.title}</Text>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    resultTitle: {
        color: '#333333',
        textAlign: 'center',
        backgroundColor: '#F5FCFF',
        fontSize: 30,
        marginBottom: 5,
    },
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});