import { StyleSheet, Text, View,TextInput,ScrollView,Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomField from '../../components/customField'
import CustomBtn from '../../components/customBtn'
import { Link, Redirect, router } from 'expo-router'
import {signIn} from "../../lib/appwrite"
const SignIn = () => {
  let [userInfo,setUserInfo]=useState({email:"",password:""})
  let [isLogged,setIsLogged]=useState(false)
  let [submitting,setSubmitting]=useState(false)
  const submit = async () => {
  
    if (userInfo.email === "" || userInfo.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      window.alert("Please fill in all fields")
    }
  
    setSubmitting(true);
    try {
      const result = await signIn(userInfo.email, userInfo.password);
      console.log("sign in seees",result);
      
      setIsLogged(true);

      return router.push("/home")
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
          <CustomField title="Email" handleInputBox={(e)=>{setUserInfo({...userInfo,email:e})}} placeholder="email"></CustomField>
          <CustomField title="Password" handleInputBox={(e)=>{setUserInfo({...userInfo,password:e})}} placeholder="Password"></CustomField>
          <CustomBtn handlePress={submit} btnName="Sign In" ></CustomBtn>
            <View style={{display:"flex",margin:"1rem"}}>
                <Text style={{color:"white"}}>Don't have an account? {<Link style={{color:"#8080ed",textDecorationLine:"underline"}} href="/signup">Sign Up</Link>}</Text>
                
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

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
