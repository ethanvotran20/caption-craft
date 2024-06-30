export async function GET(req) {
    
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename')
    
    return Response.json('ok');
}