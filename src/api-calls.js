function fetchApiData(url) {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status + " " + response.statusText)
        } else {
            return response.json()
        }
    })
}


const fetchAll = () => {
return Promise.all([
    fetchApiData(`http://localhost:3001/api/v1/customers`), 
    fetchApiData('http://localhost:3001/api/v1/bookings'), 
    fetchApiData('http://localhost:3001/api/v1/rooms'),
    ])
};


export { fetchAll };

