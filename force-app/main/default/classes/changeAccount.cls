public with sharing class changeAccount {
    @AuraEnabled
    public static Id changeAcc(String Accname)
    {
        Account acc = new Account();
        acc.name = accname;
        insert acc;
        return acc.id;
    }
}