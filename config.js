var config = function config() {
    if(APP_ENV === "c9")
        process.env.SERVER_URL = "localhost:8080";
    else if(APP_ENV === "production")
        process.env.SERVER_URL = process.env.SCI_SERVER_URL;
    else
        process.env.SERVER_URL = "localhost:3000";
}

module.exports = config;