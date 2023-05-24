import { LightningElement,track } from 'lwc';
export default class PostUpDownVote extends LightningElement {
    @track count = 0;
    handleUp()
    {
        this.count = this.count+1;
    }
    handleDown()
    {
        this.count = this.count-1;
    }
}