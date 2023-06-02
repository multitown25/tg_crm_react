export async function getCategories() {
    const categories = await fetch('http://localhost:5000/api/category');
    console.log(categories);
    return categories;
}