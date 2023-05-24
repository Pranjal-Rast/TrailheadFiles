import { LightningElement,api } from 'lwc';
//import createRelated from '@salesforce/apex/Fetch_Contact_Related.createRelated';
import { NavigationMixin } from 'lightning/navigation'
export default class ContactandRelated_modal2 extends NavigationMixin(LightningElement) {
    @api contactid;
    @api recordtypeId;
     renderedCallback() {
        console.log("value of value:::::::::::::"+this.recordtypeId);   
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                if(field.fieldName == 'ContactId__c')
                    field.value = this.contactid ;
                if(field.fieldName == 'RecordTypeId')
                    field.value = this.recordtypeId;
                
            });
        }
        
    }
    onSubmitHandler(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    handleSuccess(event){
        //const updatedRecordId = event.detail.id;
        // Generate a URL to a User record page
        console.log('==============record id::::', event.detail.id);
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                actionName: 'view',
            },
        });
     }
}