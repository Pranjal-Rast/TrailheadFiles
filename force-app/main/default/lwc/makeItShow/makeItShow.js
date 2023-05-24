import { LightningElement,api,wire} from 'lwc';
import UpdatePrivateField from '@salesforce/apex/UpdatePrivateFieldOnOpportunity.UpdatePrivateField';
import { NavigationMixin } from 'lightning/navigation';
export default class MakeItShow extends NavigationMixin(LightningElement){
    @api recordId;
   
    renderedCallback(){
        // const style = document.createElement('style');
        // style.innerText = '.modal-glass.slds-backdrop,.modal-header.slds-modal__header{display: none;}';
        // if (this.template.querySelector('.custom-add-promotion-modal'))
        //     this.template.querySelector('.custom-add-promotion-modal').appendChild(style);
        console.log('In render'+this.recordId);
        if(this.recordId != undefined)
        {
            UpdatePrivateField({   
            recordId : this.recordId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
        window.location.replace('https://wise-koala-oc4m1z-dev-ed.lightning.force.com/lightning/r/Opportunity/'+this.recordId+'/view')
        //window.location.reload()
        }
        
        
    
        
    }
    // connectedCallback() {
    //     console.log(this.recordId);
        
    // }
}