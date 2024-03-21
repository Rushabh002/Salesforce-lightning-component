import { LightningElement, track ,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createSignUp from '@salesforce/apex/SignUpController.createSignUp';
import fetchCountryOptions from '@salesforce/apex/CountryCountroller.fetchCountryOptions';

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

    @track countryOptions;

    @wire(fetchCountryOptions)
    wiredCountryOptions({ error, data }) {
        if (data) {
            this.countryOptions = data.map(country => ({ label: country, value: country }));
        } else if (error) {
            console.error('Error fetching country options:', error);
        }
    }
    
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