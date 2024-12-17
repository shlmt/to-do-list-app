import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log("error:" + error.message)
})

export default {
  getTasks: async () => {
    const result = await axios.get(`/item`)    
    return result?.data || []
  },

  addTask: async (name) => {
    const item ={
      name,
      isCompleted:false
    }
    const result = await axios.post(`/item`, item)
    return result
  },

  setCompleted: async (id, isComplete) => {
    await axios.put(`/item/${id}?isComplete=${isComplete}`)
    return {}
  },

  deleteTask: async (id) => {
    await axios.delete(`/item/${id}`)
  }
}
