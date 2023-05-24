public class GetRecords {
    @auraenabled(cacheable = true)
    public static List<PricebookEntry> getProducts(id recordId,string searchString)
    {
        system.debug('recordid::::'+recordid);
        Opportunity Opp = [Select id,Pricebook2Id from Opportunity where id=:recordId];
        system.debug('Opp'+Opp);
        //List<List<SObject>> employees = [FIND :searchString IN ALL FIELDS RETURNING PricebookEntry(Employee_Id__c, Name, Email__c, Age__c,Gender__c, Phone_Number__c, Department__r.Name)]
        return [Select id,UnitPrice,Product2.Description, Product2.name , Product2.Id , ProductCode,Product2.Family,Pricebook2Id from PricebookEntry  where Pricebook2Id =: Opp.Pricebook2Id AND (Product2.Family LIKE :'%'+searchString+'%' OR Product2.Description LIKE :'%'+searchString+'%' OR Product2.name LIKE: '%'+searchString+'%') ];
    }
}