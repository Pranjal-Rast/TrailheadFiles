import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
//import checkRelated from '@salesforce/apex/CloneRecordClass.checkRelated';

export default class RelatedCheckBoxOptionsOpportunity extends NavigationMixin(LightningElement) {
    @api recordId;
    @api loading = false;
    value = '';
    isProduct;
    isContact;
    result;
    
    // renderedCallback()
    // {
    //     alert("Record id in rederedCallBack:::"+this.recordId);
    // }

     connectedCallback(){
        
      setTimeout(() => {
            alert("Record id In connectedCallback :::::::"+this.recordId);
        }, 5);
        
    
 }


   
    // connectedCallback(){
    //     alert(this.recordId);
    //     //console.log("this is record id:::::::::"+this.recordId);
    //     //this.checkRelatedList();
    // }

    // checkRelatedList(){
    //     checkRelated({
    //         recordId :this.recordId 
    //     })
    //     .then(result => {
    //         console.log('result--'+JSON.stringify(result));
    //         this.result = result;
    //         this.isProduct = result[0];
    //         this.isContact = result[1];
    //         console.log('this.isProduct--'+this.isProduct);
    //         console.log('this.isContact--'+this.isContact);
    //         })
    //     .catch(error => {
    //         this.error = error;
    //     });
    //     }
    get options()
    {
        
        console.log("Record ID IN GET Options :::::::"+this.recordId);
        return [
                    { label: 'Opportunity Product', value: 'Product' },
                    { label: 'Opportunity Contact Role', value: 'Contact_Role' },
                ]; 
        alert("in get options : "+this.recordId);
    }
    // get options() {
    //     if ((this.isProduct == True && this.isContact == True))
    //     {
    //         return [
    //             { label: 'Opportunity Product', value: 'Product' },
    //             { label: 'Opportunity Contact Role', value: 'Contact_Role' },
    //         ];
    //     }
    //     else if((this.isProduct==True && this.isContact == False))
    //     {
    //         return [
    //             { label: 'Opportunity Product', value: 'Product' },
    //         ];
    //     } 
    //     else if((this.isProduct==False && this.isContact == True))
    //     {
    //         return [
    //             { label: 'Opportunity Contact Role', value: 'Contact_Role' },
    //         ];
    //     }
    //     else
    //     {
    //         return [];

    //     }
    // }

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