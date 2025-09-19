import axios from "axios";

const API_URL = "http://localhost:3000/user"; // NestJS endpoint

// CREATE
export const createUser = (data) => axios.post(API_URL, data);

// READ
export const getUsers = () => axios.get(API_URL);
export const getUser = (id) => axios.get(`${API_URL}/${id}`);

// UPDATE
export const updateUser = (id, data) => axios.patch(`${API_URL}/${id}`, data);

// DELETE
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
