import { LightningElement } from 'lwc';
export default class P2cParentComponent extends LightningElement {
message = 'Happy To Meet You My Child - Parent Component';

handlechange(event)
{
    this.message = event.target.value;
}
}