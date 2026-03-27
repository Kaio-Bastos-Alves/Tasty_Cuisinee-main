import axios from 'axios'

const API_URL = 'http://localhost:8080/api/items'

export default {
  getAllItems: () => axios.get(API_URL),
  getItemById: (codUser: string) => axios.get(`${API_URL}/${codUser}`),
  createItem: (data: any) => axios.post(API_URL, data),
  updateItem: (id: string, data: any) => axios.put(`${API_URL}/${id}`, data),
  deleteItem: (id: string) => axios.delete(`${API_URL}/${id}`)
}