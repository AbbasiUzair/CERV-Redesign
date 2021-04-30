import React, { useState, useContext } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import LoginBanner from '../../assets/images/login-banner.svg'
import PaceLogo from '../../assets/images/pace-logo.svg'
import UsernameIcon from '../../assets/images/username-icon.svg'
import PasswordIcon from '../../assets/images/password-icon.svg'
import LogoutIcon from '../../assets/images/logout-icon.svg'
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../App'

const Separator = () => (
    <View style={styles.separator} />
);

const Login = () => {
    
    const { signIn } = useContext(AuthContext);

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }}>
            <View style={styles.mainView}>
                <View style={styles.loginBannerView}>
                    <SvgXml xml={LoginBanner} style={styles.BannerSvg}/>
                </View>
                <View style={styles.loginInputView}>
                    <View style={{flexDirection:"row", alignItems:"flex-end"}}>
                        <SvgXml xml={UsernameIcon} width={30} height={30} style={{marginRight:10}}/>
                        <TextInput
                            style={styles.loginInput}
                            underlineColorAndroid="transparent"
                            onChangeText={newValue => setUserName(newValue)}
                            value={username}
                            keyboardType= "phone-pad"
                            textContentType= "username"
                        />
                    </View>
                    <Separator />
                    <View style={{flexDirection:"row", alignItems:"flex-end"}}>
                        <SvgXml xml={PasswordIcon} width={30} height={30} style={{marginRight:10}}/>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.loginInput}
                            underlineColorAndroid="transparent"
                            onChangeText={newValue => setPassword(newValue)}
                            value={password}
                            keyboardType= "number-pad"
                            textContentType= "password"
                        />
                    </View>
                    <Separator />
                    <View>
                        <TouchableOpacity style={styles.loginButton} onPress={() => signIn({ username, password })}>
                            <Text style={{fontWeight:"bold",color:"#FFF"}}>LOGIN   </Text>
                            <SvgXml xml={LogoutIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.logoView}>
                    <SvgXml xml={PaceLogo} style={styles.logoSvg}/>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    loginBannerView: {
        flex: 0.3,
        alignSelf: "stretch", 
        backgroundColor: "#F5F8FA",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 5.84,
        elevation: 9,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    BannerSvg: {
        /* borderColor:"red",
        borderWidth:1, */
    },
    loginInputView: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center",
    },
    logoView: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    logoSvg: {
        right: 15
    },
    separator: {
        marginHorizontal: 55,
        marginBottom: 20,
        marginTop: 10,
        borderBottomColor: '#1885BE',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: "stretch"
    },
    loginButton: {
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center", 
        backgroundColor:"#1885BE", 
        width:144, 
        height: 35, 
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 5.84,
        elevation: 9,
    },
    loginInput: {
        borderLeftWidth: 1, 
        borderLeftColor: "#1885BE", 
        paddingLeft: 15, 
        height: 30, 
        width: 280,
        paddingBottom: 0,
        fontSize: 18
    }
});

export default Login