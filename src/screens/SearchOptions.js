import React, { useReducer, useState } from 'react'
import { View, Text, TextInput,  StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native'
import SQLite from 'react-native-sqlite-storage';
import { SvgXml } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ICONS from '../constants/Icons';
import Header from '../components/Header'

const expandableSectionsInitialState = {cardno: 0, childname: 0, fathername: 0, mobileno: 0, cnic: 0, gender: 0, location: 0, dob: 0, duevaccine: 0}
const genderInitialState = {both: 1, male: 0, female: 0}
const duevaccineInitialState = {bcg: 0, opv0: 0, hepb: 0, opv1: 0, penta1: 0, pcv1: 0, rota1: 0, opv2: 0, penta2: 0, pcv2: 0, rota2: 0, opv3: 0, penta3: 0, pcv3: 0, measles1: 0, measles2: 0}
const queryParamsInitialState = {
    cardnovalue: '', 
    childnamevalue: '', 
    fathernamevalue: '',
    mobilenovalue: '',
    cnicvalue: '',
    dobFrom: new Date(),
    dobTo: new Date(),
    procode: '',
    distcode: '',
    tcode: '',
    uncode: '',
    facode: '',
    vcode: '',
}

const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

var provinces = [];
var districts = [];
var tehsils = [];
var ucs = [];
var facilities = [];
var villages = [];

let genderCondition = ""
let duevaccineCondition = ""

const BuildandRunQuery = (duevaccineState) => {
    duevaccineCondition = "";
    if(Object.entries(duevaccineState).sort().toString() === Object.entries(duevaccineInitialState).sort().toString()){}else{
        duevaccineCondition = " AND ("
        Object.keys(duevaccineState).map(function(vaccineName, index) {
            if(duevaccineState[vaccineName] == 1){
                duevaccineCondition += " "+ vaccineName + " = NULL OR " + vaccineName + " = '' "
                if(Object.keys(duevaccineState).length > index+1){
                    duevaccineCondition += 'OR '
                }
            }
        });
        duevaccineCondition += ")";
    }

    const concatedQuery = "select * from cerv_child_registration where procode = '3'" + duevaccineCondition + genderCondition;
    console.log("query",concatedQuery)

    db.transaction(selectChilds => {
        selectChilds.executeSql(
            concatedQuery, [], 
            (selectChilds, resultSelectChilds) =>{
                console.log("query executed successfully!",resultSelectChilds.rows)
            }
        )
    })
}

const fetchProvinces = async () => {
    return new Promise(resolve => {
        db.transaction(tx => {
            tx.executeSql("select provinces as label, CAST(procode as CHAR) as value from provinces order by procode", [], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const fetchDistrict = async (procode) => {
    return new Promise(resolve => {
        const provinceCode = procode;
        db.transaction(tx => {
            tx.executeSql(`select district as label, CAST(distcode as CHAR) as value from districts where procode = ? order by district;`, [ 
                provinceCode 
            ], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const fetchTehsil = async (distcode) => {
    return new Promise(resolve => {
        const districtCode = distcode;
        db.transaction(tx => {
            tx.executeSql(`select tehsil as label, CAST(tcode as CHAR) as value from tehsil where distcode = ? order by tehsil;`, [ 
                districtCode 
            ], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const fetchUcs = async (tcode) => {
    return new Promise(resolve => {
        const tehsilCode = tcode;
        db.transaction(tx => {
            tx.executeSql(`select un_name as label, CAST(uncode as CHAR) as value from unioncouncil where tcode = ? order by un_name;`, [ 
                tehsilCode 
            ], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const fetchFacilities = async (uncode) => {
    return new Promise(resolve => {
        const UCCode = uncode;
        db.transaction(tx => {
            tx.executeSql(`select fac_name as label, CAST(facode as CHAR) as value from facilities where uncode = ? order by fac_name;`, [ 
                UCCode 
            ], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const fetchVillages = async (facode) => {
    return new Promise(resolve => {
        const FacilityCode = facode;
        db.transaction(tx => {
            tx.executeSql(`select village as label, CAST(vcode as CHAR) as value from cerv_villages where facode = ? order by village;`, [ 
                FacilityCode 
            ], (tx, result) => {
                resolve(result);
            })
        });
    });
}

const executeProvinceQuery = async () => {
    let fetchedProvinces = await fetchProvinces();
    //console.log("pro",fetchedProvinces.rows)
    var len = fetchedProvinces.rows.length;
    for (let i = 0; i < len; i++) {
        provinces.push(fetchedProvinces.rows.item(i));
    }
    //console.log(provinces)
    //Object.keys(provinces).map((key,value) => provinces[value])
}

executeProvinceQuery()

const reducer = (state, action) => {

    switch(action.type){
        case 'cardno':
            return state.cardno === 1
            ? {...state, cardno: 0}
            : {...state, cardno: 1}
        case 'childname':
            return state.childname === 1
            ? {...state, childname: 0}
            : {...state, childname: 1}
        case 'fathername':
            return state.fathername === 1
            ? {...state, fathername: 0}
            : {...state, fathername: 1}
        case 'mobileno':
            return state.mobileno === 1
            ? {...state, mobileno: 0}
            : {...state, mobileno: 1}
        case 'cnic':
            return state.cnic === 1
            ? {...state, cnic: 0}
            : {...state, cnic: 1}
        case 'gender':
            return state.gender === 1
            ? {...state, gender: 0}
            : {...state, gender: 1}
        case 'location':
            return state.location === 1
            ? {...state, location: 0}
            : {...state, location: 1}
        case 'dob':
            return state.dob === 1
            ? {...state, dob: 0}
            : {...state, dob: 1}
        case 'duevaccine':
            return state.duevaccine === 1
            ? {...state, duevaccine: 0}
            : {...state, duevaccine: 1}
        default:
            return state
    }

}

const genderReducer = (state, action) => {
    switch(action.type){
        case 'both':
            genderCondition = ""
            return {...state, both: 1, male: 0, female: 0}
        case 'male':
            genderCondition = " AND gender = '1' "
            return {...state, male: 1, both: 0, female: 0}
        case 'female':
            genderCondition = " AND gender = '0'"
            return {...state, female: 1, both: 0, male: 0}
        default:
            return state
    }
}

const duevaccineReducer = (state, action) => {
    switch(action.type){
        case 'bcg':
            if(state.bcg == 1)
                return {...state, bcg: 0}
            return {...state, bcg: 1}
        case 'opv0':
            if(state.opv0 == 1)
                return {...state, opv0: 0}
            return {...state, opv0: 1}
        case 'hepb':
            if(state.hepb == 1)
                return {...state, hepb: 0}
            return {...state, hepb: 1}
        case 'opv1':
            if(state.opv1 == 1)
                return {...state, opv1: 0}
            return {...state, opv1: 1}
        case 'opv2':
            if(state.opv2 == 1)
                return {...state, opv2: 0}
            return {...state, opv2: 1}
        case 'opv3':
            if(state.opv3 == 1)
                return {...state, opv3: 0}
            return {...state, opv3: 1}
        case 'penta1':
            if(state.penta1 == 1)
                return {...state, penta1: 0}
            return {...state, penta1: 1}
        case 'penta2':
            if(state.penta2 == 1)
                return {...state, penta2: 0}
            return {...state, penta2: 1}
        case 'penta3':
            if(state.penta3 == 1)
                return {...state, penta3: 0}
            return {...state, penta3: 1}
        case 'pcv1':
            if(state.pcv1 == 1)
                return {...state, pcv1: 0}
            return {...state, pcv1: 1}
        case 'pcv2':
            if(state.pcv2 == 1)
                return {...state, pcv2: 0}
            return {...state, pcv2: 1}
        case 'pcv3':
            if(state.pcv3 == 1)
                return {...state, pcv3: 0}
            return {...state, pcv3: 1}
        case 'rota1':
            if(state.rota1 == 1)
                return {...state, rota1: 0}
            return {...state, rota1: 1}
        case 'rota2':
            if(state.rota2 == 1)
                return {...state, rota2: 0}
            return {...state, rota2: 1}
        case 'measles1':
            if(state.measles1 == 1)
                return {...state, measles1: 0}
            return {...state, measles1: 1}
        case 'measles2':
            if(state.measles2 == 1)
                return {...state, measles2: 0}
            return {...state, measles2: 1}
        default:
            return state
    }
}

const dropDownReducer = (state, action) => {
    switch(action.type){
        case 'procode':
            return {...state, procodeVisibility: action.payload, distcodeVisibility: false, tcodeVisibility: false, uncodeVisibility: false, facodeVisibility: false, vcodeVisibility: false}
        case 'distcode':
            return {...state, distcodeVisibility: action.payload, procodeVisibility: false, tcodeVisibility: false, uncodeVisibility: false, facodeVisibility: false, vcodeVisibility: false}
        case 'tcode':
            return {...state, tcodeVisibility: action.payload, procodeVisibility: false, distcodeVisibility: false, uncodeVisibility: false, facodeVisibility: false, vcodeVisibility: false}
        case 'uncode':
            return {...state, uncodeVisibility: action.payload, procodeVisibility: false, distcodeVisibility: false, tcodeVisibility: false, facodeVisibility: false, vcodeVisibility: false}
        case 'facode':
            return {...state, facodeVisibility: action.payload, procodeVisibility: false, distcodeVisibility: false, tcodeVisibility: false, uncodeVisibility: false, vcodeVisibility: false}
        case 'vcode': 
            return {...state, vcodeVisibility: action.payload, procodeVisibility: false, distcodeVisibility: false, tcodeVisibility: false, uncodeVisibility: false, facodeVisibility: false}
        default:
            return state
    }
}

const ExpandableSection = ( {queryParams,callback, onChangeQueryParams, mainstate, exptitle, exptype, firstxml, secondxml, maindispatch, sectionmainstate, expandedviewdispatch} ) => {
    return (
        <View style={ styles.componentsViewStyle }>
            <TouchableOpacity activeOpacity={1} style={styles.filtersComponent} onPress={() => maindispatch( { type:exptype } )} >
                <SvgXml 
                    style={styles.filtersComponentIcon} 
                    xml={firstxml} 
                    width="20" 
                    height="20"
                    key={Math.random()}
                />
                <Text style={styles.filtersComponentText}>{exptitle}</Text>
                <SvgXml 
                    style={styles.filtersComponentArrowDown} 
                    xml={ secondxml } 
                    width="20" 
                    height="20"
                    key={Math.random()}
                />                  
            </TouchableOpacity>
            <ExpandedView queryParams={queryParams} callback={callback} onChangeQueryParams={onChangeQueryParams} mainstate={mainstate} expviewtype={exptype} expandedstate={sectionmainstate} dispatcher={expandedviewdispatch}/>
        </View>
    )
}

const ExpandedView = ({queryParams, callback, onChangeQueryParams, mainstate, expviewtype, expandedstate, dispatcher}) => {

    const [dropDownState, dispatchDropDown] = useReducer(dropDownReducer, {procodeVisibility: false, distcodeVisibility: false, tcodeVisibility: false, uncodeVisibility: false, facodeVisibility: false, vcodeVisibility: false})
    const [dobFromShow, setDobFromShow] = useState(false);
    const [dobToShow, setDobToShow] = useState(false);

    const updateDistrictValue = async (procode) => {
        let fetchedDistricts = await fetchDistrict(procode);
        districts.push({value:'',label:'--Select District--'})
        //Object.keys(districts).map((key,value) => districts[value])
        const len = fetchedDistricts.rows.length;
        for (let i = 0; i < len; i++) {
            districts.push(fetchedDistricts.rows.item(i));
        }
        if(districts.length != 0)
            callback('distcode','')
        if(tehsils.length != 0){
            tehsils.length = 0
            tehsils.push({value:'',label:'--Select Tehsil--'})
            callback('tcode','')
        }
        if(ucs.length > 0){
            ucs.length = 0
            ucs.push({value:'',label:'--Select Unioncouncil--'})
            callback('uncode','')
        }
        
        if(facilities.length > 0){
            facilities.length = 0
            facilities.push({value:'',label:'--Select Facility--'})
            callback('facode','')
        }
        if(villages.length > 0){
            villages.length = 0
            villages.push({value:'',label:'--Select Village--'})
            callback('vcode','')
        }
    }

    const updateTehsilValue = async (distcode) => {
        let fetchedTehsils = await fetchTehsil(distcode);
        tehsils.push({value:'',label:'--Select Tehsil--'})
        //Object.keys(tehsils).map((key,value) => tehsils[value])
        const len = fetchedTehsils.rows.length;
        for (let i = 0; i < len; i++) {
            tehsils.push(fetchedTehsils.rows.item(i));
        }
        if(tehsils.length != 0)
        callback('tcode','')
        if(ucs.length > 0){
            ucs.length = 0
            ucs.push({value:'',label:'--Select Unioncouncil--'})
            callback('uncode','')
        }
        if(facilities.length > 0){
            facilities.length = 0
            facilities.push({value:'',label:'--Select Facility--'})
            callback('facode','')
        }
        if(villages.length > 0){
            villages.length = 0
            villages.push({value:'',label:'--Select Village--'})
            callback('vcode','')
        }
    }

    const updateUCValue = async (tcode) => {
        let fetchedUcs = await fetchUcs(tcode);
        ucs.push({value:'',label:'--Select Unioncouncil--'})
        //Object.keys(ucs).map((key,value) => ucs[value])
        const len = fetchedUcs.rows.length;
        for (let i = 0; i < len; i++) {
            ucs.push(fetchedUcs.rows.item(i));
        }
        if(ucs.length != 0)
        callback('uncode','')
        if(facilities.length > 0){
            facilities.length = 0
            facilities.push({value:'',label:'--Select Facility--'})
            callback('facode','')
        }
        if(villages.length > 0){
            villages.length = 0
            villages.push({value:'',label:'--Select Village--'})
            callback('vcode','')
        }
    }

    const updateFacilityValue = async (uncode) => {
        let fetchedFacilities = await fetchFacilities(uncode);
        facilities.push({value:'',label:'--Select Facility--'})
        //Object.keys(facilities).map((key,value) => facilities[value])
        const len = fetchedFacilities.rows.length;
        for (let i = 0; i < len; i++) {
            facilities.push(fetchedFacilities.rows.item(i));
        }
        if(facilities.length != 0)
            callback('facode','')
        if(villages.length > 0){
            villages.length = 0
            villages.push({value:'',label:'--Select Village--'})
            callback('vcode','')
        }
    }

    const updateVillageValue = async (facode) => {
        fetchedVillages = await fetchVillages(facode);
        villages.push({value:'',label:'--Select Village--'})
        //Object.keys(villages).map((key,value) => villages[value])
        const len = fetchedVillages.rows.length;
        for (let i = 0; i < len; i++) {
            villages.push(fetchedVillages.rows.item(i));
        }
        if(villages.length != 0)
        callback('vcode','')
    }

    const onChangeDobFrom = (event, selectedDate) => {
        const currentDate = selectedDate || queryParams.dobFrom;
        setDobFromShow(Platform.OS === 'ios');
        console.log(currentDate)
        callback('dobfrom', currentDate)
    };
    
    const onChangeDobTo = (event, selectedDate) => {
        const currentDate = selectedDate || queryParams.dobTo;
        setDobToShow(Platform.OS === 'ios');
        console.log(currentDate)
        callback('dobto', currentDate)
    };

    switch(expviewtype){
        case 'cardno':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.cardno === 1
                        ? <TextInput 
                            style={styles.textInputStyle}
                            keyboardType= "phone-pad"
                            autoFocus={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={queryParams.cardnovalue}
                            maxLength={5}
                            placeholder="-----"
                            onChangeText={(newValue) => callback('cardno', newValue)}
                            placeholderTextColor='rgb(0, 0, 0)'
                        />
                        : null
                    }
                </View>
            )
        case 'childname':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.childname === 1
                        ? <TextInput 
                            style={styles.textInputStyle}
                            keyboardType= "name-phone-pad"
                            autoFocus={true}
                            textContentType="name"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={queryParams.childnamevalue}
                            onChangeText={(newValue) => callback('childname', newValue)}
                        />
                        :null
                    }
                </View>
            )
        case 'fathername':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.fathername === 1
                        ? <TextInput 
                            style={styles.textInputStyle}
                            keyboardType= "name-phone-pad"
                            autoFocus={true}
                            textContentType="name"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={queryParams.fathernamevalue}
                            onChangeText={(newValue) => callback('fathername', newValue)}
                        />
                        :null
                    }
                </View>
            )
        case 'mobileno':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.mobileno === 1
                        ? <TextInput 
                            style={styles.textInputStyle}
                            keyboardType= "phone-pad"
                            autoFocus={true}
                            textContentType="telephoneNumber"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={11}
                            value={queryParams.mobilenovalue}
                            placeholder="-----------"
                            onChangeText={(newValue) => callback('mobileno', newValue)}
                            placeholderTextColor='rgb(0, 0, 0)'
                        />
                        :null
                    }
                </View>
            )
        case 'cnic':
            return (
                <View>
                    <View style={ styles.expandedView }>
                    {
                        mainstate.cnic === 1
                        ? <TextInput 
                            style={styles.textInputStyle}
                            keyboardType= "phone-pad"
                            autoFocus={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={queryParams.cnicvalue}
                            maxLength={15}
                            placeholder="xxxxx-xxxxxxx-x"
                            //onKeyPress={(e) => cnicCheck(e)}
                            onChangeText={(newValue) => callback('cnic', newValue)}
                            placeholderTextColor='rgb(0, 0, 0)'
                        />
                        :null
                    }
                    </View>
                </View>
            )
        case 'gender':
            return (
                <View>
                    {
                        mainstate.gender === 1
                        ?   <View style={ styles.expandedView }>
                                <TouchableOpacity activeOpacity={1} style={styles.genderRadios} onPress={() => dispatcher( {type:'both'} )}>
                                    <SvgXml 
                                        xml={ expandedstate.both == 1 ? ICONS.CHECKED_ICON : ICONS.UNCHECKED_ICON } 
                                        width="20" 
                                        height="20"
                                        key={Math.random()}
                                    /> 
                                    <Text style={styles.expandedViewText}>Both</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={styles.genderRadios} onPress={() => dispatcher( {type:'male'} )}>
                                    <SvgXml 
                                        xml={ expandedstate.male == 1 ? ICONS.CHECKED_ICON : ICONS.UNCHECKED_ICON } 
                                        width="20" 
                                        height="20"
                                        key={Math.random()}
                                    /> 
                                    <Text style={styles.expandedViewText}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={styles.genderRadios} onPress={() => dispatcher( {type:'female'} )}>
                                    <SvgXml 
                                        xml={ expandedstate.female == 1 ? ICONS.CHECKED_ICON : ICONS.UNCHECKED_ICON } 
                                        width="20" 
                                        height="20"
                                        key={Math.random()}
                                    /> 
                                    <Text style={styles.expandedViewText}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        : null
                    }
                </View>
            )
        case 'location':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.location === 1
                        ? <View style={{
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                            }),
                        }}>
                        <DropDownPicker
                            items={provinces}
                            searchablePlaceholder="Enter province name here..."
                            placeholder="--Select Province--"
                            defaultValue={queryParams.procode}
                            value={queryParams.procode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={false}
                            isVisible={dropDownState.procodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'procode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'procode', payload: false})}
                            onChangeItem={item => {
                                callback('procode', item.value)
                                updateDistrictValue(item.value)
                            }
                            }
                            zIndex={7000}
                        />
                        <DropDownPicker
                            items={districts}
                            searchablePlaceholder="Enter district name here..."
                            placeholder="--Select District--"
                            defaultValue={queryParams.distcode}
                            value={queryParams.distcode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={true}
                            isVisible={dropDownState.distcodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'distcode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'distcode', payload: false})}
                            onChangeItem={item => {
                                callback('distcode', item.value)
                                updateTehsilValue(item.value)
                            }}
                            zIndex={6000}
                        />
                        <DropDownPicker
                            items={tehsils}
                            searchablePlaceholder="Enter tehsil name here..."
                            placeholder="--Select Tehsil--"
                            defaultValue={queryParams.tcode}
                            value={queryParams.tcode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={true}
                            isVisible={dropDownState.tcodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'tcode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'tcode', payload: false})}
                            onChangeItem={item => {
                                callback('tcode', item.value)
                                updateUCValue(item.value)
                            }}
                            zIndex={5000}
                        />
                        <DropDownPicker
                            items={ucs}
                            searchablePlaceholder="Enter unioncouncil name here..."
                            placeholder="--Select Unioncouncil--"
                            defaultValue={queryParams.uncode}
                            value={queryParams.uncode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={true}
                            isVisible={dropDownState.uncodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'uncode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'uncode', payload: false})}
                            onChangeItem={item => {
                                callback('uncode', item.value)
                                updateFacilityValue(item.value)
                            }}
                            zIndex={4000}
                        />
                        <DropDownPicker
                            items={facilities}
                            searchablePlaceholder="Enter facility name here..."
                            placeholder="--Select Facility--"
                            defaultValue={queryParams.facode}
                            value={queryParams.facode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={true}
                            isVisible={dropDownState.facodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'facode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'facode', payload: false})}
                            onChangeItem={item => {
                                callback('facode', item.value)
                                updateVillageValue(item.value)
                            }}
                            zIndex={3000}
                        />
                        <DropDownPicker
                            items={villages}
                            searchablePlaceholder="Enter Village name here..."
                            placeholder="--Select Village--"
                            defaultValue={queryParams.vcode}
                            value={queryParams.vcode}
                            style={ styles.spinnerStyle }
                            itemStyle={styles.spinnerItemStyle}
                            containerStyle={styles.spinnerContainerStyle}
                            dropDownStyle={styles.spinnerDropDownStyle}
                            placeholderStyle = {styles.spinnerPlaceholderStyle}
                            dropDownMaxHeight={250}
                            searchable={true}
                            isVisible={dropDownState.vcodeVisibility}
                            onOpen={() => dispatchDropDown({type: 'vcode', payload: true})}
                            onClose={() => dispatchDropDown({type: 'vcode', payload: false})}
                            onChangeItem={item => callback('vcode', item.value)}
                            zIndex={2000}
                        />
                        </View>
                        : null
                    }
                </View>
            )
        case 'dob':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.dob === 1
                        ? <View style={styles.dateSection}> 
                            <TextInput 
                                style={styles.dateInputStyle}
                                keyboardType= "phone-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={10}
                                placeholder="Date From"
                                placeholderTextColor='rgb(0, 0, 0)'
                                showSoftInputOnFocus={false}
                                onFocus={() => setDobFromShow(true)}
                                value={`${queryParams.dobFrom.getFullYear()+'-' + ("0" + (queryParams.dobFrom.getMonth()+1 ) ).slice(-2) + '-'+ ("0" + queryParams.dobFrom.getDate()).slice(-2)}`}
                            />
                            <TextInput 
                                style={styles.dateInputStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={10}
                                placeholder="Date To"
                                placeholderTextColor='rgb(0, 0, 0)'
                                showSoftInputOnFocus={false}
                                onFocus={() => setDobToShow(true)}
                                value={`${queryParams.dobTo.getFullYear()+'-' + ("0" + (queryParams.dobTo.getMonth()+1 ) ).slice(-2) + '-'+ ("0" + queryParams.dobTo.getDate()).slice(-2)}`}
                                
                            />
                            {dobFromShow && (
                                <DateTimePicker
                                    testID="dateTimePickerFrom"
                                    value={queryParams.dobFrom}
                                    mode="date"
                                    dateFormat="year month day"
                                    maximumDate={new Date()}
                                    minimumDate={new Date().setFullYear(new Date().getFullYear() - 4)}
                                    is24Hour={true}
                                    //display="default"
                                    onChange={onChangeDobFrom}
                                />
                            )}
                            {dobToShow && (
                                <DateTimePicker
                                    testID="dateTimePickerTo"
                                    value={queryParams.dobTo}
                                    mode="date"
                                    is24Hour={true}
                                    maximumDate={new Date()}
                                    minimumDate={new Date().setFullYear(new Date().getFullYear() - 4)}
                                    //display="default"
                                    onChange={onChangeDobTo}
                                />
                            )}
                        </View>
                        : null
                    }
                </View>
            )
        case 'duevaccine':
            return (
                <View style={ styles.expandedView }>
                    {
                        mainstate.duevaccine === 1
                        ? <>
                        <View style={styles.duevaccineOuterView}>    
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'bcg'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.bcg == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>BCG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'opv0'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.opv0 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>OPV-0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'hepb'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.hepb == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>HEP-B</Text>
                            </TouchableOpacity>
                            <View style={styles.duevaccineInnerview}></View>
                        </View>
                        <View style={styles.duevaccineOuterView}>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'opv1'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.opv1 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>OPV-I</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'penta1'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.penta1 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PENTA-I</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'pcv1'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.pcv1 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PCV10-I</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'rota1'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.rota1 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>ROTA-I</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.duevaccineOuterView}>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'opv2'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.opv2 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>OPV-II</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'penta2'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.penta2 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PENTA-II</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'pcv2'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.pcv2 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PCV10-II</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'rota2'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.rota2 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>ROTA-II</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.duevaccineOuterView}>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'opv3'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.opv3 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>OPV-III</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'penta3'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.penta3 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PENTA-III</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'pcv3'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.pcv3 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>PCV10-III</Text>
                            </TouchableOpacity>
                            <View style={styles.duevaccineInnerview}></View>
                        </View>
                        <View style={styles.duevaccineOuterView}>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'measles1'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.measles1 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>MEASLES-I</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => dispatcher( {type:'measles2'} )} style={styles.duevaccineInnerview}>
                                <SvgXml
                                    style={styles.duevaccinecheckbox} 
                                    xml={expandedstate.measles2 == 1 ? ICONS.CHECKED_CHECKBOX : ICONS.UNCHECKED_CHECKBOX} 
                                    width="20" 
                                    height="20"
                                    key={Math.random()}
                                >
                                </SvgXml>
                                <Text style={styles.duevaccineInnerText}>MEASLES-II</Text>
                            </TouchableOpacity>
                            <View style={styles.duevaccineInnerview}></View>
                            <View style={styles.duevaccineInnerview}></View>
                        </View>
                        </>
                        : null
                    }
                </View>
            )
        default:
            return (
                <View style={ styles.expandedView }>
                </View>
            )
    }
}

const SearchOptions = (props) => {
    
    const [state, dispatch] = useReducer(reducer, expandableSectionsInitialState);
    const [stateGender, dispatchGender] = useReducer(genderReducer, genderInitialState);
    const [stateDueVaccine, dispatchDueVaccine] = useReducer(duevaccineReducer, duevaccineInitialState);

    const [queryParams, setQueryParams] = useState(queryParamsInitialState)

    const onQueryParamChange = (newValue, objectname) => {
        switch(objectname){
            case "cardno":
                setQueryParams(prevState => ({
                    ...prevState,
                    cardnovalue: newValue
                 }));
                 break;
            case "childname":
                setQueryParams(prevState => ({
                    ...prevState,
                    childnamevalue: newValue
                 }));
                 break;
            case "fathername":
                setQueryParams(prevState => ({
                    ...prevState,
                    fathernamevalue: newValue
                 }));
                 break;
            case "mobileno":
                setQueryParams(prevState => ({
                    ...prevState,
                    mobilenovalue: newValue
                 }));
                 break;
            case "cnic":
                setQueryParams(prevState => ({
                    ...prevState,
                    cnicvalue: newValue
                 }));
                 break;
            case "dobfrom":
                setQueryParams(prevState => ({
                    ...prevState,
                    dobFrom: newValue
                 }));
                 break;
            case "dobto":
                setQueryParams(prevState => ({
                    ...prevState,
                    dobTo: newValue
                 }));
                 break;
            case "procode":
                setQueryParams(prevState => ({
                    ...prevState,
                    procode: newValue
                 }));
                 break;
            case "distcode":
                setQueryParams(prevState => ({
                    ...prevState,
                    distcode: newValue
                 }));
                 break;
            case "tcode":
                setQueryParams(prevState => ({
                    ...prevState,
                    tcode: newValue
                 }));
                 break;
            case "uncode":
                setQueryParams(prevState => ({
                    ...prevState,
                    uncode: newValue
                 }));
                 break;
            case "facode":
                setQueryParams(prevState => ({
                    ...prevState,
                    facode: newValue
                 }));
                 break;
            case "vcode":
                setQueryParams(prevState => ({
                    ...prevState,
                    vcode: newValue
                 }));
                 break;
            default:
                setQueryParams({...queryParams})
        }
        
    }

    const cardnoArrow = state.cardno === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const childnameArrow = state.childname === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const fathernameArrow = state.fathername === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const mobilenoArrow = state.mobileno === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const cnicArrow = state.cnic === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const genderArrow = state.gender === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const locationArrow = state.location === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const dobArrow = state.dob === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;
    const duevaccineArrow = state.duevaccine === 0 ? ICONS.ARROWDOWN_ICON : ICONS.UPARROW_ICON ;

    return (
        <View style={{
            backgroundColor: '#ecf0f1',
            height: '100%'
        }}>
            <StatusBar backgroundColor="#B2B3B4" />
            <Header props={props.navigation} />
            <ScrollView style={{height:'100%'}}>
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Card Number" exptype="cardno" firstxml={ICONS.CARDNO_ICON} secondxml={cardnoArrow} maindispatch={dispatch}/>
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Child Name" exptype="childname" firstxml={ICONS.CHILDNAME_ICON} secondxml={childnameArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Father Name" exptype="fathername" firstxml={ICONS.FATHERNAME_ICON} secondxml={fathernameArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Contact Number" exptype="mobileno" firstxml={ICONS.MOBILENO_ICON} secondxml={mobilenoArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="CNIC" exptype="cnic" firstxml={ICONS.CNIC_ICON} secondxml={cnicArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Gender" exptype="gender" firstxml={ICONS.GENDER_ICON} secondxml={genderArrow} maindispatch={dispatch} sectionmainstate={stateGender} expandedviewdispatch={dispatchGender} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Location" exptype="location" firstxml={ICONS.LOCATION_ICON} secondxml={locationArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Birth Date" exptype="dob" firstxml={ICONS.CALENDER_ICON} secondxml={dobArrow} maindispatch={dispatch} />
                <ExpandableSection callback={(type, value)=> {
                    onQueryParamChange(value, type);
                }} queryParams={queryParams} mainstate={state} exptitle="Due Vaccine" exptype="duevaccine" firstxml={ICONS.TEKU_ICON} secondxml={duevaccineArrow} maindispatch={dispatch} sectionmainstate={stateDueVaccine} expandedviewdispatch={dispatchDueVaccine} />
                <View style={styles.filtersbtnview}>
                    <TouchableOpacity 
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        onPress={() => {
                            console.log('asdf');
                            setQueryParams({...queryParamsInitialState})                            
                        }}
                        activeOpacity={0.4}
                    >
                        <SvgXml
                            style={styles.resetbtn} 
                            xml={ICONS.RESET_BTN}
                            key={Math.random()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        onPress={() => {
                            /* console.log(queryParams);
                            console.log(stateGender);
                            console.log(stateDueVaccine); */
                            //props.navigation.navigate('ChildSearchedList')
                            BuildandRunQuery(stateDueVaccine)
                        }}
                        activeOpacity={0.4}
                    >
                        <SvgXml
                            style={styles.applybtn}
                            xml={ICONS.APPLY_BTN}
                            key={Math.random()}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    componentsViewStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    filtersComponent: {
        height: 50,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    filtersComponentIcon: {
        flex: 1,
        left: 25,
        top: 10,
        fontWeight: "bold"
    },
    filtersComponentText: {
        flex: 1,
        left: 30,
        top: 10,
        fontWeight: "bold",
        fontSize: 14
    },
    filtersComponentArrowDown: {
        flex: 2,
        right: 25,
        top: 10,
    },
    expandedView: {
        height: 'auto',
        left: 45,
    },
    expandedViewText: {
        marginLeft: 3,
    },
    genderRadios: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 4
    },
    textInputStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        height: 40,
        width: '80%',
        borderRadius: 3,
        paddingLeft: 10,
        fontSize: 18,
        marginBottom: 10
    },
    dateSection: {
        flexDirection: "row",
        justifyContent: "space-around",
        right: 40
    },
    dateInputStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        height: 40,
        width: '40%',
        borderRadius: 3,
        paddingLeft: 10,
        fontSize: 14,
        marginBottom: 10
    },
    spinnerContainerStyle:{
       /*  height: 40,
        width: '80%',
        marginBottom: 3 */
        margin: 3,
        width:'80%',
        height: 40,
        flex: 2,
        position:"relative",       
    },
    spinnerItemStyle:{
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderRadius: 7,
        marginBottom: 2
    },
    spinnerStyle:{
        //backgroundColor:'red'
    },
    spinnerDropDownStyle: {
        backgroundColor:'#e6e2e2',
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        height: 'auto',        
    },
    spinnerPlaceholderStyle:{
        fontWeight: "bold"
    },
    filtersbtnview:{
        flexDirection:"row",
        justifyContent: "center",
        marginVertical: 20,
    },
    applybtn:{
        marginHorizontal:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1.25,
        shadowRadius: 5.84,
        elevation: 9,
        borderRadius:20
    },
    resetbtn:{
        marginHorizontal:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1.25,
        shadowRadius: 5.84,
        elevation: 9,
        borderRadius:20
    },
    duevaccineOuterView:{
        flex:4,
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    duevaccineInnerview:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection:"row",
        paddingBottom: 10,
        right: 18

    },
    duevaccineInnerText:{
        left: 5
    },
    duevaccinecheckbox:{
        //left: 20
    },    
});

export default SearchOptions