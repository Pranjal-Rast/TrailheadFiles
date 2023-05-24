import FirstName from '@salesforce/schema/Contact.FirstName';
import { LightningElement,api } from 'lwc';
import createRelated from '@salesforce/apex/CloneRecordClass.createRelated';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CloneForm extends NavigationMixin(LightningElement) {
    @api recordId;
    onSubmitHandler(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    oppoid;
    successHandler(event)
    {
        event.preventDefault();
        this.oppoid =event.detail.id;
        const evt = new ShowToastEvent({Title:"Success!", message:"New Clone Opportunity " + this.oppoid + " has been created." , variant:"Success" , mode:"dismissable"});
        this.dispatchEvent(evt);
        createRelated(
            {
                recordId :this.recordId ,
                newRecordId : this.oppoid 
            }
        )
        .then(result => {

            this.result = result;

        })

        .catch(error => {

            this.error = error;

        }
        );
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.oppoid,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
    }
    errorHandler(event)
    {
        // var name =event.details.fields.Name;
        const evt =new ShowToastEvent({Title:"Operation Failed!", message:"Due to some reason clone opportunity has not been created contact the admin." , variant:"Error" , mode:"dismissable"});
        this.dispatchEvent(evt);
    }

}