import { LightningElement, wire, track } from 'lwc';
import retrieveAccounts from '@salesforce/apex/DataController.retrieveAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'BillingCity', fieldName: 'BillingCity', type: 'Text' },
    { label: 'BillingCountry', fieldName: 'BillingCountry' },
];

export default class PreselectedLWCDatatable extends LightningElement {
    @track data;
    @track error;
    @track columns = columns;
    @track preSelectedRows =['0015h00000zG0wJAAS','0015h00000zG03HAAS'];

    @wire(retrieveAccounts)
    wiredAccount({ error, data }) {
        if (data) {
            this.data = data;
            // this.preSelectedRows = 
            // data.forEach(currentItem => {
            //     this.preSelectedRows.push(currentItem.Id);
            // });
            console.log("preslection:::"+this.preSelectedRows);

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
}