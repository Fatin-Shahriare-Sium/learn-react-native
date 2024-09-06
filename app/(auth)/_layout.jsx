import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import icon, {icons} from "../../constents/icon"

let CustomTab=({color,name,src})=>{
    return(
        <View>
            <Image   style={{width: '100%', height: "100%"}}
            resizeMode={'center'} source={src} />
            <Text style={{color:"red"}}>{name}</Text>
        </View>
       
    )
}
 



const AuthLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='(auth)' options={{headerShown:false}}/>
        <Text>AuthLayout</Text>
    </Stack>

   
 
    
  )
}

export default AuthLayout

const styles = StyleSheet.create({})