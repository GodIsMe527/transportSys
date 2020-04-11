import axios from 'axios'
const http=axios.create({
    baseURL:process.env.VUE_APP_API_URL||"/app/api"
})
const utils={http}
export default utils