import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomField from '../../components/customField'
import { videosObj } from '../../lib/appwrite'

const Home = () => {
  let [videoProperty,setVideoProperty]=useState([]);
  useEffect(()=>{

    videosObj()
    .then((res)=>{
      setVideoProperty(res);
    })
    
    
  },[])

  return (
    <SafeAreaView style={{height:"100%"}}>
      <View style={styles.homeConatiner}>
        <CustomField title="search"/>
        <FlatList
        data={videoProperty}
        renderItem={({item})=> ( <Text style={{color:"white",fontSize:"1rem"}}>{item.vidTitle}</Text>)}
        keyExtractor={(item)=>item.$id}
        />
        {console.log("vidoe in code",videoProperty)}
       
      <Text>Home</Text>
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  homeConatiner:{
    height:"100%",
    backgroundColor:"black"
  }
})