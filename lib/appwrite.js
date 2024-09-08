import { Client,ID,Account,Avatars,Databases,Query,Storage,Role,Permission } from 'react-native-appwrite';

export const appwriteConfig={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:"com.fatin.rn-first",
    projectId:"66dac7d60002fd72c937",
    databaseId:"66daca6600215ecb3f12",
    userCollectionId:"66daca9b0038e1b81d29",
    videoCollectionId:"66dacac300166f5e5127",
    storageId:"66dad0c6000ce2492bc3"
}

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage=new Storage(client);
client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;
const account = new Account(client);

// Register User
export  async function handleSignUp(email,password,username){
    console.log("handle signup",email)
    try{
        let newAccount=await account.create(ID.unique(), email,password, username);
        if(!newAccount) throw Error;
        
        let avatarUrl= avatars.getInitials(username)
        console.log("avataerurl",avatarUrl)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.userCollectionId, // collectionId
            ID.unique(),
            {
                username,
                email,
                avatar:avatarUrl,
                accId:newAccount.$id
            }
        );
        await signIn(email,password);
        return newUser;
    }catch(error){
    
        throw new Error(error);
    }
   
   
};
//signin
export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get Current User
export let getCurrentUser=async ()=> {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
      console.log('curentuser',currentUser);
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //getVideos

  export async function videosObj() {
    try{
        const result = await databases.listDocuments(
            appwriteConfig.databaseId, // databaseId
            appwriteConfig.videoCollectionId, // collectionId
            [] // queries (optional)
        );
        console.log("video obj",result);
        
        return result.documents;
    }catch(err){
        throw err;
    }
  }

//get user video

export let fetchUserVideos=async (userId)=>{
  try{
    let result=await databases.listDocuments(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.videoCollectionId,
      [Query.equal("videoCreator",userId)]
    )
   console.log(" return result.documents;",result.documents);
    return result.documents;
  }catch(err){
    throw err
  }
}

//logout

export async function logout(){
 try{
  const result = await account.deleteSessions();
  return result;

 }catch(err){
  return err;
 }
} 

//search video

export async function searchVideo(title) {

    try{
      let result=await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.search("vidTitle",title)]
      )
      console.log("serach result",result);
      
     return result.documents;
    }catch(err){
      throw new Error(err);
      
    }
}

//upload file

export let uploadFile=async (pickedFile)=>{

  try{
  let promsie=  await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      pickedFile,
  
    );
  
    let url=await getUrlOfUploadedFile(promsie.$id);
    return url;
   
    
    

  }catch(err){
    return err;
    
  }
   

}

//get url of uploaded file

let getUrlOfUploadedFile=async (id)=>{
  const result =await storage.getFilePreview(
    appwriteConfig.storageId, // bucketId
    id,
    300,
    300
  )
  console.log("getUrlOfUploadedFile",result)
  return result.href;
  
  
}
//create video post
export let craeteVideoPost=async (videoObj,videoCreatorId)=>{
    try{
      console.log(" video obj",videoObj);
      const vidPost= await databases.createDocument(
        appwriteConfig.databaseId, // databaseId
        appwriteConfig.videoCollectionId, // collectionId
        ID.unique(),
        {
          vidTitle:videoObj.vidTitle,
          vidSrc:videoObj.vidSrc,
          thumbnail:videoObj.thumbnail,
          prompt:videoObj.prompt,
          videoCreator:videoCreatorId
    
        });
        return vidPost;
        
        
    }catch(err){
      throw new Error(err);
      
    }

}