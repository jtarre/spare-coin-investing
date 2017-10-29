var get_access_token = function get_access_token(app) {
    app.get('/get_access_token', function(req, res) {
        res.json({
            access_token: PLAID_ACCESS_TOKEN
        });
    });
}

module.exports = get_access_token;