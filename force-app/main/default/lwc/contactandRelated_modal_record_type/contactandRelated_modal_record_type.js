import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class ContactandRelated_modal_record_type extends NavigationMixin(LightningElement) {
    @api contactid;
    value ;
    get options() {
        return [
            { label: 'First Type', value: '0125h000000zLhfAAE' },
            { label: 'Second Type', value: '0125h000000zLhpAAE' },
        ];
    }
    contactid;
    changeHandler(event)
    {
        this.value = event.detail.value;
    }
    handleNext(event)
    {
        console.log("i am in handleNext");
        console.log("contactId :::::::"+this.contactid);
        event.preventDefault();
        let componentDef = {
            componentDef: "c:ContactandRelated_modal2",
            attributes:{
                label : 'Navigate to another form of contact Related',
                contactid : this.contactid ,
                recordtypeId : this.value
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