import { LightningElement } from 'lwc';
export default class Clipboard extends LightningElement {
    handler(event)
    {
        let element = this.template.querySelector('input');
        element.select();
        document.execCommand('copy');
        // navigator.clipboard.writeText(element).then(() =>{
        //     console.log("copy")
        // })
        // .error(()=>{
        //     console.log("error")
        // })
        console.log(element.innerHTML);
    }
    
}