import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomField from './customField';
import CustomBtn from './customBtn';
import { router } from 'expo-router';

const SearchInput = () => {
    let [searchText,setSearchText]=useState("");
    let handleSearch=()=>{
        return router.push(`/search/${searchText}`)
    }
  return (
    <View>
      <View style={{position:"relative"}}>
        <CustomField handleInputBox={(e)=>{setSearchText(e)}} placeholder="search video"/>
            <View style={{marginLeft:"9%"}}>
            <CustomBtn handlePress={handleSearch} btnName="Search"/>
            </View>
      </View>
    </View>
  )
}

export default SearchInput;

const styles = StyleSheet.create({})