import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { VISUAL } from '../../assets/styles/colors'
import { ScrollView } from 'react-native-gesture-handler'

const TodaysDue = () => {
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <View style={styles.todayTotalVaccinationCard}>
                    <Text style={styles.todayTotalVaccinationCardTextOne}>110</Text>
                    <Text style={styles.todayTotalVaccinationCardTextTwo}>Today Total Vaccination</Text>
                </View>
                <View style={styles.todayVaccinationWiseCardsView}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.27}}>
                            <View style={styles.mainCardViewOuter}>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>At 6 Weeks</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#E16F6F",...styles.mainCardViewNumberViewText,}}>100</Text>                                    
                                    </View>
                                    <View style={{flex: 1, marginBottom: 10}}>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PENTA-I</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>11</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>OPV-I</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>12</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PCV10-I</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>13</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>ROTA-I</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>14</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>At 10 Weeks</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#5E5A78",...styles.mainCardViewNumberViewText}}>34</Text>
                                    </View>
                                    <View style={{flex: 1, marginBottom: 10}}>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PENTA-II</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>11</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>OPV-II</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>12</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PCV10-II</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>13</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>ROTA-II</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>14</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.27,marginVertical:15}}>
                            <View style={styles.mainCardViewOuter}>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>At 14 Weeks</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#DEA127",...styles.mainCardViewNumberViewText}}>48</Text>
                                    </View>
                                    <View style={{flex: 1, marginBottom: 10}}>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PENTA-III</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>11</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>OPV-III</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>12</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>PCV10-III</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>13</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>IPV</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>14</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>At 9 Months</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#785A5A",...styles.mainCardViewNumberViewText}}>50</Text>
                                        <Text style={styles.singleDoseCardText}>Measles - I</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.27}}>
                            <View style={styles.mainCardViewOuter}>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>At 15 Months</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#DEA127",...styles.mainCardViewNumberViewText}}>48</Text>
                                        <Text style={styles.singleDoseCardText}>Measles - II</Text>
                                    </View>
                                </View>
                                <View style={styles.mainCardView}>
                                    <Text style={styles.mainCardViewTitle}>TT Vaccination</Text>
                                    <View style={styles.mainCardViewNumberView}>
                                        <Text style={{color: "#785A5A",...styles.mainCardViewNumberViewText}}>50</Text>
                                    </View>
                                    <View style={{flex: 1, marginBottom: 10}}>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>TT-II</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>11</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>TT-III</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>12</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardDosesDetailMainView}>
                                            <View style={styles.cardDosesDetail}>
                                                <Text style={styles.cardDosesDetailTextOne}>TT-IV</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>13</Text>
                                            </View>
                                            <View style={styles.cardDosesDetail}>
                                                <Text>TT-V</Text>
                                                <Text style={styles.cardDosesDetailTextTwo}>14</Text>
                                            </View>
                                        </View>
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

const styles = StyleSheet.create({
    todayTotalVaccinationCard: {
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
    },
    todayTotalVaccinationCardTextOne: {
        fontWeight: "bold", 
        fontSize:24, 
        fontFamily:"Roboto"
    },
    todayTotalVaccinationCardTextTwo: {
        fontWeight: "normal", 
        fontSize:11, 
        fontFamily:"Roboto",
        marginBottom: 10
    },
    todayVaccinationWiseCardsView: {
        flex:0.8, 
        marginHorizontal:10, 
        marginTop: 10,
        marginVertical: 10
    },
    mainCardViewOuter: {
        flex:1, 
        flexDirection:"row", 
        alignContent:"space-between"
    },
    mainCardView: {
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
        backgroundColor: "#F9F9F9",
    },
    mainCardViewTitle: {
        color:"#EF2B4D",
        paddingLeft: 5
    },
    mainCardViewNumberView: {
       // justifyContent: "center", 
        alignItems: "center", 
        //marginTop:5
    },
    mainCardViewNumberViewText: {
        fontWeight: "bold", 
        fontSize:36, 
        fontFamily:"Roboto"
    },
    cardDosesDetailMainView: {
        flex: 0.5, 
        flexDirection:"row", 
        justifyContent: "space-between", 
        marginHorizontal: 10
    },
    cardDosesDetail:{
        flex: 0.45, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
    },
    cardDosesDetailTextOne: {
        color:"#000", 
        marginRight: 2,
    },
    cardDosesDetailTextTwo: {
        color: "#1885BE", 
        fontWeight: "bold", 
        borderColor: "#000", 
        borderWidth: StyleSheet.hairlineWidth, 
        borderRadius:2, 
        paddingHorizontal: 2,
        marginVertical: 1
    },
    singleDoseCardText: {
        fontWeight: "normal", 
        fontSize:14, 
        fontFamily:"Roboto"
    },
});

export default TodaysDue
