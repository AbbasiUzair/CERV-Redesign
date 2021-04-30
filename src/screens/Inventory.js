import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import axios from 'axios'

const Inventory = ( {navigation} ) => {
    
    const [showPendingVoucher, setshowPendingVoucher] = useState(false);
    const [vouchersList, setVoucherList] = useState([]);

    const [showColdChain, setShowColdChain] = useState(false);
    const [coldChainList, setColdChainList] = useState([]);

    const [currentStock, setCurrentStock] = useState([]);

    useEffect(() => {
        fetchVoucherInfo()
        fetchColdChainStatus()
        fetchCurrentStock()
    }, [])
    
    const SearchTags = ({ tagtitle }) => {
        return (
            <Ripple onPress={() => navigation.push('Voucher', {
                voucherno: tagtitle,
            })}>
                <View style={styles.searchTagStyle}>
                    <Text style={{ color: "#FFF", paddingHorizontal: 10 }}>{tagtitle}</Text>
                </View>
            </Ripple>
        )
    }

    const fetchVoucherInfo = async () => {
        await axios.get('http://epibeta.pacemis.com/API/cerv_api/vouchers/pending?token=1&curr_wh_type=6&curr_wh_code=351035')
        .then(result => {
            if(result.data.userdata.pendingvouchers.length > 0){
                setVoucherList(result.data.userdata.pendingvouchers);
                setshowPendingVoucher(true)
            }else{
                setVoucherList([]);
                setshowPendingVoucher(false)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    const fetchColdChainStatus = async () => {
        await axios.get('http://epibeta.pacemis.com/API/cerv_api/coldchain/info?token=1&curr_wh_type=6&curr_wh_code=351035')
        .then(result => {
            if(result.data.userdata.length > 0){
                setColdChainList(result.data.userdata);
                setShowColdChain(true)
            }else{
                setColdChainList([]);
                setShowColdChain(false)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const fetchCurrentStock = async () => {
        await axios.get('http://epibeta.pacemis.com/API/cerv_api/stocks/info?token=1&curr_wh_code=351035')
        .then(result => {
            if(result.data.userdata.currentstock.length > 0){
                setCurrentStock(result.data.userdata.currentstock);
            }else{
                setCurrentStock([]);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <ScrollView>
            <View style={styles.mainView}>
                {
                showPendingVoucher ? <View style={styles.inventoryCardView}>
                    <Text style={styles.inventoryCardHeading}>Pending Vouchers</Text>
                    <View style={{marginBottom: 5}}>
                        <View style={styles.searchTagsMainScrollArea}>
                            { 
                                vouchersList.map((item,index) => {
                                    return <SearchTags key={`${index}`} tagtitle={item.transaction_number} />        
                                })
                            }
                        </View>
                    </View>
                </View>
                :null
                }
                {showColdChain ? <View style={styles.inventoryCardView}>
                    <Text style={styles.inventoryCardHeading}>Cold Chain Status</Text>
                    <View style={{flex:1, marginBottom: 5}}>
                        {
                            coldChainList.map((item,index) => {
                                return (
                                    item.status == 3 ?<View key={`${index}`} style={styles.coldchainEquipmentView}>
                                        <View style={{flex:1, backgroundColor: '#E00000', ...styles.coldchainEquipmentFilledView,...styles.rectangle,}}>
                                            <Text style={styles.coldchainEquipmentName}>{item.asset_short_name}</Text>
                                            <Text style={styles.coldchainEquipmentFilledPerc}>Not Functional</Text>
                                        </View>
                                    </View>
                                    :item.usage_percentage > 100 ? <View key={`${index}`} style={styles.coldchainEquipmentView}>
                                        <View style={{flex:1, backgroundColor: '#DD8521', ...styles.coldchainEquipmentFilledView,...styles.rectangle,}}>
                                            <Text style={styles.coldchainEquipmentName}>{item.asset_short_name}</Text>
                                            <Text style={styles.coldchainEquipmentFilledPerc}>Overloaded</Text>
                                        </View>
                                    </View>
                                    :<View key={`${index}`} style={styles.coldchainEquipmentView}>
                                        <View style={{flex: item.usage_percentage/100, backgroundColor: '#008000', ...styles.coldchainEquipmentFilledView, ...styles.rectangle,}}>
                                            <Text style={styles.coldchainEquipmentName}>{item.asset_short_name}</Text>
                                            {item.usage_percentage > 20 ? <Text style={styles.coldchainEquipmentFilledPerc}>{item.usage_percentage}%</Text>
                                            :null
                                            }
                                        </View>
                                        <View style={{flex:1-item.usage_percentage/100, ...styles.coldchainEquipmentUnFilledView,...styles.rectangle,}}>
                                            {item.usage_percentage <= 20 ? <Text style={{...styles.coldchainEquipmentFilledPerc, alignSelf: "center"}}>{item.usage_percentage}%</Text>
                                            :null
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={styles.infoMainView}>
                            <View style={styles.infoInnerView}>
                                <View style={{...styles.infoRectangle, backgroundColor:"#578EBE",}}></View>
                                <Text style={styles.infoRectangleText}>Unused Capacity</Text>
                            </View>
                            <View style={styles.infoInnerView}>
                                <View style={{...styles.infoRectangle, backgroundColor:"#008000",}}></View>
                                <Text style={styles.infoRectangleText}>Used Capacity</Text>
                            </View>
                            <View style={styles.infoInnerView}>
                                <View style={{...styles.infoRectangle, backgroundColor:"#DD8521",}}></View>
                                <Text style={styles.infoRectangleText}>Overload</Text>
                            </View>
                            <View style={styles.infoInnerView}>
                                <View style={{...styles.infoRectangle, backgroundColor:"#E00000",}}></View>
                                <Text style={styles.infoRectangleText}>Nonfunctional</Text>
                            </View>
                        </View>
                    </View>
                </View>
                :null
                }
                <View style={{...styles.inventoryCardView}}>
                    <Text style={styles.inventoryCardHeading}>Current Vaccine Stock</Text>
                    <View style={{flexDirection:"row",flexWrap:"wrap", justifyContent: "flex-start", marginHorizontal: 5,marginVertical:5}}>
                        {
                            currentStock.map((item, index) => {
                                return (
                                    <View key={index} >
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
                                            <Text style={{fontSize: 20, fontFamily: "Roboto", fontWeight: "bold", color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'}}>{item.stock_vials}</Text>
                                            <Text style={{fontSize: 10, fontFamily: "Roboto", fontWeight: "600", color: "#626267", alignSelf: "center"}}>Vials</Text>
                                        </View>
                                        <Text style={{fontSize: 10, fontFamily: "Roboto", fontWeight: "700", color: "#626267", alignSelf: "center"}}>{item.item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex:1, 
        marginBottom: 10
    },
    searchTagsMainScrollArea: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    searchTagStyle: {
        flexDirection: "row",
        backgroundColor: "#DC6767",
        alignSelf: 'flex-start',
        alignItems: "center",
        height: 35,
        borderRadius: 3,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 3,
        fontSize: 14
    },
    inventoryCardView: {
        flex: -1, 
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
        borderRadius: 5,
        backgroundColor: "#ECEAEA",
        justifyContent: "center",
        alignItems: "center"
    },
    inventoryCardHeading: {
        fontWeight: "800", 
        fontSize:16, 
        fontFamily:"Roboto"
    },
    rectangle: {
        height: 40,
        marginBottom: 2,
    }, 
    coldchainEquipmentName:{
        color: "#FFF", 
        fontWeight: "bold", 
        marginLeft: 10
    },
    coldchainEquipmentFilledPerc: {
        color: "#FFF", 
        fontWeight: "bold", 
        marginRight: 10,
        backgroundColor: "transparent",
    },
    coldchainEquipmentFilledView: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
    },
    coldchainEquipmentView: {
        flex:1, 
        flexDirection:"row", 
        width: "95%"
    },
    coldchainEquipmentUnFilledView: {
        backgroundColor: '#578EBE',
        justifyContent: "center"
    },
    infoMainView: {
        flex:1, 
        flexDirection: "row", 
        justifyContent:"center", 
        alignItems: "center"
    },
    infoInnerView: {
        flex:0.25,
        flexDirection: "row", 
        justifyContent: "flex-start",
        alignItems: "center"
    },
    infoRectangle: {
        width: 15, 
        height: 15
    },
    infoRectangleText: {
        fontSize: 8, 
        paddingLeft: 2
    },
});

export default Inventory
