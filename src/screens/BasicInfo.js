import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import {ChildDetailContext} from './ChildDetail';
import { ScrollView } from 'react-native-gesture-handler';
import { VISUAL } from '../../assets/styles/colors';
import { SvgXml } from 'react-native-svg';
import BabyGirl from '../../assets/images/baby-girl.svg';
import BabyBoy from '../../assets/images/baby-boy.svg';
import LOCATION_ICON from '../../assets/images/location.svg'
import EPICENTER_ICON from '../../assets/images/ic-epicenter.svg'
import VACCINATORNAME_ICON from '../../assets/images/ic-vaccinator-name.svg'
import VACCINATORCONTACT_ICON from '../../assets/images/ic-vaccinator-contact.svg'
import CALENDER_ICON from '../../assets/images/calender.svg'
import GENDER_ICON from '../../assets/images/gender.svg'

function BasicInfo() {
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
                    <View style={{marginHorizontal: 15}}>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={LOCATION_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>District / Tehsil / UC</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>UC: {childData.UnionCouncil}, Tehsil: {childData.Tehsil}, District: {childData.District}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={EPICENTER_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>EPI Center</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>{childData.facility}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={VACCINATORNAME_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>Vaccinator Name</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>Need Correction</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={VACCINATORCONTACT_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>Vaccinator Contact</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>Need Correction</Text>
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
                    marginHorizontal: 5
                }}
                >
                    <View style={{marginHorizontal: 15}}>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={CALENDER_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>Date of Birth</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>{childData.dateofbirth}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginVertical: 15}}>
                            <View>
                                <SvgXml xml={GENDER_ICON} width={25} height={25} />
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "normal", fontSize: 13}}>Gender</Text>
                                <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 13}}>{childData.gender=='m'?'Male':'Female'}</Text>
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
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, alignSelf: "center", color: "#626267", marginTop: 5 }}>Guardian Info</Text>
                    <View style={{ marginLeft: 35, marginVertical: 15 }}>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>Name: {childData.fathername}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>CNIC: {childData.fathercnic==null?'Nil':childData.fathercnic}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>Contact: {childData.contactno==null?'Nil':childData.contactno}</Text>
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
                    marginHorizontal: 5
                }}
                >
                    <Text style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, alignSelf: "center", color: "#626267", marginTop: 5 }}>Address</Text>
                    <View style={{ marginLeft: 35, marginVertical: 15 }}>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>Province: {childData.Province}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>District: {childData.District}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>Tehsil: {childData.Tehsil}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>UnionCouncil: {childData.UnionCouncil}</Text>
                        <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "#626267"}}>Village Mohallah: {childData.address}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default BasicInfo
