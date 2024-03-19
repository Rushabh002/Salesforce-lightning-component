import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createSignUp from '@salesforce/apex/SignUpController.createSignUp';

export default class SignUpForm extends LightningElement {
    @track firstName;
    @track lastName;
    @track email;
    @track role;
    @track company;
    @track country;
    @track postalCode;
    @track username;

    @track roleOptions = [
        { label: 'Developer', value: 'Developer' },
        { label: 'Architect/CTO', value: 'Architect/CTO' },
        { label: 'Administrator', value: 'Administrator' },
        { label: 'IT Manager/Executive', value: 'IT Manager/Executive' },
        { label: 'Business Manager/Executive', value: 'Business Manager/Executive' }
    ];

    @track countryOptions = [
        { label: 'Afghanistan', value: 'Afghanistan' },
        { label: 'Algeria', value: 'Algeria' },
        { label: 'Angola', value: 'Angola' },
        { label: 'Antarctica', value: 'Antarctica' },
        { label: 'Armenia', value: 'Armenia' },
        { label: 'Azerbaijan', value: 'Azerbaijan' },
        { label: 'Bangladesh', value: 'Bangladesh' },
        { label: 'Benin', value: 'Benin' },
        { label: 'Bhutan', value: 'Bhutan' },
        { label: 'Botswana', value: 'Botswana' },
        { label: 'Bouvet Island', value: 'Bouvet Island' },
        { label: 'Brunei Darussalam', value: 'Brunei Darussalam' },
        { label: 'Burkina Faso', value: 'Burkina Faso' },
        { label: 'Burundi', value: 'Burundi' },
        { label: 'Cabo Verde', value: 'Cabo Verde' },
        { label: 'Cambodia', value: 'Cambodia' },
        { label: 'Cameroon', value: 'Cameroon' },
        { label: 'Central African Republic', value: 'Central African Republic' },
        { label: 'Chad', value: 'Chad' },
        { label: 'China', value: 'China' },
        { label: 'Comoros', value: 'Comoros' },
        { label: 'Congo', value: 'Congo' },
        { label: 'Congo, Democratic Republic of the', value: 'Congo, Democratic Republic of the' },
        { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
        { label: 'Djibouti', value: 'Djibouti' },
        { label: 'Egypt', value: 'Egypt' },
        { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
        { label: 'Eritrea', value: 'Eritrea' },
        { label: 'Eswatini', value: 'Eswatini' },
        { label: 'Ethiopia', value: 'Ethiopia' },
        { label: 'French Southern Territories', value: 'French Southern Territories' },
        { label: 'Gabon', value: 'Gabon' },
        { label: 'Gambia', value: 'Gambia' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Ghana', value: 'Ghana' },
        { label: 'Guinea', value: 'Guinea' },
        { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
        { label: 'Heard Island and McDonald Islands', value: 'Heard Island and McDonald Islands' },
        { label: 'Hong Kong', value: 'Hong Kong' },
        { label: 'India', value: 'India' },
        { label: 'Indonesia', value: 'Indonesia' },
        { label: 'Japan', value: 'Japan' },
        { label: 'Kazakhstan', value: 'Kazakhstan' },
        { label: 'Kenya', value: 'Kenya' },
        { label: "Korea, Democratic People's Republic of", value: "Korea, Democratic People's Republic of" },
        { label: 'Korea, Republic of', value: 'Korea, Republic of' },
        { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
        { label: "Lao People's Democratic Republic", value: "Lao People's Democratic Republic" },
        { label: 'Lesotho', value: 'Lesotho' },
        { label: 'Liberia', value: 'Liberia' },
        { label: 'Libya', value: 'Libya' },
        { label: 'Madagascar', value: 'Madagascar' },
        { label: 'Malawi', value: 'Malawi' },
        { label: 'Malaysia', value: 'Malaysia' },
        { label: 'Maldives', value: 'Maldives' },
        { label: 'Mali', value: 'Mali' },
        { label: 'Mauritania', value: 'Mauritania' },
        { label: 'Mauritius', value: 'Mauritius' },
        { label: 'Mayotte', value: 'Mayotte' },
        { label: 'Macao', value: 'Macao' },
        { label: 'Morocco', value: 'Morocco' },
        { label: 'Mozambique', value: 'Mozambique' },
        { label: 'Myanmar', value: 'Myanmar' },
        { label: 'Namibia', value: 'Namibia' },
        { label: 'Nepal', value: 'Nepal' },
        { label: 'Niger', value: 'Niger' },
        { label: 'Nigeria', value: 'Nigeria' },
        { label: 'Pakistan', value: 'Pakistan' },
        { label: 'Philippines', value: 'Philippines' },
        { label: 'Réunion', value: 'Réunion' },
        { label: 'Rwanda', value: 'Rwanda' },
        { label: 'Saint Helena, Ascension and Tristan da Cunha', value: 'Saint Helena, Ascension and Tristan da Cunha' },
        { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
        { label: 'Senegal', value: 'Senegal' },
        { label: 'Seychelles', value: 'Seychelles' },
        { label: 'Sierra Leone', value: 'Sierra Leone' },
        { label: 'Singapore', value: 'Singapore' },
        { label: 'Somalia', value: 'Somalia' },
        { label: 'South Africa', value: 'South Africa' },
        { label: 'South Georgia and the South Sandwich Islands', value: 'South Georgia and the South Sandwich Islands' },
        { label: 'South Sudan', value: 'South Sudan' },
        { label: 'Sri Lanka', value: 'Sri Lanka' },
        { label: 'Sudan', value: 'Sudan' },
        { label: 'Taiwan', value: 'Taiwan' },
        { label: 'Tajikistan', value: 'Tajikistan' },
        { label: 'Tanzania, United Republic of', value: 'Tanzania, United Republic of' },
        { label: 'Thailand', value: 'Thailand' },
        { label: 'Timor-Leste', value: 'Timor' },
        { label: 'Togo', value: 'Togo' },
        { label: 'Turkmenistan', value: 'Turkmenistan' },
        { label: 'Uganda', value: 'Uganda' },
        { label: 'Uzbekistan', value: 'Uzbekistan' },
        { label: 'Viet Nam', value: 'Viet Nam' },
        { label: 'Zambia', value: 'Zambia' },
        { label: 'Zimbabwe', value: 'Zimbabwe' }
        
    ];

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleRoleChange(event) {
        this.role = event.target.value;
    }

    handleCompanyChange(event) {
        this.company = event.target.value;
    }

    handleCountryChange(event) {
        this.country = event.target.value;
    }

    handlePostalCodeChange(event) {
        this.postalCode = event.target.value;
    }

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    createSignUp() {
        createSignUp({ 
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            company: this.company,
            country: this.country,
            postalCode: this.postalCode,
            username: this.username
        })
        .then(result => {
            const event = new ShowToastEvent({
                title: 'User Registered',
                message: 'New User created.',
                variant: 'success'
            });
            this.dispatchEvent(event);
            this.resetForm();
        })
        .catch(error => {
            const event = new ShowToastEvent({
                title : 'Error',
                message : 'Error creating contact. Please Contact System Admin',
                variant : 'error'
            });
            this.dispatchEvent(event);
        });
    }
    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.role = '';
        this.company = '';
        this.country = '';
        this.postalCode = '';
        this.username = '';
 }
}