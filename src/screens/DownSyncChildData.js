import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import SQLite from 'react-native-sqlite-storage'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-simple-toast';
import { unzip } from 'react-native-zip-archive'
import { JsonFileReader } from '../../NativeModules';

const db = SQLite.openDatabase({name: 'cerv.db', location: 'default'})

let dirs = RNFetchBlob.fs.dirs

function DownSyncChildData() {

    const [progress,setProgressBar] = useState(0);
    
    useEffect(() => {
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
        .uploadProgress((written, total) => {
            console.log('uploaded', written / total)
        })
        // listen to download progress event
        .progress((received, total) => {
            console.log('progress', received / total * 100)
            setProgressBar(Math.round(received / total * 100))
        })
        .then((res) => {
            console.log('The file saved to ', res.path())
            setProgressBar(100)
            const charset = 'UTF-8'
            Toast.show('File Downloaded Successfully!');
            Toast.show('UnZipping File!');
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
        return(() => {
            setProgressBar(0)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>
                Downloading.....
            </Text>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: `${progress}%`}}/>
            </View>
            <Text>{progress}%</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: getStatusBarHeight(),
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    progressBar: {
        flexDirection:"row",
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
});

export default DownSyncChildData
