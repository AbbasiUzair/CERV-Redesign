import React from 'react'
import { View, Text, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';

const DefaulterChilds = () => {
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
                    <Text style={{fontWeight: "bold", fontSize:24, fontFamily:"Roboto"}}>111995</Text>
                    <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>Total Register Children in Province (Less than 2 Year)</Text>
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
                                        <Text style={{color: "#E16F6F", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>67</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>OPV-I, ROTA-I, PCV10-I, PENTA-I</Text>
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
                                        <Text style={{color: "#5E5A78", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>33</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>OPV-II, ROTA-II, PCV10-II, PENTA-II</Text>
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
                                        <Text style={{color: "#DEA127", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>47</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>OPV-III, IPV, PCV10-III, PENTA-III</Text>
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
                                        <Text style={{color: "#785A5A", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>192</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>MEALSES - I</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.22}}>
                            <View style={{
                                            flex:1, 
                                            flexDirection:"row", 
                                            justifyContent:"center", 
                                            alignContent:"space-around"
                                        }}>
                                <View style={{
                                                flex:0.5, 
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
                                        <Text style={{color: "#74DF4F", fontWeight: "bold", fontSize:36, fontFamily:"Roboto"}}>72</Text>
                                        <Text style={{fontWeight: "normal", fontSize:11, fontFamily:"Roboto", marginBottom: 10}}>MEALSES - II</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Button
                    title="Read results from AsyncStorage"
                    onPress={async () => {
                        const result = await AsyncStorage.getItem('@MyApp:key123')
                        console.log(result) 
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default DefaulterChilds
