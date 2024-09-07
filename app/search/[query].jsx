import { StyleSheet, Text, View,FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { searchVideo } from '../../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from "../../components/videoCard"
import  SearchInput from "../../components/searchInput"
const Search = () => {

  let {query}=useLocalSearchParams();
  let [videoProperty,setVideoProperty]=useState([]);
  useEffect(()=>{
    searchVideo(query).then((res)=>{
      setVideoProperty(res)
    })
  },[])
  
  return (
    <SafeAreaView style={{height:"100%",backgroundColor:"black"}}>
      <ScrollView >
      <View >
          <View style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
          <SearchInput></SearchInput>
          </View>
      <Text >Search Results</Text>
      <FlatList
        data={videoProperty}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>{return <VideoCard  title={item.vidTitle} thumnailSrc={item.thumbnail} avatarSrc={item.videoCreator.avatar} vdCreateorName={item.videoCreator.username} />}}
      
        ListHeaderComponent={()=>{
          return (
            <View>
              <Text style={{color:"white",fontWeight:"700",textAlign:"center",fontSize:"2rem"}}>Videos Result:</Text>
            </View>
          )
        }}
        ListFooterComponent={()=>{
          return(
            <Text Text style={{color:"red"}}></Text>
          )
          
        }}
        ListEmptyComponent={()=>{
          <View>
            <Text style={{fontWeight:"700",fontSize:"3rem"}}>NOTHING TO SHOW 🤒</Text>
          </View>
        }}
        />
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})