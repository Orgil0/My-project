import axios from "axios";
import type { Parent, Child, ParentFormData } from "../types/Parent";

const API_BASE_URL = 'http://localhost:8080/api';
const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

export const parentService = {
    getAllParents: async() : Promise<Parent[]> => {
        const response = await api.get("/parents");
        return response.data;
    },
    // get parent by id
    getParentById: async(id:number): Promise<Parent> =>{
        const response = await api.get(`parents/${id}`);
        return response.data
    },
    //
    createParent:async (parent:ParentFormData): Promise<{message: string; id: number}> => {
        const response = await api.post("/parents",parent);
        return response.data;
    },
    // 
    updateParent: async (id:number, parent: Partial<ParentFormData>): Promise<{message:string; id: number}> => {
        const response = await api.put(`parents/${id}`,parent);
        return response.data;
    },
    // delete
    deleteParent: async (id:number): Promise<{message: string; id:number}> =>{
        const response = await api.delete(`/parents/${id}`);
        return response.data
    },
    // get children of parent
    getParentChildren: async (parentId: number): Promise<Child[]> => {
        const response = await api.get(`/parents/${parentId}/children`);
        return response.data.children;
    },
    
};
