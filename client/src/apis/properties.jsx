import axios from '../axios.jsx'


export const apiGetProperties = (params) => axios({
    url: "/properties/",
    method: "get",
    params
})
export const apiGetDetailProperty = (id) => axios({
    url: "/properties/one/" + id,
    method: "get",

})