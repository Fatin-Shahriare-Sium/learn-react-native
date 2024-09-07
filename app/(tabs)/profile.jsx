import { ScrollView, StyleSheet, Text, View,Image, Alert ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchUserVideos, getCurrentUser,logout } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBtn from '../../components/customBtn'
import VideoCard from '../../components/videoCard'
import { Redirect, router } from 'expo-router'
const Profile = () => {
  let [user,setUser]=useState({namex:"",email:"",avatar:"",id:""});
  let [userVideo,setUserVideo]=useState([])
  let x=useGlobalContext()
  console.log("useGlobalContext in progile",x);
  let handleLogOut=()=>{
    logout().then((res)=>{
      return router.push("/")
    })
    
  }
  useEffect(()=>{
    getCurrentUser().then((res)=>{
      console.log("get acc",res);
      if(res==null){
        return router.push("/")
       }
      setUser({namex:res.username,email:res.email,avatar:res.avatar})
      fetchUserVideos(res.$id).then((res)=>{
        console.log("user video",res);
        setUserVideo(res);
      })
    
    })
  },[])
  return (
    <SafeAreaView style={styles.profileWrapper}>
         <ScrollView  contentContainerStyle={{height:"100%"}} >
            <View  >
              <Text>Your Profle</Text>
            <View>
            <Image style={{width:150,height:150,borderRadius:"100px",display:"flex",margin:"auto"}} source={user.avatar}/>
              <Text style={{textAlign:"center",fontWeight:"700",fontSize:"3rem",textAlign:"center",color:"white"}}>{user.namex}</Text>
              <Text style={{textAlign:"center",fontWeight:"500",fontSize:"2rem",color:"white"}}>{`Email:${user.email}`}</Text>
            </View>
            <View>
                <View>
                  {userVideo.length<=0?<Text  style={{textAlign:"center",fontWeight:"700",color:"white",fontSize:"1rem",textAlign:"center"}}>You have not uploaded any video 😔</Text>:
                  <View>
                              <FlatList
                                  data={userVideo}
                                  keyExtractor={(item)=>item.$id}
                                  renderItem={({item})=>{return <VideoCard  title={item.vidTitle} thumnailSrc={item.thumbnail} avatarSrc={item.videoCreator.avatar} vdCreateorName={item.videoCreator.username} />}}
                                
                                  ListHeaderComponent={()=>{
                                    return (
                                      <View>
                                        <Text style={{color:"white",fontWeight:"700",textAlign:"center",fontSize:"2rem"}}>
                                        Your Videos </Text>
                                      </View>
                                    )
                                  }}
                                  ListFooterComponent={()=>{
                                    return(
                                      <Text Text style={{color:"red"}}>Want upload more...</Text>
                                    )
                                  }}
                                  />
                  
                    <Text>wait.....</Text>
                  </View>
                  }
                </View>
                <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <CustomBtn handlePress={handleLogOut} btnName="Log Out"></CustomBtn>
                </View>
            </View>
            </View>
         </ScrollView>

    </SafeAreaView>
    

  )
}

export default Profile

const styles = StyleSheet.create({
  profileWrapper:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"black",
    height:"100%"
  }
})