import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const productService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let products = fetch(`${config.apiUrl}/products/productsForClients`, requestOptions).then(handleResponse => handleResponse.json())
    console.log("products: "+ products);
    return products;
}