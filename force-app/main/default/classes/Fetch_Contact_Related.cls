public class Fetch_Contact_Related {
	
    @AuraEnabled
    public static Id fetchid(string record_Type)
    {
        RecordType Recordtyperecord = [Select id from RecordType where Name=:record_Type];
        return Recordtyperecord.id;
    }
}