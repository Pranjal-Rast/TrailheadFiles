public with sharing class CloneRecordClass {
    @auraenabled
	public static id createRelated(id recordId ,id newRecordId)
    {
        List<OpportunityLineItem> newRelProducts = new List<OpportunityLineItem>();
        List<OpportunityLineItem> relProducts = new List<OpportunityLineItem>([Select Name , Product2Id , ServiceDate, Discount,ProductCode,UnitPrice,Quantity,Subtotal,TotalPrice,product2.name,OpportunityId,ListPrice,Description from opportunitylineitem where OpportunityID=:recordId]);
        for(OpportunityLineItem i: relProducts)
        {
            i.Opportunityid = newRecordId;
            newRelProducts.add(i);
        }
        insert newRelProducts;
        return newRecordId;
    }
    
}