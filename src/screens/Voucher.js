import React, {useState, useEffect} from 'react'
import { Alert, View, Text, StyleSheet, Modal, TouchableHighlight, StatusBar } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import CheckBox from '../components/CheckBox'



const Voucher = ( {route, navigation} ) => {
    const [vouchersItemsList, setVoucherItemsList] = useState([]);
    const [showVoucherItemsList, setShowVoucherItemsList] = useState(false);
    const [ccLocations, setCcLocations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalValue, setModalValue] = useState(false);
    /* const ModalComponent = () => {
        console.log("modal visible", modalVisible);
        return (
            
        )
    } */

    useEffect(() => {
        fetchVoucherItemsInfo()
    }, [])

    const fetchVoucherItemsInfo = async () => {
        await axios.get('http://epibeta.pacemis.com/API/cerv_api/vouchers/voucher_info?token=1&curr_wh_type=6&curr_wh_code=351035&voucher_no='+ route.params.voucherno)
        .then(result => {
            if(result.data.userdata.voucherdata.detail.length > 0){
                setVoucherItemsList(result.data.userdata.voucherdata.detail);
                setCcLocations(result.data.userdata.ccloctypes);
                setShowVoucherItemsList(true)
            }else{
                setVoucherItemsList([]);
                setShowVoucherItemsList(false)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
        {modalVisible ? <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* <Text style={styles.modalText}>Hello World!</Text> */}
                    <View style={{flex:0.1, marginLeft: 15}}>
                        <Text style={{fontFamily: "Roboto", fontSize: 18, fontWeight: "bold", color: "#1278AE"}}>{modalValue.itemname}</Text>
                    </View>
                    <View style={{flex:0.9, paddingHorizontal: 15}}>
                        <View style={{paddingHorizontal: 15, flex:0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#ECE8E8", marginBottom: 3}}>
                            <Text style={{flex : 0.5}}>Purpose</Text>
                            <Text style={{flex : 0.5}}>{modalValue.purpose}</Text>
                        </View>
                        <View style={{paddingHorizontal: 15, flex:0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#ECE8E8", marginBottom: 3}}>
                            <Text style={{flex : 0.5}}>Batch #</Text>
                            <Text style={{flex : 0.5}}>{modalValue.batchnumber}</Text>
                        </View>
                        <View style={{paddingHorizontal: 15, flex:0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#ECE8E8", marginBottom: 3}}>
                            <Text style={{flex : 0.5}}>Quantity</Text>
                            <Text style={{flex : 0.5}}>{modalValue.quantity} {modalValue.item_unit_name}</Text>
                        </View>
                        <View style={{paddingHorizontal: 15, flex:0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#ECE8E8", marginBottom: 3}}>
                            <Text style={{flex : 0.5}}>Manufacturer</Text>
                            <Text style={{flex : 0.5}}>{modalValue.manuf_name}</Text>
                        </View>
                        <View style={{paddingHorizontal: 15, flex:0.2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "#ECE8E8", marginBottom: 3}}>
                            <Text style={{flex : 0.5}}>Expiry Date</Text>
                            <Text style={{flex : 0.5}}>{modalValue.expiry_date}</Text>
                        </View>
                    </View>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3", marginHorizontal: 15}}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>:null}
        {showVoucherItemsList?<ScrollView>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                <TouchableOpacity style={{flex: 0.4, marginHorizontal: 10}} onPress={() => navigation.goBack()}>
                    <Icons name="keyboard-backspace" size={40} color="#1885BE"  />
                </TouchableOpacity>
                <Text style={{flex: 0.6, fontFamily: "Roboto", fontWeight: "bold", fontSize: 18}}>Issue No. {route.params.voucherno}</Text>
            </View>
            { 
                vouchersItemsList.map((item, index) => {
                    return (
                        <View key={index} style={styles.voucherItemCardView}>
                            <View style={{flex: 0.2, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                                <Icons name="fullscreen-exit" size={30} color="#1885BE" onPress={() => {
                                    setModalVisible(true);
                                    setModalValue(item);
                                }} />
                                <Text style={{ backgroundColor: "#1885BE", color: "#FFF", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 3, }}>Purpose {item.purpose}</Text>
                            </View>
                            <View style={{flex: 0.2, flexDirection: "row", justifyContent:"space-between", alignItems:"center", marginVertical: 10}}>
                                <Text style={{ flex: 0.33, alignSelf: "center", fontFamily: "Roboto", fontSize: 16, fontWeight: "bold", color: "#1885BE" }}>{item.itemname}</Text>
                                <Text style={{ flex: 0.33, alignSelf: "center", fontFamily: "Roboto", fontSize: 12, fontWeight: "bold" }}>Batch # {item.batchnumber}</Text>
                                <Text style={{ flex: 0.33, alignSelf: "center", fontFamily: "Roboto", fontSize: 12, fontWeight: "bold", }}>Quantity {item.item_unit_name} {item.quantity}</Text>
                            </View>
                            <View style={{flex: 0.4, flexDirection: "row", justifyContent: "space-between", flexWrap:"wrap"}}>
                                {
                                    ccLocations.map((location,locationIndex) => {
                                        return (
                                            <View key={locationIndex} style={{flexDirection: "row", justifyContent:"space-evenly", alignItems: "center"}}>
                                                <CheckBox selected={false} text={location.name}/>
                                                {/* <Text style={{ fontFamily: "Roboto", fontSize: 14 }} key={locationIndex}>{location.name}</Text> */}
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{flex: 0.2, alignItems: "flex-end", marginVertical: 10}}>
                                {/* <Icons name="keyboard-backspace" size={30} color="#1885BE"  /> */}
                                <CheckBox iconcolor="#707070" selected={true} />
                            </View>
                        </View>
                    )
                })
            }
            <View style={{flex: 1, flexDirection:"row", justifyContent: "center"}}>
                <TouchableOpacity >
                    <View style={{ paddingHorizontal: 25, marginVertical: 15, height: 50, backgroundColor: "#1885BE", borderRadius: 50, flexDirection: "row", justifyContent:"center", alignItems: "center" }}>
                        <Icons name="receipt" size={20} color="#FFF" />
                        <Text style={{marginLeft: 5, color: "#FFF", fontSize: 20, fontWeight: "bold"}}>Accept Voucher</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        :null}
        </>
    )
}

const styles = StyleSheet.create({
    voucherItemCardView: {
        flex: 1, 
        marginVertical: 5, 
        paddingLeft: 5,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: 'rgba(100,100,100, 0.9)',
        //marginTop: 22
    },
    modalView: {
        flex: 0.5,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Voucher
