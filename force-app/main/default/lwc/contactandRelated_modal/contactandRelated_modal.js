import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class ContactandRelated_modal extends NavigationMixin(LightningElement) {
    @api accountId;
     renderedCallback() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                if(field.fieldName == 'AccountId')
                    field.value = this.accountId ;
                
            });
        }
    }
    onSubmitHandler(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        // fields.forEach(field => {
        //         if(field.fieldName == 'Account Name')
        //             field.value = this.accountId;
        //     });
        //event.detail.field.AccountId = this.accountId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    contactid;
    successHandler(event)
    {
        event.preventDefault();
        console.log("i am in successhandler");
        this.contactid = event.detail.id;
        console.log("contactId :::::::"+this.contactid);
        event.preventDefault();
        let componentDef = {
            componentDef: "c:ContactandRelated_modal_record_type",
            attributes:{
                label : 'Navigate to another form of contact Related',
                contactid : this.contactid 
            }
        };
        let encodedComponentDef = btoa(JSON.stringify(componentDef));

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage' , 
            attributes :{
                url : '/one/one.app#' + encodedComponentDef
            }
        });
    }
}