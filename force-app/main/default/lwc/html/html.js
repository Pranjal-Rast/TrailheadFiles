import { LightningElement,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import saveTheFile from '@salesforce/apex/FileController.saveTheFile'


export default class Html extends NavigationMixin(LightningElement) {
    @api recordId;
    ContentVersion
    ContentDocumentLink
// var re = ;
accnav(){

    this[NavigationMixin.Navigate]({

        type: 'standard__objectPage',

        attributes: {

            objectApiName: 'Save_HTML_File__c',

            actionName: 'list'

        },
        state: {
            filterName: "Recent"
        },
    });
    }
    handleChange(event) {

        this.myVal = event.target.value;

    }

    showmessage(){
    //    if(re.test(this.myVal))
    //    {
        saveTheFile({

            parentId : this.recordId,

            fileName : this.recordId,

            data: this.myVal

        })

        .then(result => {

            this.ContentVersion = result;

        })

        .catch(error => {

            this.error = error;

        }
        );
        alert("File Saved Successfully.");
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Save_HTML_File__c',
                actionName: 'view'
            },
        });
//    }
//    else
//    {
//        alert("Format should be HTML");
//    }

       

    }

   

    }