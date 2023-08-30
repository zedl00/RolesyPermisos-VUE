import axios from "axios"

export const urlBase = "http://127.0.0.1:8000/api";

const App = () => {
    let token = localStorage.getItem("token");

    const api = axios.create({
        baseURL: urlBase,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' +token
        },
        timeout: 30000
    });

    // error
    api.interceptors.response.use(
        (response) => {
            return response; 
        },
        (error) => {
            if(error.response.status === 401){
                console.log("Interceptor : 401")
            }
            if(error.response.status === 403){
                console.log("Interceptor : 403")
            }
            if(error.response.status === 404){
                console.log("Interceptor : 404")
            }

            return Promise.reject(error)
        }
    )
    return api;
}
export default App;
