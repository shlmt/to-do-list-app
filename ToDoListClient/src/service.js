import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/item`)    
    return result.data
  },

  addTask: async(name)=>{
    const item ={
      name,
      isCompleted:false
    }
    const result = await axios.post(`${apiUrl}/item`, item)
    return result
  },

  setCompleted: async(id, isComplete)=>{
    await axios.put(`${apiUrl}/item/${id}?isComplete=${isComplete}`)
    return {}
  },

  deleteTask: async(id)=>{
    await axios.delete(`${apiUrl}/item/${id}`)
  }
}
