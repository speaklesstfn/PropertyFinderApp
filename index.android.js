/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Navigator,
} from 'react-native';

import SearchPage from './SearchPage';

export default class PropertyFinderApp extends Component {
    render() {
        return (
            <View style={styles.container}
            >
                <Navigator
                    initialRoute={{title:'Property Finder',component:SearchPage,}}
                    renderScene={(route,navigator)=>{
                        let MyComponent = route.component;
                        if(MyComponent){
                            return (<MyComponent {...route.params} title={route.title} navigator={navigator}/>);
                        }
                    }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('PropertyFinderApp', () => PropertyFinderApp);
