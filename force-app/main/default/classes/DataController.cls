public class DataController {
    @AuraEnabled(cacheable=true)
    public static List<Account> retrieveAccounts()
    {
        return [Select Id,Name,Type,BillingCity,BillingCountry from Account];
    }
}