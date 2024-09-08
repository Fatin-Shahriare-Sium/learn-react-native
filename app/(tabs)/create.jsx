import { StyleSheet, Text, View,Image, ScrollView, Pressable, TouchableOpacity,Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomField from '../../components/customField';
import icons from "../../constents/icon";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from 'expo-image-picker';
import { craeteVideoPost, uploadFile } from '../../lib/appwrite';
import CustomBtn from '../../components/customBtn';
import { useGlobalContext } from '../../context/globalContext';
import { router } from 'expo-router';
const Create = () => {
  let {userx}=useGlobalContext();
  let [modalVisible,setModalVisible]=useState(false);
  let [upImgUrl,setUpImgUrl]=useState("");
  let [upVidUrl,setUpVidUrl]=useState("https://youtu.be/Q5SMmKb7qVI?si=FFpmor4yNT9DHmEf");
  let [videoProperty,setVideoProperty]=useState({videoTitle:"",prompt:"",thumbnail:"",vidSrc:"https://youtu.be/Q5SMmKb7qVI?si=FFpmor4yNT9DHmEf"});

  let handlePublish=async ()=>{
    if(videoProperty.videoTitle=="" || videoProperty.prompt=="" || videoProperty.thumbnail==""){
      return Alert.alert("Please,fill up");
    }
    let res=await craeteVideoPost(videoProperty,userx.$id);
    console.log("after publish",res);
    return router.push("/home")
    
  }

  const pickImage = async (type) => {
    // No permissions request is necessary for launching the image library
    const result = await DocumentPicker.getDocumentAsync();
    //result.output[Object.keys(result.output)[0]]---- this line of code gives the real file structure.
    //it works like a charm,Alhamdulillah
    if(result && result.assets.length>0){
      setModalVisible(true)
    }
   uploadFile(result.output[Object.keys(result.output)[0]]).then((res)=>{
    console.log("res after uploading",res);
    setUpImgUrl(res);
    setVideoProperty({...videoProperty,thumbnail:res});
    return setModalVisible(false);
   });
  
    console.log("img picker",result.output[Object.keys(result.output)[0]]);
    
  }

  return (
   <SafeAreaView style={{height:"100%",backgroundColor:"black"}}>
    <ScrollView >
    <View>
      <Modal 
     animationType='slide'
      visible={modalVisible}
      >
        <View  style={styles.modalStyle}>
        <Text style={{fontWeight:"700",fontSize:"3rem",color:"white",textAlign:"center"}}>Uploading....</Text>
        </View>
      </Modal>
        <View style={styles.createBoxWrapper} >
          <Text style={{fontWeight:"700",fontSize:"1.5rem",color:"white",textAlign:"center"}}>Create Your Video</Text>
          <CustomField handleInputBox={(e)=>setVideoProperty({...videoProperty,videoTitle:e})} title="Video Tilte" placeholder="title"/>
          <CustomField handleInputBox={(e)=>setVideoProperty({...videoProperty,prompt:e})} title="prompt" placeholder="prompt" />
          <Text style={{fontWeight:"500",fontSize:"1rem",color:"white"}}>Upload Video</Text>
            <View style={styles.videoBox}>
              <Text style={{textAlign:"center",fontWeight:"500",fontSize:".5rem",color:"white"}}>Upload Video</Text>
                <View>
                    <TouchableOpacity onPress={()=>pickImage("video")} >
                    <Image style={{height:50,width:50}} source={icons.upload}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{fontWeight:"500",fontSize:"1rem",color:"white"}}>thumbnail</Text>
            <View style={styles.videoBox}>
              <Text style={{textAlign:"center",fontWeight:"500",fontSize:".5rem",color:"white"}}>Upload Thumbnail</Text>
                <View>
                    <Pressable onPress={()=>pickImage("image")}>
                    <Image style={upImgUrl==""?{height:50,width:50}:{height:300,width:250}} resizeMode='contain' source={upImgUrl==""?icons.upload:upImgUrl}/>
                    </Pressable>
                </View>
            </View>
            <CustomBtn  handlePress={handlePublish} btnName="Publish"/>
        </View>
    </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Create

  const styles = StyleSheet.create({
    createBoxWrapper:{
      display:"flex",
      justifyContent:'center',
      alignItems:"center",
      padding:"1rem",
      backgroundColor:"black"
    },
    modalStyle:{
      display:"flex",
      justifyContent:'center',
      alignItems:"center",
      backgroundColor:"black",
      height:"100%"
    },
    videoBox:{
      height:'30vh',
      width:"90%",
      display:"flex",
      justifyContent:'center',
      alignItems:"center",
      backgroundColor:"#0d100d",
      borderRadius:"10px"
    }
})