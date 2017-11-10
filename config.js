var server_url = function server_url() {
    console.log('--- Config ---');
    console.log('node environment', process.env.NODE_ENV);
    var server_url = "";
    if(process.env.NODE_ENV === "c9")
        server_url = "localhost:8080";
    else if(process.env.NODE_ENV === "production")
        server_url = process.env.SCI_SERVER_URL;
    else
        server_url = "localhost:3000";   

    console.log('server_url:', server_url);
    return server_url; 
}

var config = {
    server_url: server_url()
}

module.exports = config;