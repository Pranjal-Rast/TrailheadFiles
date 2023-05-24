public class MakePrivateOppExtension {
    public Id RecordId {get;set;}    
    public MakePrivateOppExtension(ApexPages.StandardController Controller){
        // Returns all selected records
        RecordId  = ApexPages.currentPage().getParameters().get('id'); 
        System.debug('RecordId::: '+RecordId);
    }
    public  PageReference updateRecords(){
         RecordId  = ApexPages.currentPage().getParameters().get('id');
        System.debug('RecordId::: '+RecordId);
        if(RecordId != null)
        {
            try
            {
                Opportunity O = [Select id,Isprivate from Opportunity where id =:RecordId];
        		O.IsPrivate = true;
                update o;
            }
            catch(Exception e)
            {
                System.debug('An exception occurred: ' + e.getMessage());
            }
        }
        ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM,'Now Its Private.Thank you!'));
        PageReference pg = new PageReference('/'+RecordId);
        pg.setRedirect(true);
        return pg;  
    }
}