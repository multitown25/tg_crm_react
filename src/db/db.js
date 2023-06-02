export async function getCategories() {
    const token = localStorage.getItem('auth-token');
    console.log(token);
    const categories = await fetch('http://localhost:5000/api/category', {
        method: 'GET',
        headers:  {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(categories);
    return categories;
}