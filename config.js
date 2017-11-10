var config = function config() {
    var SERVER_URL = function set_server_url() {
        if(APP_ENV === "c9")
            return "localhost:8080";
        else if(APP_ENV === "production")
            return = process.env.SCI_SERVER_URL;
        else
            return = "localhost:3000";    
    }
    return {
        SERVER_URL: SERVER_URL
    }
}

module.exports = config;