import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const VideoCard = ({title,thumnailSrc,avatarSrc,vdCreateorName}) => {
  return (
    <View style={styles.videoCardContainer}>
      <View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
        <Image style={{width:50, height: 50,borderRadius:"90px"}} resizeMode='contain' source={{uri:avatarSrc}}/>
        <Text style={{fontSize:"1.5rem",fontWeight:"500",color:"white",marginLeft:"1%"}}>{vdCreateorName}</Text>
        </View>
      < Text style={{fontSize:"1rem",fontWeight:"700",color:"white",margin:"1%"}} >{title}</Text>
      </View>
      <Image  resizeMode='contain'  style={styles.videoThumb} source={{uri:thumnailSrc}} />
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({
    videoCardContainer:{
        backgroundColor:"#171616",
        margin:"1rem",
        padding:'1rem',
        borderRadius:"10px"
        
        
    },
    videoThumb:{
        width:"300px",
        height:"220px",
        display:"block",
        marginLeft: "auto",
        marginRight: "auto"
       
    }
})