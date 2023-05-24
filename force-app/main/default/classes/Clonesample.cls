public class Clonesample {
    public static void cloneRecords()
    {
        Contract con = new Contract();
        con = [Select id,AccountId,EndDate from contract where id='8005h0000000UIfAAM'];
        Contract newCon = con.clone(false,true,false,false);
        insert newCon; 
        
        newCon.StartDate = con.EndDate+1;
        update newCon;
    }
}