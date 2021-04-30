import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const DefaulterWomen = () => {
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <View style={{
                                flex:0.1, 
                                marginTop: 15, 
                                marginHorizontal:15, 
                                borderColor: "#C2C2C2", 
                                borderWidth: 0, 
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 9.25,
                                shadowRadius: 1.84,
                                elevation: 5,
                                borderRadius: 10,
                                backgroundColor: "#ECEAEA",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                    <Text style={{fontWeight: "bold", fontSize:24, fontFamily:"Roboto"}}>987650</Text>
                    <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>Total Register Mothers in Province</Text>
                </View>
                <View style={{
                                flex:0.8, 
                                marginHorizontal:15, 
                                marginVertical:15
                            }}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.22}}>
                            <View style={{
                                            flex:1, 
                                            flexDirection:"row", 
                                            alignContent:"space-between"
                                        }}>
                                <View style={{
                                                flex:0.5, 
                                                marginRight:5, 
                                                borderColor: "#C2C2C2", 
                                                borderWidth: 0, 
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 9.25,
                                                shadowRadius: 1.84,
                                                elevation: 5,
                                                borderRadius: 10,
                                                backgroundColor: "#F9F9F9"
                                            }}>
                                    <Text style={{color:"#EF2B4D",paddingLeft: 5}}>Defaulters</Text>
                                    <View style={{justifyContent: "center", alignItems: "center", marginTop:5}}>
                                        <Text style={{color: "#E16F6F", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>10</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>TT2</Text>
                                    </View>
                                </View>
                                <View style={{
                                                flex:0.5, 
                                                marginLeft:5, 
                                                borderColor: "#C2C2C2", 
                                                borderWidth: 0, 
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 9.25,
                                                shadowRadius: 1.84,
                                                elevation: 5,
                                                borderRadius: 10,
                                                backgroundColor: "#F9F9F9"
                                            }}>
                                    <Text style={{color:"#EF2B4D",paddingLeft: 5}}>Defaulters</Text>
                                    <View style={{justifyContent: "center", alignItems: "center", marginTop:5}}>
                                        <Text style={{color: "#5E5A78", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>34</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>TT3</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.22,marginVertical:15}}>
                            <View style={{
                                            flex:1, 
                                            flexDirection:"row", 
                                            alignContent:"space-between"
                                        }}>
                                <View style={{
                                                flex:0.5, 
                                                marginRight:5, 
                                                borderColor: "#C2C2C2", 
                                                borderWidth: 0, 
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 9.25,
                                                shadowRadius: 1.84,
                                                elevation: 5,
                                                borderRadius: 10,
                                                backgroundColor: "#F9F9F9"
                                            }}>
                                    <Text style={{color:"#EF2B4D",paddingLeft: 5}}>Defaulters</Text>
                                    <View style={{justifyContent: "center", alignItems: "center", marginTop:5}}>
                                        <Text style={{color: "#DEA127", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>48</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>TT4</Text>
                                    </View>
                                </View>
                                <View style={{
                                                flex:0.5, 
                                                marginLeft:5, 
                                                borderColor: "#C2C2C2", 
                                                borderWidth: 0, 
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 9.25,
                                                shadowRadius: 1.84,
                                                elevation: 5,
                                                borderRadius: 10,
                                                backgroundColor: "#F9F9F9"
                                            }}>
                                    <Text style={{color:"#EF2B4D",paddingLeft: 5}}>Defaulters</Text>
                                    <View style={{justifyContent: "center", alignItems: "center", marginTop:5}}>
                                        <Text style={{color: "#785A5A", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>50</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>TT5</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DefaulterWomen
