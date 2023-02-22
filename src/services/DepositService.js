import axios from "axios";

const baseUrl = 'http://localhost:8000/'
export function postDeposit(payload,token) {
    //axios call
    const config = {
        headers: {'x-auth-token': token }
    };
    console.log('token', token, config)

    return axios.post(
        baseUrl+"api/deposit/",
        payload,
        config
    );
}
