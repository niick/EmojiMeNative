import React from 'react';
import {StyleSheet, Text, View, TextInput, AppRegistry} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput placeholder={"Your name here"}
                           onChangeText={(text) => this.setState({text})}/>
                <Swatch name={this.state.text}/>
            </View>
        );
    }

}

class Swatch extends React.Component {
    render() {
        const nameHash = "#" + this.calcColor(this.props.name);
        const spanStyle = {backgroundColor: nameHash, minWidth: "100%", minHeight: 800};
        const textStyle = {color: nameHash, fontSize: "126px"};
        console.log(spanStyle);
        const emoji = this.calcEmoji(this.props.name);
        console.log("Emoji is: " + emoji);

        return (
            <Text style={styles.bigresult}>{emoji}</Text>
        );
    }

    hashFunc(input) {
        console.log(input);
        console.log(typeof input);
        let hash = 0, i, chr, len;
        if (typeof input == 'undefined' || input.length === 0) return hash;
        for (i = 0, len = input.length; i < len; i++) {
            chr = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash >= 0 ? hash : hash * -1;
    }

    calcColor(name) {
        let decHash = this.hashFunc(name);
        decHash = decHash % 16777215;
        return decHash.toString(16);
    }

    calcEmoji(name) {
        //  E63E through E757
        let decHash = this.hashFunc(name);
        const range = parseInt("1F52F", 16) - parseInt("1F300", 16);
        decHash = parseInt("1F300", 16) + (decHash % range);
        console.log("decHash = " + decHash);
        const hex = decHash.toString(16);
        console.log("hex = " + hex);
        const point = String.fromCodePoint(parseInt(hex, 16));
        console.log(point);
        return point;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigresult: {
        fontSize: 128
    }
});
