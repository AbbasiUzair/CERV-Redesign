import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import {ChildDetailContext} from './ChildDetail';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import BabyGirl from '../../assets/images/baby-girl.svg';
import BabyBoy from '../../assets/images/baby-boy.svg';
import CHECK from '../../assets/images/check.svg';
import CROSS from '../../assets/images/cross.svg';

function VaccinationDetail() {
    const childData = useContext(ChildDetailContext);
    return (
        <ScrollView>
            <View style={{flex: 1, marginHorizontal: 15, marginVertical: 5}}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
                >
                    <View style={{
                        width: 80, 
                        height: 80,  
                        borderRadius: 80/2, 
                        borderColor: "#C2C2C2", 
                        backgroundColor: "#FFFFFF",
                        borderWidth: 0, 
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 9.25,
                        elevation: 5,
                        justifyContent: "center", 
                        alignItems: "center",
                        marginVertical: 10,
                        marginHorizontal: 5
                    }}>
                        <SvgXml xml={childData.gender=='m'?BabyBoy:BabyGirl} width={40} height={40} />
                    </View>
                    <View>
                        <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>{childData.nameofchild} {childData.gender=='m'?'S/O':'D/O'} {childData.fathername}</Text>
                        <Text>Child Card Number: {childData.cardno}</Text>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At Birth</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>BCG</Text>
                                    <SvgXml xml={childData.bcg==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.bcg==null?'YYYY-MM-DD':childData.bcg}</Text>
                            </View>
                            <View style={{marginHorizontal: 25}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>OPV-0</Text>
                                    <SvgXml xml={childData.opv0==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.opv0==null?'YYYY-MM-DD':childData.opv0}</Text>
                            </View>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>HEP-B</Text>
                                    <SvgXml xml={childData.hepb==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.hepb==null?'YYYY-MM-DD':childData.hepb}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At 6 Weeks</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PENTA-1</Text>
                                    <SvgXml xml={childData.penta1==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.penta1==null?'YYYY-MM-DD':childData.penta1}</Text>
                            </View>
                            <View style={{marginHorizontal: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>OPV-1</Text>
                                    <SvgXml xml={childData.opv1==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.opv1==null?'YYYY-MM-DD':childData.opv1}</Text>
                            </View>
                            <View style={{marginRight: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PCV-1</Text>
                                    <SvgXml xml={childData.pcv1==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.pcv1==null?'YYYY-MM-DD':childData.pcv1}</Text>
                            </View>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>ROTA-1</Text>
                                    <SvgXml xml={childData.rota1==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.rota1==null?'YYYY-MM-DD':childData.rota1}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At 10 Weeks</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PENTA-2</Text>
                                    <SvgXml xml={childData.penta2==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.penta2==null?'YYYY-MM-DD':childData.penta2}</Text>
                            </View>
                            <View style={{marginHorizontal: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>OPV-2</Text>
                                    <SvgXml xml={childData.opv2==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.opv2==null?'YYYY-MM-DD':childData.opv2}</Text>
                            </View>
                            <View style={{marginRight: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PCV-2</Text>
                                    <SvgXml xml={childData.pcv2==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.pcv2==null?'YYYY-MM-DD':childData.pcv2}</Text>
                            </View>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>ROTA-2</Text>
                                    <SvgXml xml={childData.rota2==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.rota2==null?'YYYY-MM-DD':childData.rota2}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At 14 Weeks</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PENTA-3</Text>
                                    <SvgXml xml={childData.penta3==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.penta3==null?'YYYY-MM-DD':childData.penta3}</Text>
                            </View>
                            <View style={{marginHorizontal: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>OPV-3</Text>
                                    <SvgXml xml={childData.opv3==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.opv3==null?'YYYY-MM-DD':childData.opv3}</Text>
                            </View>
                            <View style={{marginRight: 10}}>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>PCV-3</Text>
                                    <SvgXml xml={childData.pcv3==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.pcv3==null?'YYYY-MM-DD':childData.pcv3}</Text>
                            </View>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>IPV</Text>
                                    <SvgXml xml={childData.ipv==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.ipv==null?'YYYY-MM-DD':childData.ipv}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At 9 Months</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>Measles - 1</Text>
                                    <SvgXml xml={childData.measles1==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.measles1==null?'YYYY-MM-DD':childData.measles1}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
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
                    backgroundColor: "#F9F9F9",
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                >
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 15, marginTop: 10}}>Valid Age : At 15 Months</Text>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", marginVertical: 15}}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Text>Measles - 2</Text>
                                    <SvgXml xml={childData.measles2==null?CROSS:CHECK} width={10} height={10} />
                                </View>
                                <Text>{childData.measles2==null?'YYYY-MM-DD':childData.measles2}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default VaccinationDetail
