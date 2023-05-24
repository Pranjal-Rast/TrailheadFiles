import { LightningElement,api,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {getRecord, getFieldValue, updateRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class Popup_con extends NavigationMixin(LightningElement) {
    @api recordId;
    
    handleConfirmation()
    {
        
        let fields = {
                Id: this.recordId,
                sample_component_check__c: true
            }
            const recordInput = { fields };
            updateRecord(recordInput)

            this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}