export const apiHelper = async (method, url, body) => {
    const baseUrl = 'https://private-anon-f475112004-grchhtml.apiary-mock.com';
  
    const options = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
  
    try {
        const response = await fetch(`${baseUrl}/${url}`, options);
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        return data;
    } catch (err) {
        alert(err);
        return null;
    }
};