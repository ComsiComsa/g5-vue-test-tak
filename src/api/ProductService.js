import axios from 'axios';

export default class ProductService {
    static async getProducts(limit = 100) {
        let response

        try {
            response = await axios.get('https://dummyjson.com/products', {
                params: {
                    limit
                }
            })
        } catch (e) {
            console.log(e)
        }

        return response
    }
}