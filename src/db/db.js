import axios from "axios";

export async function getCategories() {
    // const token = localStorage.getItem('auth-token');
    // console.log(token);
    const categories = await axios({
        method: "get",
        url: "5.101.51.105/api/category",
    });

    console.log(categories);
    console.log(categories.data)
    return await categories.data;
}