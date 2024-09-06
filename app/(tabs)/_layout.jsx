import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Tabs } from 'expo-router'
import icon from '../../constents/icon'


let CustomTab=({color,name,src})=>{
    return(
        <View>
            <Image   style={{width: '100%', height: "100%"}}
            resizeMode={'center'} source={src} />
            <Text style={{color:"red"}}>{name}</Text>
        </View>
       
    )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs screenOptions={{
     tabBarActiveTintColor: "#5eff33",
     tabBarInactiveTintColor: "#CDCDE0",
     tabBarShowLabel: false,
     tabBarStyle: {
       backgroundColor: "#161622",
       borderTopWidth: 1,
       borderTopColor: "#5eff33",
       height: 84,
     },
    }}>
        <Tabs.Screen name='home' 
            options={{headerShown:false,
                title:"HOME",
                tabBarIcon: ({ color,focused }) => {
                   return(
                    <CustomTab src={icon.home} name="HOME"/>
                   )
                  
                }
            }}>
        </Tabs.Screen>
        <Tabs.Screen name='profile' 
            options={{headerShown:false,
                title:"PROFILE",
                tabBarIcon: ({ color,focused }) => {
                   return(
                    <CustomTab src={icon.profile} name="PROFILE"/>
                   )
                  
                }
            }}>
        </Tabs.Screen>
        <Tabs.Screen name='bookmark' 
            options={{headerShown:false,
                title:"bookmark",
                tabBarIcon: ({ color,focused }) => {
                   return(
                    <CustomTab src={icon.bookmark} name="bookmark"/>
                   )
                  
                }
            }}>
        </Tabs.Screen>
        <Tabs.Screen name='create' 
            options={{headerShown:false,
                title:"create",
                tabBarIcon: ({ color,focused }) => {
                   return(
                    <CustomTab src={icon.plus} name="create"/>
                   )
                  
                }
            }}>
        </Tabs.Screen>
    </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})