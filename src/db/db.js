import axios from "axios";

export async function getCategories() {
    // const token = localStorage.getItem('auth-token');
    // console.log(token);
    axios({
        method: "get",
        url: "http://localhost:8000/getCategories",
    }).then(function (response) {
        console.log(response.data);
    });
}