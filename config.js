const server_url = () => {
    console.log('--- Config ---');
    console.log('node environment', process.env.NODE_ENV);
    let server_url;
    if(process.env.NODE_ENV === "c9")
        server_url = "localhost:8080";
    else if (process.env.NODE_ENV === "local")
        server_url = "http://localhost:3000";
    else
        server_url = process.env.SCI_SERVER_URL;

    console.log('server_url:', server_url);
    return server_url; 
}

const config = {
    server_url: server_url()
}

module.exports = config;