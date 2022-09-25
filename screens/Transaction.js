import React,{Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
export default class TransactionScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            domState:'normal',
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
        }
    }
    getCameraPermissions=async domState=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status=='granted',
            domState:domState,
            scanned: false,
        })
    }
    handleBarCodeScanned=async ({type, data})=>{
        thiss.setState({
            scannedData:data,
            domState: 'normal',
            scanned: 'true',
        })
    }
    render(){
        const{domState, hasCameraPermissions, scannedData, scanned}=this.state
        if(domState=='scanner'){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    {hasCameraPermissions ? scannedData:'requestforcameraPermissions'}
                </Text>
                <TouchableOpacity style={[styles.button, {marginTop:25}]}
                onPress={()=>this.getCameraPermissions('scanner')}>
                    <Text style={styles.buttontext}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'White',
    },
    text:{
        color: 'purple',
        fontSize:30,
    }, 
    button:{
        width: '43%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius:15,
    },

    buttontext:{
        fontSize: 24, 
        color:'black',

    }
})
