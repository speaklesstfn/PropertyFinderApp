/**
 * Created by tfn on 16-12-22.
 */
import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Image, ActivityIndicator} from "react-native";

import SearchResults from './SearchResults';

function urlForQueryAndPage(key, value, pageNumber) {
    let data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;//此处data[key]是取键值为key的属性

    let queryString = Object.keys(data).map(key => {
        return key + '=' + encodeURIComponent(data[key]);
    }).join('&');

    return 'http://api.nestoria.co.uk/api?' + queryString;
}

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'beijing',
            isLoading: false,
            message: '',
        };
    }

    render() {
        let spinner = this.state.isLoading ? (<ActivityIndicator size='large'/>) : (<View/>);
        console.log('render,isLoading:' + this.state.isLoading);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.description}>
                        Search for houses to buy!
                    </Text>
                    <Text style={styles.description}>
                        Search by place-name, postcode or search near your location.
                    </Text>
                </View>

                <View
                    style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        underlineColorAndroid={'#F5FCFF'}
                        placeholder={'Search via name or postcode'}
                        onChange={this.onSearchStringChanged.bind(this)}
                    />
                    <TouchableHighlight
                        style={styles.buttonGo}
                        underlayColor={'#99d9f4'}
                        onPress={this.onSearchPressed.bind(this)}
                    >
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    style={styles.buttonLocation}
                    underlayColor={'#99d9f4'}
                    onPress={this.onLocationPressed.bind(this)}
                >
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>

                <Image style={styles.homeImage} source={require('./img/house.png')}/>

                {spinner}

                <Text style={styles.description}>{this.state.message}</Text>

            </View>
        );
    }

    onSearchStringChanged(event) {
        console.log('onSearchStringChanged');
        this.setState({searchString: event.nativeEvent.text});
        console.log('change completed');
    }

    _handleResponse(response) {
        const {navigator} = this.props;
        console.log('response');
        this.setState({isLoading: false, message: '',});
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log('Property Found ' + response.listings.length);

            //跳转到结果页
            navigator.push({
                title: 'SearchResults',
                component: SearchResults,
                params: {
                    lists: response.listings,
                },
            });
            console.log('response111');

        } else {
            this.setState({message: 'Location not recognized; please try again.'});
        }
    }

    _excuteQuery(query) {
        console.log('excuteQueryUrl:' + query);
        this.setState({isLoading: true, message: ''});
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error => this.setState({isLoading: false, message: 'Something bad happened ' + error,}));
    }

    onSearchPressed() {
        let query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._excuteQuery(query);
    }

    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
            location => {
                let search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({searchString: search,});
                let query = urlForQueryAndPage('centre_point', this.state.searchString, 1);
                this._excuteQuery(query);
            },
            error => {
                this.setState({
                    isLoading: false,
                    message: 'There was a problem with obtaining your location: ' + error
                });
            }
        );
    }
}

styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    title: {
        color: '#333333',
        textAlign: 'center',
        backgroundColor: '#F5FCFF',
        fontSize: 30,
        // marginTop: 5,
    },
    textContainer: {
        padding: 30,
        marginTop: 25,
        alignItems: 'center',
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    // finder: {
    //     flex: 3,
    // },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 10,
        marginBottom: 10,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    buttonGo: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    buttonLocation: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    homeImage: {
        height: 138,
        width: 217,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        marginTop: 10,
    },
});