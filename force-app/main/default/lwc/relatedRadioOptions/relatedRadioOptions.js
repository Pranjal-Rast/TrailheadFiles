import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class RelatedRadioOptions extends NavigationMixin(LightningElement) {
    @api recordId;
    @api loading = false;
    value = '';

    get options() {
        return [
            { label: 'Opportunity Product', value: 'Product' },
            { label: 'Opportunity Contact Role', value: 'Contact_Role' },
        ];
    }
    oncancelhandler(event)
    {
        this.loading = true;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
        this.loading = false;
    }
    navigateToForm(event)
    {
        // console.log("Record ID: "+this.recordId);
        event.preventDefault();
        let componentDef = {
            componentDef: "c:cloneForm",
            attributes:{
                label : 'Navigate to another lwc without aura',
                recordId : this.recordId 
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