import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from "../constents/image"
import CustomBtn from '../components/customBtn';
import { useGlobalContext } from '../context/globalContext';
import { useEffect } from 'react';

export default function App() {
  let gcontext=useGlobalContext();
  console.log("gcontext",gcontext);
  useEffect(()=>{
    gcontext.isLogged==true && ( <Redirect href="/home" />)
  },[])
  return (
    <SafeAreaView style={{height:"100%"}}>
        <ScrollView contentContainerStyle={{height:"100%"}}>
          <View style={styles.container}>
            <Image source={image.logo}/>
            <Text style={styles.text}>Knowledge is power</Text>
            <CustomBtn btnName="Login" handlePress={()=>router.push("/signin")}></CustomBtn>
          </View>
          
        </ScrollView>
    </SafeAreaView>
  );
}

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
