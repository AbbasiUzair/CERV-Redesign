import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios'
import Toast from 'react-native-simple-toast';

const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

var logs = [];
logs.push('Creating OU Structure and Inserting Data...');

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
    console.log('function started',logs);
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
                            Toast.show('Provinces data already exists in local database');
                            logs.push('Provinces data already exists in local database');
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
                            Toast.show('Districts data already exists in local database');
                            logs.push('Districts data already exists in local database')
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
                            Toast.show('Tehsils data already exists in local database');
                            logs.push('Tehsils data already exists in local database')
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
                            Toast.show('UnionCouncil data already exists in local database');
                            logs.push('UnionCouncil data already exists in local database')
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
                            Toast.show('Facilities data already exists in local database');
                            logs.push('Facilities data already exists in local database')
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
                            Toast.show('Villages data already exists in local database');
                            logs.push('Villages data already exists in local database')
                        }
                        else
                            insertVillagesData()
                    }
                )
            })
        }, 1000);
    }
    
    const [logsarray, setLogsArray] = useState(logs);

    const callPrepareOU = async () => {
        console.log('call to prepare ou',logs);
        await prepareOU();
        console.log('after call to prepare ou',logsarray);
        //setLogsArray(logs);
    }
    
    callPrepareOU();

    console.log('after Calls finished',logs);

    const insertProvinceData = () => {
        Toast.show('Fetching Provinces Data')
        logs.push('Fetching Provinces Data')
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=province')
        .then(result => {
            const provinces = result.data
            let query = 'insert into "provinces" (procode,provinces) values ';
            provinces.map((item, index) => {
                query += `(${item.procode},"${item.provinces}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Provinces Data in local database')
            logs.push('Inserting Provinces Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Provinces Inserted Successfully!')
                    logs.push('Provinces Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of Provinces!')
                    logs.push('Error Occured during Insertion of Provinces!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertDistrictsData = () => {
        Toast.show('Fetching Districts Data')
        logs.push('Fetching Districts Data')
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=district')
        .then(result => {
            const districts = result.data
            let query = 'insert into "districts" (procode,distcode,district) values ';
            districts.map((item, index) => {
                query += `(${item.procode},${item.distcode},"${item.district}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Districts Data in local database')
            logs.push('Inserting Districts Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Districts Inserted Successfully!')
                    logs.push('Districts Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of Districts!')
                    logs.push('Error Occured during Insertion of Districts!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertTehsilsData = () => {
        Toast.show('Fetching Tehsils Data')
        logs.push('Fetching Tehsils Data')
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=tehsil')
        .then(result => {
            const tehsils = result.data
            let query = 'insert into "tehsil" (procode,distcode,tcode,tehsil) values ';
            tehsils.map((item, index) => {
                query += `(${item.procode},${item.distcode},${item.tcode},"${item.tehsil}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Tehsils Data in local database')
            logs.push('Inserting Tehsils Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Tehsils Inserted Successfully!')
                    logs.push('Tehsils Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of Tehsils!')
                    logs.push('Error Occured during Insertion of Tehsils!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertUnioncouncilsData = () => {
        Toast.show('Fetching Unioncouncils Data')
        logs.push('Fetching Unioncouncils Data')
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=uc')
        .then(result => {
            const ucs = result.data
            let query = 'insert into "unioncouncil" (procode,distcode,tcode,uncode,un_name) values ';
            ucs.map((item, index) => {
                query += `(${item.procode},${item.distcode},${item.tcode},${item.uncode},"${item.un_name}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting UCs Data in local database')
            logs.push('Inserting UCs Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('UCs Inserted Successfully!')
                    logs.push('UCs Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of UCs!')
                    logs.push('Error Occured during Insertion of UCs!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertFacilitiesData = () => {
        Toast.show('Fetching Facilities Data')
        logs.push('Fetching Facilities Data')
        axios.get('http://federal.epimis.pk/webapis/ou.php?level=facilities')
        .then(result => {
            const ucs = result.data
            let query = 'insert into "facilities" (procode,distcode,tcode,uncode,facode,fac_name) values ';
            ucs.map((item, index) => {
                let uncode = item.uncode < 1?0:item.uncode
                query += `(${item.procode},${item.distcode},${item.tcode},${uncode},${item.facode},"${item.fac_name}"),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Facilities Data in local database')
            logs.push('Inserting Facilities Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Facilities Inserted Successfully!')
                    logs.push('Facilities Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of Facilities!')
                    logs.push('Error Occured during Insertion of Facilities!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const insertVillagesData = () => {
        Toast.show('Fetching Villages Data')
        logs.push('Fetching Villages Data')
        axios.get('http://epimis.cres.pk/webapis/cerv/index.php/Api/downSyncVillagesDataFromServer')
        .then(result => {
            const villages = result.data.data
            let query = 'insert into "cerv_villages" (vcode,village,procode,province,distcode,district,tcode,tehsil,uncode,unioncouncil,facode,facility,techniciancode,technician,population,year) values ';
            villages.map((item, index) => {
                let population = item.population > 0 ? item.population : 0
                query += `(${item.vcode},"${item.village}",${item.procode},"${item.province}",${item.distcode},"${item.district}",${item.tcode},"${item.tehsil}",${item.uncode},"${item.unioncouncil}",${item.facode},"${item.facility}",${item.techniciancode},"${item.technician}",${population},${item.year}),`;
            })
            query = query.replace(/,\s*$/, "");
            Toast.show('Inserting Villages Data in local database')
            logs.push('Inserting Villages Data in local database')
            db.transaction(runquery => {
                runquery.executeSql(query,[],() => {
                    Toast.show('Villages Inserted Successfully!')
                    logs.push('Villages Inserted Successfully!')
                }, () => {
                    Toast.show('Error Occured during Insertion of Villages!')
                    logs.push('Error Occured during Insertion of Villages!')
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    console.log('just before JSX Call',logs);

    return (
        <ScrollView>
            {
                logsarray.map((value,index) => (
                    <Text key={index}>{value}...</Text>
                ))
                //console.log("jsx rendered",logsarray)
            }
        </ScrollView>
    )
}

export default OU