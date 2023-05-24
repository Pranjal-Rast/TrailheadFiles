import { LightningElement,track } from 'lwc';
export default class TabsetWithPlus extends LightningElement {
    @track tabs = [{
        id:1,
        value:"1",
        label:"Tab 1",
    },]
    activeTab = "1";
    renderedCallback(){
        this.activeTab = ""+this.tabs.length;
    }
    handlePlus(event)
    {
        this.tabs.push({
            id:this.tabs.length+1,
            value:""+(this.tabs.length+1),
            label:"Tab "+(this.tabs.length+1),
        });
    }
}