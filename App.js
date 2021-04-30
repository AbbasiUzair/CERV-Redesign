import React, { createContext, useMemo, useEffect, useReducer, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert, StyleSheet, LogBox, TextInput, TouchableOpacity, Text, View, Linking, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginBanner from './assets/images/login-banner.svg'
import PaceLogo from './assets/images/pace-logo.svg'
import UsernameIcon from './assets/images/username-icon.svg'
import PasswordIcon from './assets/images/password-icon.svg'
import LogoutIcon from './assets/images/logout-icon.svg'
import { SvgXml } from 'react-native-svg';
import SearchIcon from './assets/images/search-icon.svg'
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios'
import querystring from 'querystring';
import Toast from 'react-native-simple-toast'
import SplashScreen from 'react-native-splash-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { unzip } from 'react-native-zip-archive'
import { JsonFileReader } from './NativeModules';
import RNFetchBlob from 'rn-fetch-blob'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ChildSearchedList from './src/screens/ChildSearchedList';
import SearchOptions from './src/screens/SearchOptions';
import ChildDetail from './src/screens/ChildDetail';
import Profile_Default_Pic from './assets/images/drawer-profile-default-pic.svg'
import Location_Icon from './assets/images/location.svg'
import Logout_Icon from './assets/images/logout.svg'
import Checkout_Icon from './assets/images/checkout.svg'
import Sync_Icon from './assets/images/syncing.svg'
import Setting_Icon from './assets/images/setting.svg'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Ripple from 'react-native-material-ripple';
import Child_Icon from './assets/images/home-baby-inactive.svg'
import Women_Icon from './assets/images/home-women-inactive.svg'
import Child_White_Icon from './assets/images/baby-white.svg'
import Setting_White_Icon from './assets/images/setting-white.svg'
import Mother_White_Icon from './assets/images/mother-white.svg'
import Sync_White_Icon from './assets/images/sync-white.svg'
import Menu_Child_Icon from './assets/images/menu-child-icon.svg'
import Menu_Women_Icon from './assets/images/menu-women-icon.svg'
import Menu_OU_Icon from './assets/images/menu-ou-icon.svg'
import HOME_CHILD_INACTIVE from './assets/images/home-baby-inactive.svg'
import HOME_WOMEN_INACTIVE from './assets/images/home-women-inactive.svg'
import HOME_CHILD_ACTIVE from './assets/images/home-baby-active.svg'
import HOME_WOMEN_ACTIVE from './assets/images/home-women-active.svg'
import HOME_CALENDER_ACTIVE from './assets/images/home-calender-active.svg'
import HOME_CALENDER_INACTIVE from './assets/images/home-calender-inactive.svg'
import HOME_INV_ACTIVE from './assets/images/ilr-stock-active.svg';
import HOME_INV_INACTIVE from './assets/images/ilr-stock_inactive.svg';
import DefaulterChilds from './src/screens/DefaulterChilds';
import DefaulterWomen from './src/screens/DefaulterWomen';
import TodaysDue from './src/screens/TodaysDue';
import Inventory from './src/screens/Inventory';
import Voucher from './src/screens/Voucher';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as colors from './assets/styles/colors'
import BackgroundFetch from "react-native-background-fetch";
//import BackgroundTask from 'react-native-background-task'
 
/* BackgroundTask.define( async () => {
    await axios.get('http://epibeta.pacemis.com/API/cerv_api/coldchain/info?token=1&curr_wh_type=6&curr_wh_code=351035').then(async (result) => {
        const text = await result.data.userdata[0].asset_type_name;
        // Data persisted to AsyncStorage can later be accessed by the foreground app
        await AsyncStorage.setItem('@MyApp:key1', text)
        //console.log(result.data.userdata[0].asset_id)
    })  
    BackgroundTask.finish()
}) */

LogBox.ignoreLogs(['VirtualizedList']);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const InventoryScreensStack = createStackNavigator();

/* Down Sync Province Child Data */
let dirs = RNFetchBlob.fs.dirs

const DownSyncChildData = () => {
    //const [progress,setProgressBar] = useState(0);
    Toast.show("Your file is being downloaded in background!");
    RNFetchBlob
    .config({
        fileCache : true,
        //appendExt: "zip",
        path : dirs.DocumentDir + '/downloadChildrenDataFromServer.zip',
        // android only options, these options be a no-op on IOS
        addAndroidDownloads : {
            // Show notification when response data transmitted
            notification : true,
            // Title of download notification
            title : 'Your file is beign downloaded !',
            // File description (not notification description)
            description : 'A Zip file.',
            mime : 'zip',
            // Make the file scannable  by media scanner
            mediaScannable : true,
        }
    })
    .fetch('GET', 'http://epimis.cres.pk/webapis/cerv/downloadChildrenDataFromServer.zip', {
        //some headers ..
        'Content-Type' : 'octet-stream'
    })
    // listen to download progress event
    .progress((received, total) => {
        console.log('progress', received / total * 100)
        Toast.show("Downloaded " + Math.round(received / total * 100).toString() + "%")
    })
    .then((res) => {
        console.log('The file saved to ', res.path())
        const charset = 'UTF-8'
        Toast.show('File Downloaded Successfully!', Toast.LONG, Toast.CENTER);
        Toast.show('UnZipping File!', Toast.LONG, Toast.CENTER);
        unzip(res.path(), dirs.DocumentDir+'/Download/', charset)
        .then(async (path) => {
            console.log(`unzip completed at ${path}`)
            const childDataFile = path+'/downloadChildrenDataFromServer.json';
            console.log("Extracted File Path",dirs.DocumentDir+'/Download/');
            JsonFileReader.jsonFileToSqlite((err, msg) => console.log(msg) )
        })
        .catch((error) => {
            console.error(error)
        })
    }).catch((error) => {
        console.log('Error is ', error)
    })
}

export const AuthContext = createContext();

/* Down Sync Organizational Units */
const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

const createChildRegistrationTable = async () => {
    db.transaction(createCervChildTable => {
        createCervChildTable.executeSql(
            `CREATE TABLE IF NOT EXISTS "cerv_child_registration" ( 
                "SerialNumber" INTEGER,
                "child_registration_no" TEXT NOT NULL,
                "procode" NUMERIC NOT NULL,
                "distcode" NUMERIC NOT NULL,
                "tcode" NUMERIC NOT NULL,
                "uncode" NUMERIC NOT NULL,
                "reg_facode" NUMERIC NOT NULL,
                "facility" TEXT,
                "vaccinator_code" NUMERIC NOT NULL,
                "cardno" NUMERIC NOT NULL,
                "imei" NUMERIC,
                "nameofchild" TEXT NOT NULL,
                "gender" CHARACTER(1) NOT NULL,
                "dateofbirth" TEXT NOT NULL,
                "issynced" TEXT,
                "fathername" VARCHAR(50),
                "fathercnic" VARCHAR(15),
                "contactno" VARCHAR(20),
                "latitude" VARCHAR(30),
                "longitude" VARCHAR(30),
                "Picture" TEXT,
                "bcg" TEXT,
                "hepb" TEXT,
                "opv0" TEXT,
                "opv1" TEXT,
                "opv2" TEXT,
                "opv3" TEXT,
                "penta1" TEXT,
                "penta2" TEXT,
                "penta3" TEXT,
                "pcv1" TEXT,
                "pcv2" TEXT,
                "pcv3" TEXT,
                "ipv" TEXT,
                "rota1" TEXT,
                "rota2" TEXT,
                "measles1" TEXT,
                "measles2" TEXT,
                "submitteddate" TEXT,
                "mothername" VARCHAR(50),
                "isoutsitefacility" INTEGER,
                "bcg_lat" VARCHAR(30),
                "bcg_long" VARCHAR(30),
                "hepb_lat" VARCHAR(30),
                "hepb_long" VARCHAR(30),
                "opv0_lat" VARCHAR(30),
                "opv0_long" VARCHAR(30),
                "opv1_lat" VARCHAR(30),
                "opv1_long" VARCHAR(30),
                "opv2_lat" VARCHAR(30),
                "opv2_long" VARCHAR(30),
                "opv3_lat" VARCHAR(30),
                "opv3_long" VARCHAR(30),
                "penta1_lat" VARCHAR(30),
                "penta1_long" VARCHAR(30),
                "penta2_lat" VARCHAR(30),
                "penta2_long" VARCHAR(30),
                "penta3_lat" VARCHAR(30),
                "penta3_long" VARCHAR(30),
                "pcv1_lat" VARCHAR(30),
                "pcv1_long" VARCHAR(30),
                "pcv2_lat" VARCHAR(30),
                "pcv2_long" VARCHAR(30),
                "pcv3_lat" VARCHAR(30),
                "pcv3_long" VARCHAR(30),
                "ipv_lat" VARCHAR(30),
                "ipv_long" VARCHAR(30),
                "rota1_lat" VARCHAR(30),
                "rota1_long" VARCHAR(30),
                "rota2_lat" VARCHAR(30),
                "rota2_long" VARCHAR(30),
                "measles1_lat" VARCHAR(30),
                "measles1_long" VARCHAR(30),
                "measles2_lat" VARCHAR(30),
                "measles2_long" VARCHAR(30),
                "Province" TEXT,
                "District" TEXT,
                "Tehsil" TEXT,
                "UnionCouncil" TEXT,
                "address" TEXT,
                "fingerprint" TEXT,
                "year" VARCHAR(4),
                "bcg_facode" VARCHAR(6),
                "hepb_facode" VARCHAR(6),
                "opv0_facode" VARCHAR(6),
                "opv1_facode" VARCHAR(6),
                "opv2_facode" VARCHAR(6),
                "opv3_facode" VARCHAR(6),
                "penta1_facode" VARCHAR(6),
                "penta2_facode" VARCHAR(6),
                "penta3_facode" VARCHAR(6),
                "pcv1_facode" VARCHAR(6),
                "pcv2_facode" VARCHAR(6),
                "pcv3_facode" VARCHAR(6),
                "ipv_facode" VARCHAR(6),
                "rota1_facode" VARCHAR(6),
                "rota2_facode" VARCHAR(6),
                "measles1_facode" VARCHAR(6),
                "measles2_facode" VARCHAR(6),
                "pic_issynced" TEXT,
                "temp_no" INTEGER,
                "bcg_mode" CHARACTER(1),
                "hepb_mode" CHARACTER(1),
                "opv0_mode" CHARACTER(1),
                "opv1_mode" CHARACTER(1),
                "opv2_mode" CHARACTER(1),
                "opv3_mode" CHARACTER(1),
                "penta1_mode" CHARACTER(1),
                "penta2_mode" CHARACTER(1),
                "penta3_mode" CHARACTER(1),
                "pcv1_mode" CHARACTER(1),
                "pcv2_mode" CHARACTER(1),
                "pcv3_mode" CHARACTER(1),
                "ipv_mode" CHARACTER(1),
                "rota1_mode" CHARACTER(1),
                "rota2_mode" CHARACTER(1),
                "measles1_mode" CHARACTER(1),
                "measles2_mode" CHARACTER(1),
                "mothercnic" VARCHAR(15),
                "bcg_techniciancode" VARCHAR(9),
                "hepb_techniciancode" VARCHAR(9),
                "opv0_techniciancode" VARCHAR(9),
                "opv1_techniciancode" VARCHAR(9),
                "opv2_techniciancode" VARCHAR(9),
                "opv3_techniciancode" VARCHAR(9),
                "penta1_techniciancode" VARCHAR(9),
                "penta2_techniciancode" VARCHAR(9),
                "penta3_techniciancode" VARCHAR(9),
                "pcv1_techniciancode" VARCHAR(9),
                "pcv2_techniciancode" VARCHAR(9),
                "pcv3_techniciancode" VARCHAR(9),
                "ipv_techniciancode" VARCHAR(9),
                "rota1_techniciancode" VARCHAR(9),
                "rota2_techniciancode" VARCHAR(9),
                "measles1_techniciancode" VARCHAR(9),
                "measles2_techniciancode" VARCHAR(9),
                "reg_mode" TEXT,
                "address_lat" TEXT,
                "address_lng" TEXT,
                "recno" INTEGER NOT NULL UNIQUE,
                "village_name" TEXT,
                "villagemohallah" TEXT,
                PRIMARY KEY("recno" AUTOINCREMENT)
            );`
        ), [], 
        () => {
            console.log("Table Created")
        }
    })
}

const OU = () => {
    console.log("sqlite",db)
    const prepareOU = () => {
        setTimeout(async () => {
            await createChildRegistrationTable()
            db.transaction(provinces => {
                provinces.executeSql(
                    `CREATE TABLE IF NOT EXISTS "provinces" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "provinces" TEXT NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertProvinces => {
                insertProvinces.executeSql(
                    "select count(*) as cnt from provinces", [], 
                    (insertProvinces,resultInsertProvinces) => {
                        if(resultInsertProvinces.rows.item(0).cnt > 0){
                            Toast.show('Provinces data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertProvinceData()
                    }
                )
            })
            db.transaction(districts => {
                districts.executeSql(
                    `CREATE TABLE IF NOT EXISTS "districts" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "distcode" NUMERIC NOT NULL,
                        "district" TEXT NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertDistricts => {
                insertDistricts.executeSql(
                    "select count(*) as cnt from districts", [], 
                    (insertDistricts, resultInsertDistricts) =>{
                        if(resultInsertDistricts.rows.item(0).cnt > 0){
                            Toast.show('Districts data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertDistrictsData()
                    }
                )
            })
            db.transaction(tehsils => {
                tehsils.executeSql(
                    `CREATE TABLE IF NOT EXISTS "tehsil" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "distcode" NUMERIC NOT NULL,
                        "tcode" NUMERIC NOT NULL,
                        "tehsil" TEXT NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertTehsils => {
                insertTehsils.executeSql(
                    "select count(*) as cnt from tehsil", [], 
                    (insertTehsils, resultInsertTehsils) =>{
                        if(resultInsertTehsils.rows.item(0).cnt > 0){
                            Toast.show('Tehsils data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertTehsilsData()
                    }
                )
            })
            db.transaction(unioncouncils => {
                unioncouncils.executeSql(
                    `CREATE TABLE IF NOT EXISTS "unioncouncil" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "distcode" NUMERIC NOT NULL,
                        "tcode" NUMERIC NOT NULL,
                        "uncode" NUMERIC NOT NULL,
                        "un_name" TEXT NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertUcs => {
                insertUcs.executeSql(
                    "select count(*) as cnt from unioncouncil", [], 
                    (insertUcs, resultInsertUcs) =>{
                        if(resultInsertUcs.rows.item(0).cnt > 0){
                            Toast.show('UnionCouncil data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertUnioncouncilsData()
                    }
                )
            })
            db.transaction(facilities => {
                facilities.executeSql(
                    `CREATE TABLE IF NOT EXISTS "facilities" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "distcode" NUMERIC NOT NULL,
                        "tcode" NUMERIC NOT NULL,
                        "uncode" NUMERIC NOT NULL,
                        "facode" NUMERIC NOT NULL,
                        "fac_name" TEXT NOT NULL,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertFacilities => {
                insertFacilities.executeSql(
                    "select count(*) as cnt from facilities", [], 
                    (insertFacilities, resultInsertFacilities) =>{
                        if(resultInsertFacilities.rows.item(0).cnt > 0){
                            Toast.show('Facilities data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertFacilitiesData()
                    }
                )
            })
            db.transaction(villages => {
                villages.executeSql(
                    `CREATE TABLE IF NOT EXISTS "cerv_villages" (
                        "id" INTEGER NOT NULL UNIQUE,
                        "procode" NUMERIC NOT NULL,
                        "province" TEXT NOT NULL,
                        "distcode" NUMERIC,
                        "district" TEXT,
                        "tcode"	NUMERIC,
                        "tehsil" TEXT,
                        "uncode" NUMERIC,
                        "unioncouncil" TEXT,
                        "vcode"	NUMERIC NOT NULL,
                        "village" TEXT NOT NULL,
                        "population" NUMERIC,
                        "facode" NUMERIC,
                        "facility" TEXT,
                        "postal_address" TEXT,
                        "techniciancode" NUMERIC,
                        "technician" TEXT,
                        "year" NUMERIC,
                        PRIMARY KEY("id" AUTOINCREMENT)
                    );`
                )
            })
            db.transaction(insertVillages => {
                insertVillages.executeSql(
                    "select count(*) as cnt from cerv_villages", [], 
                    (insertVillages, resultInsertVillages) =>{
                        if(resultInsertVillages.rows.item(0).cnt > 0){
                            Toast.show('Villages data already exists in local database',Toast.LONG, Toast.CENTER);
                        }
                        else
                            insertVillagesData()
                    }
                )
            })
        }, 1000);
    }

    const callPrepareOU = async () => {
        await prepareOU();
    }
    
    callPrepareOU();

    const insertProvinceData = () => {
        Toast.show('Fetching Provinces Data',Toast.LONG, Toast.CENTER)
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=province')
        .then(result => {
            const provinces = result.data
            let query = 'insert into "provinces" (procode,provinces) values ';
            provinces.map((item, index) => {
                query += `(${item.procode},"${item.provinces}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Provinces Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Provinces Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of Provinces!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertDistrictsData = () => {
        Toast.show('Fetching Districts Data',Toast.LONG, Toast.CENTER)
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=district')
        .then(result => {
            const districts = result.data
            let query = 'insert into "districts" (procode,distcode,district) values ';
            districts.map((item, index) => {
                query += `(${item.procode},${item.distcode},"${item.district}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Districts Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Districts Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of Districts!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertTehsilsData = () => {
        Toast.show('Fetching Tehsils Data',Toast.LONG, Toast.CENTER)
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=tehsil')
        .then(result => {
            const tehsils = result.data
            let query = 'insert into "tehsil" (procode,distcode,tcode,tehsil) values ';
            tehsils.map((item, index) => {
                query += `(${item.procode},${item.distcode},${item.tcode},"${item.tehsil}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Tehsils Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Tehsils Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of Tehsils!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertUnioncouncilsData = () => {
        Toast.show('Fetching Unioncouncils Data',Toast.LONG, Toast.CENTER)
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=uc')
        .then(result => {
            const ucs = result.data
            let query = 'insert into "unioncouncil" (procode,distcode,tcode,uncode,un_name) values ';
            ucs.map((item, index) => {
                query += `(${item.procode},${item.distcode},${item.tcode},${item.uncode},"${item.un_name}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting UCs Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('UCs Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of UCs!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertFacilitiesData = () => {
        Toast.show('Fetching Facilities Data',Toast.LONG, Toast.CENTER)
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=facilities')
        .then(result => {
            const ucs = result.data
            let query = 'insert into "facilities" (procode,distcode,tcode,uncode,facode,fac_name) values ';
            ucs.map((item, index) => {
                let uncode = item.uncode < 1?0:item.uncode
                query += `(${item.procode},${item.distcode},${item.tcode},${uncode},${item.facode},"${item.fac_name}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Facilities Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Facilities Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of Facilities!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertVillagesData = () => {
        Toast.show('Fetching Villages Data',Toast.LONG, Toast.CENTER)
        axios.get('http://epimis.cres.pk/webapis/cerv/index.php/Api/downSyncVillagesDataFromServer')
        .then(result => {
            const villages = result.data.data
            let query = 'insert into "cerv_villages" (vcode,village,procode,province,distcode,district,tcode,tehsil,uncode,unioncouncil,facode,facility,techniciancode,technician,population,year) values ';
            villages.map((item, index) => {
                let population = item.population > 0 ? item.population : 0
                query += `(${item.vcode},"${item.village}",${item.procode},"${item.province}",${item.distcode},"${item.district}",${item.tcode},"${item.tehsil}",${item.uncode},"${item.unioncouncil}",${item.facode},"${item.facility}",${item.techniciancode},"${item.technician}",${population},${item.year}),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Villages Data in local database',Toast.LONG, Toast.CENTER)
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Villages Inserted Successfully!',Toast.LONG, Toast.CENTER)
                }, () => {
                    Toast.show('Error Occured during Insertion of Villages!',Toast.LONG, Toast.CENTER)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    return null;
}

/* Seperator Component */
const Separator = () => (
    <View style={styles.separator} />
);

/* Login Component */
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

/* Drawer Navigation Components Start */
const NavigationDrawerStructure = ({navigationProps, backbutton})=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        navigationProps.toggleDrawer();
    };
  
    return (
            (backbutton)?null
            : <TouchableOpacity hitSlop={{top:5,bottom:5,left:5,right:5}} style={{marginLeft: 15}} onPress={()=> toggleDrawer()}>
                <Icons name="menu" size={30} color="#FFF" />
            </TouchableOpacity>
    ); 
}

const NavigationHeaderRight = ({navigation, icon, iconNavigationScreen}) => {
    return (
        <TouchableOpacity hitSlop={{top:5,bottom:5,left:5,right:5}} style={ styles.headerRightIconStyle} onPress={() => navigation.navigate(iconNavigationScreen)}>
            <SvgXml style={{marginRight:15}} xml={icon} width="30" height="30" />
        </TouchableOpacity>
    )
}

const menuReducer = (state, action) => {
    switch (action.type) {
        case 'childmenu':
            return {
                childMenu: true,
                womenMenu: false,
                syncMenu: false,
                settingMenu: false,
        };
        case 'womenmenu':
            return {
                childMenu: false,
                womenMenu: true,
                syncMenu: false,
                settingMenu: false,
            };
        case 'syncmenu':
            return {
                childMenu: false,
                womenMenu: false,
                syncMenu: true,
                settingMenu: false,
            };
        case 'settingmenu':
            return {
                childMenu: false,
                womenMenu: false,
                syncMenu: false,
                settingMenu: true,
            };
        default:
            return {
                childMenu: true,
                womenMenu: false,
                syncMenu: false,
                settingMenu: false,
            }
    }
}

const CustomDrawerContent = (props) => {
    const [menustate, menudispatch] = useReducer(menuReducer, { childMenu: true, womenMenu: false, syncMenu: false, settingMenu: false});
    const { signOut } = useContext(AuthContext);
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigation.toggleDrawer();
    };
   // console.log("navigation props", props.navigation)
    return (            
        <View style={{flex:1, flexDirection: "row"}}>
            <View style={{flex:0.7,}}>
                <View style={{flex:1}}>
                    <View style={{flex:0.3, justifyContent: "center", alignItems: "center", borderBottomColor: "#626267", borderBottomWidth: 0.7, marginHorizontal: 10,}}>
                        <View style={{
                                        width: 100, 
                                        height: 100,  
                                        borderRadius: 100/2, 
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
                                        alignItems: "center"
                                    }}>
                            <SvgXml xml={Profile_Default_Pic} />
                        </View>
                        <Text style={{fontSize: 14, fontFamily: "Roboto", fontWeight: "700", color: "#626267"}}>Abdul Qadar</Text>
                        <Text style={{fontSize: 14, fontFamily: "Roboto", fontWeight: "normal", color: "#626267", marginVertical: 5,}}>Public Health School Lahori <SvgXml xml={Location_Icon} /></Text>
                        <Text style={{fontSize: 14, fontFamily: "Roboto", fontWeight: "normal", color: "#626267"}}>191002650</Text>
                    </View>
                    <View style={{flex:0.63,}}>
                        <DrawerContentScrollView {...props}> 
                            <DrawerItemList {...props} />
                            {menustate.childMenu?<DrawerItem
                                label="Search Child Record"
                                onPress={() => props.navigation.navigate('Search Child Record')}
                                icon={({focused, color, size }) => <SvgXml xml={Menu_Child_Icon} />}
                            />
                            :null}
                            {menustate.womenMenu?<DrawerItem
                                label="Search Women Record"
                                //onPress={}
                                icon={({focused, color, size }) => <SvgXml xml={Menu_Women_Icon} />}
                            />
                            :null}
                            {menustate.syncMenu ?<><DrawerItem
                                label="DownSync Organizational Units"
                                onPress={OU}
                                icon={({focused, color, size }) => <SvgXml xml={Menu_OU_Icon} />}
                            />
                            <DrawerItem
                                label="DownSync Child Record"
                                onPress={DownSyncChildData}
                                icon={({focused, color, size }) => <SvgXml xml={Menu_Child_Icon} />}
                            /></>
                            :null}
                            {menustate.settingMenu?<DrawerItem
                                label="About Us"
                                onPress={() => Linking.openURL('http://pace-tech.com')}
                            />
                            :null}
                        </DrawerContentScrollView>
                    </View>
                    <View style={{flex:0.07, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, borderTopColor: "#626267", borderTopWidth: 0.7, backgroundColor: "#FFF",  shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 9.25,
                                    elevation: 5,}}>
                        <View style={{flexDirection:"row"}}>
                            <SvgXml xml={Checkout_Icon} />
                            <Text style={{color: "#D84040", marginLeft: 5, fontWeight: "600", fontFamily: "Roboto"}}>Check-Out</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <SvgXml xml={Logout_Icon} />
                            <TouchableOpacity onPress={() => signOut()}>
                                <Text style={{color: "#D84040", marginLeft: 5, fontWeight: "600", fontFamily: "Roboto"}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex:0.3}}>
                <View style={{flex:1}}>
                    <View style={{flex:0.1, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity onPress={()=> toggleDrawer()}>
                            <Icons name="keyboard-backspace" size={30} color="#1885BE"  />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:0.225, backgroundColor: menustate.childMenu ? "#1885BE":"#FFF" , borderBottomColor: "#1885BE", borderBottomWidth: 0.7,}}>
                        <Ripple rippleDuration={1000} style={{flex:1, justifyContent: "center", alignItems: "center",}} rippleColor="#000" onPress={() => menudispatch({type: "childmenu"})}>
                            <SvgXml xml={menustate.childMenu?Child_White_Icon:Child_Icon} style={{ color: menustate.childMenu ? "#FFF":"" }}/>
                            <Text style={{fontSize: 12, fontWeight: "700", fontFamily: "Roboto",  color: menustate.childMenu ? "#FFF": "#1885BE"}}>Child Registration</Text>
                        </Ripple>
                    </View>
                    <View style={{flex:0.225, backgroundColor: menustate.womenMenu ? "#1885BE":"#FFF", borderBottomColor: "#1885BE", borderBottomWidth: 0.7,}}>
                        <Ripple rippleDuration={1000} style={{flex:1, justifyContent: "center", alignItems: "center",}} rippleColor="#000" onPress={() => menudispatch({type: "womenmenu"})}>
                            <SvgXml xml={menustate.womenMenu?Mother_White_Icon:Women_Icon} />
                            <Text style={{fontSize: 12, fontWeight: "700", fontFamily: "Roboto",  color: menustate.womenMenu ? "#FFF": "#1885BE"}}>Woman Registration</Text>
                        </Ripple>
                    </View>
                    <View style={{flex:0.225, backgroundColor: menustate.syncMenu ? "#1885BE":"#FFF", borderBottomColor: "#1885BE", borderBottomWidth: 0.7,}}>
                        <Ripple rippleDuration={1000} style={{flex:1, justifyContent: "center", alignItems: "center",}} rippleColor="#000" onPress={() => menudispatch({type: "syncmenu"})}>
                            <SvgXml xml={menustate.syncMenu?Sync_White_Icon:Sync_Icon} />
                            <Text style={{fontSize: 12, fontWeight: "700", fontFamily: "Roboto",  color: menustate.syncMenu ? "#FFF": "#1885BE"}}>Data Synchronization</Text>
                        </Ripple>
                    </View>
                    <View style={{flex:0.225, backgroundColor: menustate.settingMenu ? "#1885BE":"#FFF",}}>
                        <Ripple rippleDuration={1000} style={{flex:1, justifyContent: "center", alignItems: "center",}} rippleColor="#000" onPress={() => menudispatch({type: "settingmenu"})}>
                            <SvgXml xml={menustate.settingMenu?Setting_White_Icon:Setting_Icon} />
                            <Text style={{fontSize: 12, fontWeight: "700", fontFamily: "Roboto",  color: menustate.settingMenu ? "#FFF": "#1885BE"}}>Settings and Backup</Text>
                        </Ripple>
                    </View>
                </View>
            </View>
        </View>
    )
}
/* Drawer Navigation Components Ends */

/* Main App Function */
const App = ({navigation}) => {

    const storeData = async (itemName, value) => {
        try {
            await AsyncStorage.setItem(itemName, value)
        } catch (e) {
          // saving error
          console.log("error",e)
        }
    }

    const removeData = async (itemName) => {
        try {
            await AsyncStorage.removeItem(itemName)
        } catch (e) {
          // saving error
          console.log("error",e)
        }
    }
    
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                    break;
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                    break;
                case 'SIGN_OUT':
                    removeData('userToken')
                    return {
                        isSignout: true,
                        userToken: null,
                    };
                    break;
            }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken; 
            try {
                userToken = await AsyncStorage.getItem('userToken');
                if(userToken != null){
                    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                }
            } catch (e) {
                // Restoring token failed
                Toast.show("Session Expired! Please Login Again!")
            }
            // After restoring token, we may need to validate it in production apps
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            SplashScreen.hide()
            //console.log("Splash Screen","Starts now")
        };
        bootstrapAsync();
    }, []);
    
    useEffect(() => {
        BackgroundFetch.configure({
            minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
            stopOnTerminate: false,   // <-- Android-only,
            startOnBoot: true,
            // Android options
            /* forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
            requiresCharging: false,      // Default
            requiresDeviceIdle: false,    // Default
            requiresBatteryNotLow: false, // Default
            requiresStorageNotLow: false  // Default */
        }, async (taskId) => {
            console.log("[js] Received background-fetch event: ", taskId);
            let i = 0;
            var recno = 0;
            console.log("before While", recno)
            while (i < 1){
                // Select max recno from database table
                await db.transaction(selectMaxRecNo => {
                    selectMaxRecNo.executeSql(
                        "select max(recno) as recno from cerv_child_registration", [], 
                        (selectMaxRecNo,resultMaxRecNo) => {
                            console.log("query result",resultMaxRecNo.rows.item(0).recno)
                            if(resultMaxRecNo.rows.item(0).recno > 0){
                                recno = resultMaxRecNo.rows.item(0).recno;
                                console.log("here in if ", recno)
                                fetchChildDataAndSave(recno);
                            }else{
                                recno = null
                            }
                        }
                    )
                })
                i++;
            }
            console.log("after While", recno)
            // Required: Signal completion of your task to native code
            // If you fail to do this, the OS can terminate your app
            // or assign battery-blame for consuming too much background-time
            BackgroundFetch.finish(taskId); // BackgroundFetch.FETCH_RESULT_NEW_DATA
        }, (error) => {
            console.log("[js] RNBackgroundFetch failed to start", error);
        });        
        // Optional: Query the authorization status.
        BackgroundFetch.status((status) => {
            switch(status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    console.log("BackgroundFetch restricted");
                    break;
                case BackgroundFetch.STATUS_DENIED:
                    console.log("BackgroundFetch denied");
                    break;
                case BackgroundFetch.STATUS_AVAILABLE:
                    console.log("BackgroundFetch is enabled");
                    break;
            }
        });
    },[])

    const fetchChildDataAndSave = async (recno) => {
        const validate_token = await AsyncStorage.getItem('userToken');
        const usercode = await AsyncStorage.getItem('usercode');
        console.log("url", 'http://epimis.cres.pk/webapis/cerv/index.php/Api/downSyncChildrenDataFromServer?username='+usercode+'&validate_token='+validate_token+'&recno='+recno)
        await axios.get('http://epimis.cres.pk/webapis/cerv/index.php/Api/downSyncChildrenDataFromServer?username='+usercode+'&validate_token='+validate_token+'&recno='+recno).then(async (result) => {
            // Data persisted to AsyncStorage can later be accessed by the foreground app
            console.log("Item Value", result);
        })
        console.log("after each axios request", recno)
    }

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                axios(
                {
                    method: 'POST',
                    data: querystring.stringify({
                        username: data.username,
                        password: data.password
                    }),
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    url: 'http://epimis.cres.pk/webapis/cerv/index.php/Api/login'
                })
                .then(function (response) {
                    // handle success
                    let responseData = response.data;
                    if(responseData.success=="yes"){
                        Toast.show(responseData.vaccinator_name)
                        console.log(responseData.data)
                        dispatch({ type: 'SIGN_IN', token: responseData.validation_token });
                        storeData('userToken', responseData.validation_token)
                        storeData('usercode', responseData.vaccinator_code)
                        storeData('username', responseData.vaccinator_name)
                    }else{
                        Toast.show(responseData.message)
                        dispatch({ type: 'SIGN_OUT', token: null });
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log("error", error);
                })
                .finally(function () {
                    // always executed
                });
                
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
        }),[]
    );
    
    const InventoryStack = () => {
        return (
          <InventoryScreensStack.Navigator initialRouteName="Inventory">
            <InventoryScreensStack.Screen 
                name="Inventory" 
                component={Inventory} 
            />
            <InventoryScreensStack.Screen 
                name="Voucher" 
                component={Voucher}
            />
          </InventoryScreensStack.Navigator>
        )
    }

    const MyTopTabs = () => {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: { fontSize: 12, color: '#1885BE', fontWeight: 'bold' },
                    //tabStyle: { width: 100 },
                    showIcon: true,
                    showLabel: false,
                    style: { backgroundColor: '#ECEAEA', borderColor: "#707070", shadowColor: "#000000"},
                    indicatorStyle: { backgroundColor: '#1885BE', height: 3},
                }}
            >
                <Tab.Screen 
                    options={{
                        tabBarIcon: ({ focused, tintcolor }) => (
                            focused?<SvgXml xml={HOME_CHILD_ACTIVE} />:<SvgXml xml={HOME_CHILD_INACTIVE} />
                        )
                    }}
                    name="Dafaulter Child" 
                    component={DefaulterChilds} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: ({ focused, tintcolor }) => (
                            focused?<SvgXml xml={HOME_WOMEN_ACTIVE} />:<SvgXml xml={HOME_WOMEN_INACTIVE} />
                        )
                    }}
                    name="Defaulter Women" 
                    component={DefaulterWomen} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: ({ focused, tintcolor }) => (
                            focused?<SvgXml xml={HOME_CALENDER_ACTIVE} />:<SvgXml xml={HOME_CALENDER_INACTIVE} />
                        )
                    }}
                    name="Todays Due" 
                    component={TodaysDue} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: ({ focused, tintcolor }) => (
                            focused?<SvgXml xml={HOME_INV_ACTIVE} />:<SvgXml xml={HOME_INV_INACTIVE} />
                        )
                    }}
                    name="Inventory" 
                    component={InventoryStack}
                />    
            </Tab.Navigator>
        );
    }

    const HomeScreenStack = ( {navigation} ) => {
        return (
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen 
                    name="Dashboard" 
                    component={MyTopTabs} 
                    options={{
                        title: 'CERV', //Set Header Title
                        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="CERV" />,
                        headerRight: () => <NavigationHeaderRight navigation={navigation} icon={SearchIcon} iconNavigationScreen="Search Child Record" />,
                        headerStyle: {
                            backgroundColor: '#1885BE', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
                <Stack.Screen 
                    name="Search Child Record" 
                    component={ChildSearchedList} 
                    options={{
                        title: 'Child Listing', //Set Header Title
                        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} title="Child Listing" />,
                        headerRight: () => <NavigationHeaderRight navigation={navigation} icon={SearchIcon} iconNavigationScreen="Filters" />,
                        headerStyle: {
                            backgroundColor: '#1885BE', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
                <Stack.Screen name="Filters" component={SearchOptions} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Child Detail"
                    component={ChildDetail}
                    options={{
                        title: 'Immunization Card', //Set Header Title
                        headerStyle: {
                            backgroundColor: '#1885BE', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (
        <>
        <StatusBar backgroundColor={colors.STATUSBAR} />
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userToken == null ? (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{headerShown: false}}
                        />
                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator
                        initialRouteName="Dashboard"
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                        drawerStyle={{
                            width: "100%",
                            backgroundColor: "#ECEDF1",
                        }}
                        drawerLabel="CERV"
                        edgeWidth={30}
                        hideStatusBar={false}
                    >
                        <Drawer.Screen name="Dashboard" component={HomeScreenStack}/>
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
        </>
    )
}

/* Style Sheet */
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
    },
    downloadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: getStatusBarHeight(),
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    downloadProgressBar: {
        flexDirection:"row",
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
});

export default  App