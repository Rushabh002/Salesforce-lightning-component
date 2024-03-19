public with sharing class SignUpController {
    @AuraEnabled
    public static void createSignUp(String firstName, String lastName, String email, String role, String company, String country, Integer postalCode, String username) {
        User_Master__c signUp = new User_Master__c(
            First_Name__c = firstName,
            Last_Name__c = lastName,
            Email__c = email,
            Role__c = role,
            Company__c = company,
            Country_Region__c = country,
            Postal_Code__c = postalCode,
            Username__c = username
        );
        insert signUp;
    }
}
