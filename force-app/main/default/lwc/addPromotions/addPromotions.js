import { LightningElement,api,track,wire } from 'lwc';
import getProducts from '@salesforce/apex/GetRecords.getProducts';
import { NavigationMixin } from 'lightning/navigation';
export default class AddPromotions extends NavigationMixin(LightningElement) {

    @api recordId;
    @track columns = [{
            label: 'Product Name',
            fieldName:'Link',
            type :'url',
            typeAttributes: {label:{fieldName: 'Name'}},
            sortable: true,
            editable: true
        },
        {
            label: 'Product Code',
            fieldName: 'ProductCode',
            type: 'text',
            sortable: true
        },
        {
            label: 'List Price',
            fieldName: 'UnitPrice',
            sortable: true
        },
        {
            label: 'Product Description',
            fieldName: 'Description',
            sortable: true
        },
        {
            label: 'Product Family',
            fieldName: 'Family',
            sortable: true
        }
    ];
    @track error;
    @track prodList ;
    baseData;
    @wire(getProducts,{recordId: '$recordId' , searchString : ''})
    wiredProducts({error,data}) 
    {
        if (data) {
            console.log("data:::"+JSON.stringify(data));
            this.prodList = data.map((row) =>{
                return this.mapData(row);
            });
            this.baseData = this.prodList;
        } else if (error) {
            console.log("error:::"+JSON.stringify(error));
            this.error = error;
        }
    }
    mapData(row)
    {
        var prodFamily = '';
        var prodDescription = '';
        if(row.Product2.Description != undefined){
          prodDescription = `${row.Product2.Description}`;
        }
        if(row.Product2.Family != undefined){
          prodFamily = `${row.Product2.Family}`;
        }
        return {...row,
            Link: `/${row.Product2.Id}`,
            Name: `${row.Product2.Name}`,
            Family: prodFamily,
            UnitPrice : `$${row.UnitPrice}`,
            Description : prodDescription,
            ProductCode : `${row.ProductCode}`,
        }
    }
    async handleSearch(event){
        if(event.target.value == ""){
            this.prodList = this.baseData;
        }else if(event.target.value.length > 1){
            const searchResults = await getProducts({recordId : this.recordId,searchString: event.target.value})

            this.prodList = searchResults.map(row => {
                return this.mapData(row);
            })
        }
    }
    handleNext() {
      var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
      if(selectedRecords.length > 0){
          console.log('selectedRecords are ', selectedRecords);
 
          let ids = '';
          selectedRecords.forEach(currentItem => {
              ids = ids + ',' + currentItem.Id;
          });
          this.selectedIds = ids.replace(/^,/, '');
          this.lstSelectedRecords = selectedRecords;
          alert(this.selectedIds);
      }   
    }
    handleCancel()
    {
        this[NavigationMixin.Navigate]({
           type: 'standard__recordPage',
           attributes: {
               objectApiName: 'Opportunity',
               recordId: this.recordId,
               actionName: 'view'
           },
       });
    }


}