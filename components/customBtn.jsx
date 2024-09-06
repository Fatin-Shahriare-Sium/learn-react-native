import {Text,StyleSheet, Pressable} from "react-native"


let CustomBtn=({btnName,handlePress,isLoading})=>{
    return(
        <Pressable style={styles.btn} onPress={handlePress}>
            <Text style={{color:"white",fontWeight:"500",fontSize:"1rem"}}>{btnName}</Text>
        </Pressable>
    )
}

export default CustomBtn;

const styles = StyleSheet.create({
    btn:{
        backgroundColor:"#8b19bb",
        width:"70%",
        justifyContent:"center",
        alignItems:"center",
        padding:".3rem",
        borderRadius:"17px",
        marginTop:"5%",
        zIndex:'5'
    }
})