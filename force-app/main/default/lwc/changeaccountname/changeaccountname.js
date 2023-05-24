import { LightningElement,api } from 'lwc';
import changeAcc from '@salesforce/apex/changeAccount.changeAcc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class Changeaccountname extends NavigationMixin(LightningElement) {
    accountname;
    @api recordId;
    recordPageUrl;
    results;
    handleInputChange(event)
    {
        this.accountname = event.detail.value;
        //console.log("RecordId:::::::"+this.recordId);
    }
    handleClick(event)
    {
        changeAcc({Accname : this.accountname}
        )
        .then(result => {
            this.result = result;
            this.results = this.result;
        })
        .catch(error => {
            this.error = error;
        }
        );
        const evt =new ShowToastEvent({Title:"Operation Failed!", 
                                       message:"New Account "+this.accountname+" has been created." , 
                                       variant:"Success" , 
                                       mode:"dismissable"});
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Account',
            actionName: 'list'
        },
        state: {       
            filterName: 'Recent' 
        }
            });
        
    }
}