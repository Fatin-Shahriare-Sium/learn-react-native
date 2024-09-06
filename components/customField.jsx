import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput ,Image} from 'react-native'
import icon from ".././constents/icon"

const CustomField = ({title,placeholder}) => {
    let [showPass,setshowPass]=useState(false)
  return (
    <View style={{display:"flex", flexDirection:"row",overflow:"hidden",margin:".3rem"}}>
        <View style={styles.inputBox}>
            <Text style={{color:"white"}}>{title}</Text>
                <TextInput secureTextEntry={title==="Password" && showPass===false?true:false}  placeholder={placeholder}  style={styles.inputArea} >

                </TextInput>
               
        </View>
        {title==="Password" ? (<TouchableOpacity style={styles.inputEye} onPress={()=>{setshowPass(!showPass)}}>
            <Image height="2px" source={showPass==true?icon.eyeHide:icon.eye} resizeMode='contain'   />
        </TouchableOpacity>):"" }
    </View>
  )
}

export default CustomField

const styles = StyleSheet.create({
    inputArea:{
        width:"90%",
        border:"2px solid white",
        color:"white",
        fontSize:"1.3rem",
        padding:".3rem"
        
    },
    inputBox:{
        width:"90%",
       
    },
    inputEye:{
        position:"absolute",
        width:"1px",
        top:"17%",
        right:"40%"
    }
})