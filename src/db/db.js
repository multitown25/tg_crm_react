import axios from "axios";

export async function getCategories() {
    // const token = localStorage.getItem('auth-token');
    // console.log(token);
    axios({
        method: "get",
        url: "http://5.101.51.105/categories",
    }).then(function (response) {
        console.log(response.data);
    });
}