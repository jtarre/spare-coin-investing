var set_recurring_purchase = function set_recurring_purchase(app) {
    app.post('/set_recurring_purchase', function(req, res) {
        // TODO: set this fucker up
        
        // this is a save to firebase. 
        // this isn't actually a purchase on coinbase or a plaid call. 
        
        // i don't actually know how this will look
        // do i run a cron job that runs every day and checks for jobs that should run
        // do i set up a background job to go off at a specific time for each purchase?
        
    });
}