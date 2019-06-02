var userId =  apim.getvariable('oauth.resource-owner') || null;

if (userId ) {
    var requestId = apim.getvariable('request.headers.x-request-id');

    if (!requestId ) {
        apim.error('Error', 500, 'Validation Error', 'Missing X-Request-ID');
    } else {
        var operationId = apim.getvariable('api.operation.id');
        if (operationId != 'createConsent') {
            var oauthConsentId = apim.getvariable('oauth.miscinfo').split(':')[1];
            var consentId = apim.getvariable('request.headers.consent-id');

            if (!consentId ) {
                apim.error('Error', 500, 'Validation Error', 'Missing Consent-ID');
            } else if (oauthConsentId != consentId) {
                apim.error('Error', 500, 'Runtime Error', 'Mismatch Consent-ID');
            }
        }
    }
}
else {
    apim.setvariable('oauth.resource-owner', "", "set")
}
