public class ContactDuplicateClass {
    public static void Duplicate()
    {
        List<contact> contactListWithEmail = [Select id,MasterRecordId,Email from contact where Email != null];
        set<string> EmailSet = new set<string>();
        for(contact c:contactListWithEmail)
        {
            EmailSet.add(c.Email);
        }
        map<string,list<contact>> EmailVsContactIdList = new map<string,list<contact>>();
        for(string s:Emailset)
        {
            EmailVsContactIdList.put(s,new List<contact>());
        }
        for(contact c: contactListWithEmail)
        {
            if(EmailVsContactIdList.containsKey(c.email) && EmailVsContactIdList.get(c.email) != null)
            {
                list<contact> variable = EmailVsContactIdList.get(c.email);
                variable.add(c);
                EmailVsContactIdList.put(c.email,variable);
            }
            else{
                list<contact> variable1 = new list<contact>();
                variable1.add(c);
                EmailVsContactIdList.put(c.email,variable1);		
            }
        }
        system.debug('EmailVsContactIdList:::'+EmailVsContactIdList);
        for(string s : EmailVsContactIdList.keyset())
        {
            if(EmailVsContactIdList.get(s).size()<2)
            {
                EmailVsContactIdList.remove(s);
            }
        }
        List<contact> updatelist = new List<contact>();
        for(String s : EmailVsContactIdList.keyset())
        {
            id masterid = EmailVsContactIdList.get(s).get(1).id;
            
            for(contact c : EmailVsContactIdList.get(s))
            {
                if(c.id != masterid)
                {
                   // c.MasterRecordId = masterid;
                }
                updatelist.add(c);
            }
            
        }
        update updatelist;
        
        system.debug('EmailVsContactIdList:::'+EmailVsContactIdList);
    }
}