import { ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchUserVideos, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalContext'
import { SafeAreaView } from 'react-native-safe-area-context'
const Profile = () => {
  let [user,setUser]=useState({namex:"",email:"",avatar:"",id:""});
  let [userVideo,setUserVideo]=useState([])
  let x=useGlobalContext()
  console.log("useGlobalContext in progile",x);
  
  useEffect(()=>{
    getCurrentUser().then((res)=>{
      console.log("get acc",res);
      setUser({namex:res.username,email:res.email,avatar:res.avatar})
      fetchUserVideos(res.$id).then((res)=>{
        console.log("user video",res);
        setUserVideo(res);
      })
     
    })
  },[])
  return (
    <SafeAreaView>
         <ScrollView >
            <View  style={styles.profileWrapper}>
              <Text>Your Profle</Text>
            <View>
            <Image style={{width:70,height:70,borderRadius:"70px"}} source={user.avatar}/>
              <Text>{user.namex}</Text>
              <Text>{`Email:${user.email}`}</Text>
            </View>
            <View>
                <View>
                  {userVideo.length<=0?<Text>You have not uploaded any video</Text>:
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
    alignItems:"center"
  }
})