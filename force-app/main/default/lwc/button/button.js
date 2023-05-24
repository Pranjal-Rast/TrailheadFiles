import { LightningElement,api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

 

export default class SourceLWC extends NavigationMixin(LightningElement) {
    @api recordId;
    navitageToLWCWithoutAura(event) {

        event.preventDefault(); 

        let componentDef = {

            componentDef: "c:html",

            attributes: {

                label: 'Navigated From Another LWC Without Using Aura',
                recordId : this.recordId

            }

        };
        let encodedComponentDef = btoa(JSON.stringify(componentDef));

        this[NavigationMixin.Navigate]({

            type: 'standard__webPage',

            attributes: {

                url: '/one/one.app#' + encodedComponentDef

            }

        });

    }

 

    // navigate to another LWC using Aura

   

}