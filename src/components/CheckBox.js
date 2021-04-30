import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import * as colors from '../../assets/styles/colors';

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = colors.APP_COLOR, text = '', iconcolor = 'lightgray', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color={iconcolor}
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />
        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

export default CheckBox

const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});