import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Feather';
import { SvgXml } from 'react-native-svg';
import Close from '../../assets/images/round-cross.svg';
import BabyGirl from '../../assets/images/baby-girl.svg';
import BabyBoy from '../../assets/images/baby-boy.svg';
import WhatsappIcon from '../../assets/images/whatsapp.svg';
import MessageIcon from '../../assets/images/message.svg';
import PhoneIcon from '../../assets/images/phone.svg';
import FlatListEmptyComponent from '../components/FlatListEmptyComponent';
import PLATFORM_IOS from '../constants';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

const SearchTags = ({ tagtitle }) => {
    return (
        <View style={styles.searchTagStyle}>
            <Text style={{ color: "#FFF" }}>{tagtitle}</Text>
            <View>
                <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} style={styles.tagCrossStyle}>
                    <SvgXml xml={Close} width="20" height="20" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ChildCard = React.memo(({babyicon, barcolor, childname, dob, fathername, duevaccines, gender, cardno}) => {
    return (
        <View style={styles.cardOuterViewStyle}>
            <View style={{ flex: 1, backgroundColor: `${barcolor}` }}></View>
            <View style={{ flex: 80 }}>
                <View style={{ backgroundColor: "#FFF", flex: 0.6, flexDirection: "row" }}>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <SvgXml
                            xml={babyicon}
                            width="50%"
                            height="50%"
                        />
                    </View>
                    <View style={{ flex: 0.8, alignItems: "flex-start", justifyContent: "center" }}>
                        <View>
                            <Text style={{ fontWeight: "bold" }}>{childname} {gender=='m'?'S/O':'D/O'} {fathername}</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between' }}>
                            <View>
                                <Text>
                                    <Text style={{fontWeight:"bold"}}>DOB: </Text>{dob}
                                </Text>
                                <Text>
                                    <Text style={{fontWeight:"bold"}}>Card No: </Text>{cardno}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row",  alignItems: 'flex-end' }}>
                                <SvgXml width="30" height="30" style={{ marginEnd: 10 }} xml={WhatsappIcon} />
                                <SvgXml width="27" height="27" style={{ marginEnd: 10 }} xml={MessageIcon} />
                                <SvgXml width="30" height="30" xml={PhoneIcon} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#ECECEC", flex: 0.4, justifyContent:"center", alignItems:"center" }}>
                    <Text style={{color: "#D84040", fontWeight:"bold"}}>{duevaccines != ''?duevaccines:'Nothing Pending'}</Text>
                </View>
            </View>
        </View>
    )
})

const ChildSearchedList = ( {navigation, route} ) => {

    const [showSearchedTags, setShowSearchedTags] = useState(true);
    const [searchedChildList, setSearchedChildList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchChildData = async () => {
            db.transaction(selectChilds => {
                selectChilds.executeSql(
                    "select recno, cardno, nameofchild, gender, dateofbirth, fathername, CASE WHEN bcg IS NULL then 'BCG' ELSE '' END || CASE WHEN opv0 IS NULL THEN 'OPV-0' ELSE '' END as duevaccines, issynced from cerv_child_registration where uncode = ? order by recno desc LIMIT ? OFFSET ?", ['365002001',25,offset], 
                    (selectChilds, result) => {
                        const moreData = []
                        var len = result.rows.length;
                        for (let i = 0; i < len; i++) {
                            moreData.push(result.rows.item(i));
                        }
                        setSearchedChildList([...searchedChildList, ...moreData])
                        setIsLoading(false);
                    }
                )
            })
        }
        fetchChildData()
        return () => {
        }
    }, [offset])

    const handleLoadMore = async () => {
        setIsLoading(true);
        setOffset(prevState => prevState + 25)
        console.log("Load More...")
    }

    const tagsList = [
        /* {id: "1", tagname: "Name: Muhammad Ali1"},
        {id: "2", tagname: "Name: Muhammad Ali2"},
        {id: "3", tagname: "Name: Muhammad Ali3"},
        {id: "4", tagname: "Name: Muhammad Ali4"},
        {id: "5", tagname: "Name: Muhammad Ali5"},
        {id: "6", tagname: "Name: Muhammad Ali3"},
        {id: "7", tagname: "Name: Muhammad Ali4"},
        {id: "8", tagname: "Name: Muhammad Ali5"},
        {id: "9", tagname: "Name: Muhammad Ali3"},
        {id: "10", tagname: "Name: Muhammad Ali4"},
        {id: "11", tagname: "Name: Muhammad Ali5"},
        {id: "12", tagname: "Name: Muhammad Ali3"},
        {id: "13", tagname: "Name: Muhammad Ali4"},
        {id: "14", tagname: "Name: Muhammad Ali5"}, */
    ]

    return (
        <>
            {
                showSearchedTags ? <View style={{ maxHeight: 185 }}>
                <ScrollView>
                    <View style={styles.searchTagsMainScrollArea}>
                        <View style={styles.searchTagStyle1}>
                            <Text style={{ color: "#FFF" }}>Clear All</Text>
                            <View>
                                <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} style={styles.tagCrossStyle}>
                                    <SvgXml xml={Close} width="20" height="20" />
                                </TouchableOpacity>
                            </View>
                        </View> 
                        { 
                            tagsList.map((item,index) => {
                                return <SearchTags key={`${index}`} tagtitle={item.tagname} />        
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            :null
            }
            {
                searchedChildList.length > 0 ? <SafeAreaView>
                <FlatList
                    keyExtractor={searchedChildList => searchedChildList.recno.toString()}
                    data={searchedChildList}
                    renderItem={ ({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Child Detail',{"recno":item.recno})}>
                                <ChildCard cardno={item.cardno} gender={item.gender} key={`${item.recno}`} babyicon={item.gender=='m'?BabyBoy:BabyGirl} barcolor={item.issynced==1?'#3FC84D':'#D84040'} childname={item.nameofchild} dob={item.dateofbirth} fathername={item.fathername} duevaccines={item.duevaccines}/>
                            </TouchableOpacity>
                        )
                    }}
                    //initialNumToRender={6}
                    onEndReached={() => {
                       // console.log()
                        handleLoadMore()
                    }}
                    onEndReachedThreshold={10}
                    //scrollEventThrottle={10}
                    ListEmptyComponent={<FlatListEmptyComponent text={'in Child Listing.'} loading={isLoading} />}
                    onMomentumScrollEnd={({ nativeEvent }) => {
                        if (PLATFORM_IOS && isCloseToBottom(nativeEvent)) {
                            handleLoadMore()
                        }
                    }}
                    ListFooterComponent={
                        isLoading && <View style={{
                            /* position:"absolute",
                            justifyContent:"center",
                            alignSelf:"center",
                            alignItems:"center",
                            backgroundColor:"#000",
                            opacity:0.7,
                            width:'100%',
                            height:"100%" */
                        }}><Icon name="loader" size={100} color="#FFF" /><Text style={{
                            fontWeight:"bold",
                            color:"#FFF"
                        }}>Loading....</Text></View>
                    }
                    //refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this._handleRefresh} />}
                    //contentContainerStyle={{ flexGrow: 1, paddingBottom: 11 }}
                    //onMomentumScrollBegin={() => { console.log("dont know"); }}
                    /* <Text style={{fontWeight:"bold", alignSelf:"center", color:"#D84040"}}>No Record Found!</Text> */
                />
                </SafeAreaView>:null
            }
            {
                /* isLoading && <View style={{
                    position:"absolute",
                    justifyContent:"center",
                    alignSelf:"center",
                    alignItems:"center",
                    backgroundColor:"#000",
                    opacity:0.7,
                    width:'100%',
                    height:"100%"
                }}><Icon name="loader" size={100} color="#FFF" /><Text style={{
                    fontWeight:"bold",
                    color:"#FFF"
                }}>Loading....</Text></View> */
            }
        </>
    )
}

const styles = StyleSheet.create({
    searchTagsMainScrollArea: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    searchTagStyle: {
        flexDirection: "row",
        backgroundColor: "#1885BE",
        alignSelf: 'flex-start',
        alignItems: "center",
        height: 35,
        borderRadius: 3,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 3,
        fontSize: 14
    },
    searchTagStyle1: {
        flexDirection: "row",
        backgroundColor: "#D84040",
        alignSelf: 'flex-start',
        alignItems: "center",
        height: 35,
        borderRadius: 3,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 3,
        fontSize: 14
    },
    tagCrossStyle: {
        paddingLeft: 5,
    },
    cardOuterViewStyle: {
        flexDirection: "row",
        marginHorizontal: 5,
        marginVertical: 10,
        flex: 1,
        minHeight: 120,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 5.84,
        elevation: 9,
        borderRadius: 10
    }
})

export default ChildSearchedList