import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class ContactandRelated extends NavigationMixin(LightningElement) {
    @api recordId;
    // connectedCallback() {
    //     alert("You are in component");
    // }
    handleNewClick(event)
    {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:contactandRelated_modal",
            attributes:{
                label : 'Navigate to record form of contact',
                accountId : this.recordId 
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