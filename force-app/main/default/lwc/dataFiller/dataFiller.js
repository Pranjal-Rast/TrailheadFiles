import { LightningElement, track } from 'lwc';
export default class DataFiller extends LightningElement {
   name;
   phone;
   country;
  @track data = [{'id': 0, 
      'name': "pranjal", 
      'phone': "1234", 
      'country': "rastogi"}];
  @track columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Phone', fieldName: 'phone' },
    { label: 'Country', fieldName: 'country' }
  ];

  id = 0;

  handleNameChange(event) {
    this.name = event.target.value;
  }

  handlePhoneChange(event) {
    this.phone = event.target.value
  }

  handleCountryChange(event) {
    this.country = event.target.value
  }
  //console.log(''+this.country);
  handleClick(){
     this.id++;
        let rowData = {
            'id': this.id,
            'name': this.name,  
            'phone': this.phone,
            'country': this.country
        };
        
        this.name = '';
        this.phone = '';
        this.country = '';
    this.data = [...this.data,rowData];
    
    //try{
    // this.data.push({ 
    //   'id': this.id, 
    //   'name': this.name, 
    //   'phone': this.phone, 
    //   'country': this.country
    //   });

    //}
    /*catch(error){
    console.log(error.body.message)
    }*/
    console.log(JSON.stringify(this.data));
    // this.name = '';
    // this.phone = '';
    // this.country = '';
  }
}