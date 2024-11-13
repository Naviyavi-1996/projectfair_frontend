

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}
//login
export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project

export const addProjectApi=async(reqBody,reqHeader)=>
{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

//get home project 
export const homeProjectApi=async()=>
{
    return await commonApi('GET',`${serverUrl}/home-project`)
}

//get all project
export const allProjectApi=async(searchKey,reqHeader)=>
{
    //query parameter=baseurl?key=value
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}
//get user projects
export const userProjectApi=async(reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
    } 
//remove user projects
export const removeUserProjectApi=async(id,reqHeader)=>
{
    return await commonApi('DELETE',`${serverUrl}/remove-user-project/${id}`,{},reqHeader)
}

//api to update project

export const updateUserProjectApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProject/${id}`,reqBody,reqHeader)
}

//api to update profile

export const updateUserProfileApi = async(reqBody, reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProfile`,reqBody, reqHeader)
}