import { LightningElement } from 'lwc';

export default class SetterCompParent extends LightningElement {
    userDetails = {
        name:"salesforcetroop",
        age:25
    }
    stri = JSON.stringify(this.userDetails);
}