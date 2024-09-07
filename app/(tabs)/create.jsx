import { StyleSheet, Text, View,Image, ScrollView, Pressable, TouchableOpacity,Modal } from 'react-native';
import React, { useState } from 'react';
import CustomField from '../../components/customField';
import icons from "../../constents/icon";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '../../lib/appwrite';
const Create = () => {
  let [modalVisible,setModalVisible]=useState(false);

  const pickImage = async (type) => {
    // No permissions request is necessary for launching the image library
    const result = await DocumentPicker.getDocumentAsync();

    uploadFile(result.output[Object.keys(result.output)[0]]).then(()=>{})
    console.log("img picker",result.output[Object.keys(result.output)[0]]);
    
  }

  return (
   <SafeAreaView style={{height:"100%",backgroundColor:"black"}}>
    <ScrollView >
    <View>
      <Modal 
      style={styles.createBoxWrapper}
      animationType='slide'
      visible={modalVisible}
      >
        <Text style={{fontWeight:"700",fontSize:"3rem",color:"white",textAlign:"center"}}>Uploading....</Text>
      </Modal>
        <View style={styles.createBoxWrapper} >
          <Text style={{fontWeight:"700",fontSize:"1.5rem",color:"white",textAlign:"center"}}>Create Your Video</Text>
          <CustomField title="Video Tilte" placeholder="title"/>
          <CustomField title="prompt" placeholder="prompt" />
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
                    <Image style={{height:50,width:50}} source={icons.upload}/>
                    </Pressable>
                </View>
            </View>
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
      padding:"1rem"
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