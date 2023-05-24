import { LightningElement,api,wire } from 'lwc';
import FetchParentCases from '@salesforce/apex/CaseFetch.FetchParentCases';

export default class Cases_and_child_cases extends LightningElement {
    @api recordId;
    ParentCases=[];
    // connectedCallback()
    // {
       
    // }
    // @wire(FetchParentCases,{
    //     recordId:'$recordId'
    // })ParentCases({data,error})
    // {
    //     if(data)
    //     {
    //        console.log("CasesMap inside:::::::"+JSON.stringify(data));
    //     }
    // }

    // @wire(FetchMapCase,{
    //    recordid : '0015h00000zG343AAC'
    // })CasesMap;

    connectedCallback()
    {
        FetchParentCases({
            recordId : this.recordId
        }).then(ParentCases =>{
            this.ParentCases  = ParentCases;
            console.log("Parent Cases inside:::::::"+this.ParentCases);
        });
        console.log("Parent Cases outside:::::::"+this.ParentCases);
    }

}