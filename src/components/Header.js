import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Close from '../../assets/images/close.svg';


const Header = ( {props} ) => {
    return (
        <View style={styles.headerViewStyle}>
                <Text style={ styles.headerTextStyle }>FILTERS</Text>
                <TouchableOpacity hitSlop={{top:5,bottom:5,left:5,right:5}} style={ styles.headerCrossTextStyle} onPress={() => props.goBack(null)}>
                    <SvgXml xml={Close} width="15" height="15" />
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerViewStyle: {
        height: 60,
        width: '100%',
        backgroundColor: '#CDD6DE',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTextStyle: {
        fontSize: 20,
        left: 25
    },
    headerCrossTextStyle: {
        fontSize: 15,
        right: 25,
    }
});

export default Header