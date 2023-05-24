import { LightningElement, api , track } from 'lwc';
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPPORTUNITY_CLOSE_DATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import OPPORTUNITY_STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class RecordViewForm extends LightningElement {
  @api recordId;

  @track fields = [
    OPPORTUNITY_NAME_FIELD,
    OPPORTUNITY_AMOUNT_FIELD,
    OPPORTUNITY_CLOSE_DATE_FIELD,
    OPPORTUNITY_STAGE_FIELD
  ];

  
}