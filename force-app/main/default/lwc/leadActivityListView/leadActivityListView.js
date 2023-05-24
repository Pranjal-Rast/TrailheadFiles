import { LightningElement,api } from 'lwc';
import fetchEvent from '@salesforce/apex/FetchActivities.fetchEvent';
import fetchTask from '@salesforce/apex/FetchActivities.fetchTask';
export default class LeadActivityListView extends LightningElement {
    @api recordId;
    connectedCallback() {
        fetchEvent({
            recordId :  this.recordId,
        })
        .then(resultEvent =>{
            this.resultEvent = resultEvent;
            console.log("value of resultEvent::::::"+JSON.stringify(this.resultEvent));
        })
        fetchTask({
            recordId :  this.recordId,
        })
        .then(resultTask =>{
            this.resultTask = resultTask;
            console.log("value of resultEvent::::::"+JSON.stringify(this.resultTask));
        })
    }
}