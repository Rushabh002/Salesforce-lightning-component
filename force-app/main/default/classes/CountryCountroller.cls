public with sharing class CountryCountroller {
    public CountryCountroller() {

    }
    @AuraEnabled(cacheable=true)
    public static List<String> fetchCountryOptions() {
        List<String> countryOptions = new List<String>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.first.org/data/v1/countries');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            Map<String, Object> responseData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> countriesData = (Map<String, Object>) responseData.get('data');
            for (String countryCode : countriesData.keySet()) {
                Map<String, Object> countryData = (Map<String, Object>) countriesData.get(countryCode);
                countryOptions.add((String) countryData.get('country'));
            }
        }
     System.debug(countryOptions);
        return countryOptions;
    }
}