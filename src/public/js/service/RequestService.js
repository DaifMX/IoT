export default class RequestService {
    BASE_URL = document.querySelector('meta[name="api-base-url"]').getAttribute('content');

    axiosInstance = axios.create({
        baseURL: this.BASE_URL,
        timeout: 1500,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    
    get (url){
        try {
            return this.axiosInstance.get(url);
        } catch (err){
            console.error(err.message);
        }
        
    };
    
    post (url, body){
        try {
            return this.axiosInstance.post(url, body);
        
        } catch (err){
            console.error(err.message);
        }
    };

    postForm (url, body,config){
        try {
            return this.axiosInstance.postForm(url, body, config);
        
        } catch (err){
            console.error(err.message);
        }
    };

    delete (url, body){
        try {
            return this.axiosInstance.delete(url, body)
        } catch (err){
            console.error(err.message);
        }
    };
};