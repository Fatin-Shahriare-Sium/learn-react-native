import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomField from '../../components/customField'
import CustomBtn from '../../components/customBtn'

const SignIn = () => {
  return (
    <SafeAreaView style={{height:"100%"}} >
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View style={styles.container}>
          <CustomField title="Email" placeholder="email"></CustomField>
          <CustomField title="Password" placeholder="Password"></CustomField>
          <CustomBtn btnName="Sign In" ></CustomBtn>
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
