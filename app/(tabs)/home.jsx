import { StyleSheet, Text, View,FlatList, ScrollView,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomField from '../../components/customField'
import { searchVideo, videosObj } from '../../lib/appwrite'
import VideoCard from '../../components/videoCard'
import CustomBtn from '../../components/customBtn'
import { router } from 'expo-router'
import SearchInput from '../../components/searchInput'

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
      <ScrollView>
      <View style={styles.homeConatiner}>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <SearchInput/>
        </View>
        <FlatList
        data={videoProperty}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>{return <VideoCard  title={item.vidTitle} thumnailSrc={item.thumbnail} avatarSrc={item.videoCreator.avatar} vdCreateorName={item.videoCreator.username} />}}
      
        ListHeaderComponent={()=>{
          return (
            <View>
              <Text style={{color:"white",fontWeight:"700",textAlign:"center",fontSize:"2rem"}}>Videos Section</Text>
            </View>
          )
        }}
        ListFooterComponent={()=>{
          return(
            <Text Text style={{color:"red"}}>tHNAKS FOE WATCGING</Text>
          )
          
        }}
        ListEmptyComponent={()=>{
          <View>
            <Text style={{fontWeight:"700",fontSize:"3rem"}}>NOTHING TO SHOW 🤒</Text>
          </View>
        }}
        />
        {console.log("vidoe in code",videoProperty)}
       
      <Text>Home</Text>
      
    </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  homeConatiner:{
    height:"100%",
    backgroundColor:"black",
    display:"flex",
    flexDirection:'column'
  }
})