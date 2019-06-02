var accountId = apim.getvariable('request.parameters.account-id');

var userId = "";
if (apim.getvariable('request.authorization')) {
    userId = apim.getvariable('oauth.resource-owner');
}

apim.readInputAsJSON(function(err, bankData) {
    var result = {};
    try {
        var myAccountsInfo = bankData.allAccounts.find(item => item.id === userId);
        var myAccounts = myAccountsInfo.accountsData;
        var reqAccount = myAccounts.accounts.find(item => item.resourceId === accountId);
        result.account = reqAccount;

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
