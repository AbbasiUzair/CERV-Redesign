import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IC_BASIC_INFO_ACTIVE from '../../assets/images/basic-info-active.svg'
import IC_BASIC_INFO_INACTIVE from '../../assets/images/basic-info-inactive.svg'
import IC_VACCINATION_DETAIL_ACTIVE from '../../assets/images/vaccination-detail-active.svg'
import IC_VACCINATION_DETAIL_INACTIVE from '../../assets/images/vaccination-detail-inactive.svg'
import { SvgXml } from 'react-native-svg';
import BasicInfo from './BasicInfo';
import VaccinationDetail from './VaccinationDetail'
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

const Tab = createMaterialTopTabNavigator();
export const ChildDetailContext = React.createContext();

const ChildDetailTabs = ({recno}) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#1885BE",
                inactiveTintColor : "#B4B4B4",
                labelStyle: { fontSize: 12, fontWeight: 'bold' },
                tabStyle: { flexDirection: "row" },
                showIcon: true,
                showLabel: true,
                style: { justifyContent: "center", backgroundColor: '#ECEAEA', borderColor: "#707070", shadowColor: "#000000", paddingHorizontal: 20},
                indicatorStyle: {backgroundColor: '#1885BE', height: 3, },
            }}
        >
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ focused, tintcolor }) => (
                        focused?<SvgXml width="23" height="23" xml={IC_BASIC_INFO_ACTIVE} />:<SvgXml width="23" height="23" xml={IC_BASIC_INFO_INACTIVE} />
                    )
                }}
                name="Basic Information" 
                component={BasicInfo} 
                recno={recno}
            />
            <Tab.Screen 
                options={{
                    tabBarIcon: ({ focused, tintcolor }) => (
                        focused?<SvgXml width="23" height="23" xml={IC_VACCINATION_DETAIL_ACTIVE} />:<SvgXml width="23" height="23" xml={IC_VACCINATION_DETAIL_INACTIVE} />
                    )
                }}
                name="Vaccination Detail" 
                component={VaccinationDetail} 
                recno={recno}
            />
        </Tab.Navigator>
    );
}

function ChildDetail( {route, navigation} ) {
    const recno = route.params.recno;
    const [childInfo, setChildInfo] = useState([]);
    
    useEffect(() => {
        const fetchChildInformation = async () => {
            await db.transaction(fetchChildDetail => {
                fetchChildDetail.executeSql(
                    `SELECT * from cerv_child_registration where recno = ?;`, [recno],
                    (fetchChildDetail, resultChildDetail) => {
                        const len = resultChildDetail.rows.length;
                        setChildInfo(resultChildDetail.rows.item(0));
                    }
                )
            })
        }
        fetchChildInformation()
    }, [])

    return (
        <ChildDetailContext.Provider value={childInfo}>
            <ChildDetailTabs recno={route.params.recno}/>
        </ChildDetailContext.Provider>
    )
}

export default ChildDetail
