import axios from '../axios.jsx'


export const apicreateNewPropertyType = (data) => axios({
    url: "/property-type/",
    method: "post",
    data
})
export const apiGetPropertyType = (params) => axios({
    url: "/property-type/",
    method: "get",
    params
})