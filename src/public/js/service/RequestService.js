export default class RequestService {
    BASE_URL = document.querySelector('meta[name="api-base-url"]').getAttribute('content');

    axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 1500,
        headers: {'Content-Type': 'text/html; charset=utf-8', 'Content-Type' : 'application/json'},
    });

    constructor(tokenInterceptor = true){
        if(!tokenInterceptor){
            this.axiosInstance.interceptors.request.use(config => {
                const token = getCookie('token');
                if (token) return config.headers.Authorization = `Bearer ${token}`;
    
            }, error => {
                return Promise.reject(error);
            });
        }
    };
    
    get (url){
        try {
            return this.axiosInstance.get(url);
        } catch (err){

        }
        
    };
    
    post (url, body){
        try {
            return this.axiosInstance.post(url, body);
        
        } catch (err){

        }
    };

    delete (url, body){
        try {
            return this.axiosInstance.delete(url, body)
        } catch (err){

        }
    };
};