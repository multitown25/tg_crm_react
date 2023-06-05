export async function getCategories() {
    const token = localStorage.getItem('auth-token');
    console.log(token);
    const categories = await fetch('5.101.51.105/api/category', {
        method: 'GET',
        headers:  {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(categories);
    return categories;
}