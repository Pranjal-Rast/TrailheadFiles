import { LightningElement,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class clone_Record extends NavigationMixin(LightningElement) {
    @api recordId;

    navigateToForm(event)
    {
        // console.log("Record ID: "+this.recordId);
        event.preventDefault();
        let componentDef = {
            componentDef: "c:relatedRadioOptions",
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