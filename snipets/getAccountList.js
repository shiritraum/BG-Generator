var userId = "";
if (apim.getvariable('request.authorization')) {
    userId = apim.getvariable('oauth.resource-owner');
}

apim.readInputAsJSON(function(err, bankData) {
    var result = {};
    try {
        var myAccountsInfo = bankData.allAccounts.find(item => item.id === userId);
        result = myAccountsInfo.accountsData;

        if (!result) {
            result = {};
        }
    } catch (e) {
        console.error(e);
        
        result = {};
    }

    apim.output('application/json');
    session.output.write(result);
});