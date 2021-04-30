import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SvgXml } from 'react-native-svg';
import ArrowBack from '../assets/images/arrow-back.svg'
import SearchIcon from '../assets/images/search-icon.svg'

const CommonHeader = ( {navigation, title} ) => {
    return (
        <View style={styles.headerViewStyle}>
            <View style={styles.headerLeftViewStyle}>
                <TouchableOpacity hitSlop={{top:5,bottom:5,left:5,right:5}} style={ styles.headerLeftIconStyle} onPress={() => navigation.navigate('HomeScreen')}>
                    <SvgXml xml={ArrowBack} width="20" height="20" />
                </TouchableOpacity>
                <Text style={ styles.headerTextStyle }>{title}</Text>
            </View>
            <TouchableOpacity hitSlop={{top:5,bottom:5,left:5,right:5}} style={ styles.headerRightIconStyle} onPress={() => navigation.navigate('Filters')}>
                <SvgXml xml={SearchIcon} width="25" height="25" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerViewStyle: {
        height: 60,
        backgroundColor: '#1885BE',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    headerLeftViewStyle: {
        flexDirection:"row",
        justifyContent: "flex-start",
    },
    headerTextStyle: {
        fontSize: 20,
        left: 25,
        color: "#FFF"
    },
    headerLeftIconStyle: {
        left: 10,
        top: 3
    },
    headerRightIconStyle: {
        right: 25
    }
});

export default CommonHeader