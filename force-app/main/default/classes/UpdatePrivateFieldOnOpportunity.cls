public class UpdatePrivateFieldOnOpportunity {
    @AuraEnabled
    public static void UpdatePrivateField(Id recordId)
    {
        system.debug(recordId);
        List<Opportunity> O = [Select id,Name,Isprivate from Opportunity where id =:recordId];
        O[0].Name = 'Pranjal';
        update O;
    }
}