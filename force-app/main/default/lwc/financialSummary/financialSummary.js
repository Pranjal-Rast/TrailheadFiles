import { LightningElement } from 'lwc';


export default class FinancialSummary extends LightningElement {
    
    Updateddate;
    MarginAmount;
    renderedCallback(){
        var today = new Date();
        var date = String((today.getMonth()+1)+'/'+today.getDate()+"/"+today.getFullYear());
        var time = String(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        var dateTime = date+' '+time;
        this.Updateddate = "Updated " + dateTime;
    }   
    refreshHandler(event)
    {
        event.preventDefault();
        var today = new Date();
        var date = String((today.getMonth()+1)+'/'+today.getDate()+"/"+today.getFullYear());
        var time = String(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        var dateTime = date+' '+time;
        this.Updateddate = "Updated " + dateTime;
    }
    get MarginColor()
    {
         return `slds-text-align_right ${this.MarginAmount >= 0 ?
            'slds-text-color_success':'slds-text-color_error'}` ;
    }
    
}