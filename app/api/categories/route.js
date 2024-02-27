export async function GET(request) {
    const res = await fetch("http://localhost:3000/api/categories");
    const data = await res.json();

    return Response.json({data})
}