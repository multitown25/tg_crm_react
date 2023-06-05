import axios from "axios";

export async function getCategories() {
    // const token = localStorage.getItem('auth-token');
    // console.log(token);
    const categories = await axios({
        method: "get",
        url: "http://localhost:8000/getCategories",
    });

    return await categories.data;
}