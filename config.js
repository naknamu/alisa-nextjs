const api = {
    url:    
    process.env.NODE_ENV === "production" ? process.env.API_URL : process.env.API_URL_DEV
}

export default api;