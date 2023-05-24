import { LightningElement,api } from 'lwc';
import FetchChildCase from '@salesforce/apex/CaseFetch.FetchChildCase';
export default class ShowChildCases extends LightningElement {
    @api parent;
    ChildCases;
    connectedCallback() {
        console.log("Parent id in subcomponent::::"+this.parent);
        FetchChildCase({
            recordId : this.parent
        }).then(ChildCases =>{
            this.ChildCases  = ChildCases;
            console.log("childCases inside subcomponent:::::::"+this.ChildCases);
        });
        
    }
}