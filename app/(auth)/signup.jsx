import { StyleSheet, Text, View,TextInput,ScrollView ,Alert} from 'react-native'
import React, { useState } from 'react'
import {router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomField from '../../components/customField'
import CustomBtn from '../../components/customBtn'
import { Link } from 'expo-router'
import {handleSignUp} from "../../lib/appwrite"
const SignUp = () => {
  let [userInfo,setUserInfo]=useState({email:"",name:"",password:""})
  let [isLogged,setIsLogged]=useState(false)
  let [submitting,setSubmitting]=useState(false)
  const submit = async () => {
  
    if (userInfo.name === "" || userInfo.email === "" || userInfo.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      window.alert("Please fill in all fields")
    }
  
    setSubmitting(true);
    try {
      const result = await handleSignUp(userInfo.email, userInfo.password, userInfo.name);
      
      setIsLogged(true);

      return router.push("/home");
    } catch (error) {
     console.log(error)
      window.alert(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{height:"100%"}} >
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View style={styles.container}>
          <CustomField handleInputBox={(textx)=>{setUserInfo({...userInfo,name:textx})}} title="Username" placeholder="username"></CustomField>
          <CustomField handleInputBox={(textx)=>{setUserInfo({...userInfo,email:textx})}} title="Email" placeholder="email"></CustomField>
          <CustomField handleInputBox={(textx)=>{setUserInfo({...userInfo,password:textx})}} title="Password" placeholder="Password"></CustomField>
          <CustomBtn handlePress={submit} btnName="Sign Up" ></CustomBtn>
            <View style={{display:"flex",margin:"1rem"}}>
                <Text style={{color:"white"}}>Donb you have an account? {<Link style={{color:"#8080ed",textDecorationLine:"underline"}} href="/signin">Sign In</Link>}</Text>
                
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%",

  },
  text:{
    color:"white",
    fontWeight:"700",
    fontSize:"1.7rem",
    marginTop:"5%"
  }
});
