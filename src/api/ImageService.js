import axios from 'axios';

export default class ImageService {
    static async getImage() {
        let response

        try {
            response = await axios.get('https://random.dog/woof.json')
        } catch (e) {
            console.log(e)
        }

        return response
    }
}