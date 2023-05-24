public class CaseFetch {
    @AuraEnabled(cacheable = 'true')
	public static List<Case> FetchParentCases(id recordId)
    {
     	List<case> caseList = [Select Id,CaseNumber from case where accountid = :recordid AND parentId = Null];
        system.debug('record id in FetchParentCases::::: '+ recordId);
        return caselist;
      
    }
    //changes
    //chnages1
    @AuraEnabled
    public static List<Case> FetchChildCase(string recordId)
    {
        //set<id> caseidset= new set<id>();
        //List<case> caseList = [Select Id,CaseNumber from case where accountid = :recordid AND parentId = Null];
        //for(case i: caseList)
        //{
        //    caseidset.add(i.id);
        //}
        List<case> caseList1 = [Select Id,CaseNumber,ParentId from case where parentId =:recordId];
        system.debug('record id in FetchMapCase::::: '+ recordId);
        return caseList1;
    }
    
    //@AuraEnabled
    //public static Map<Case,List<Case>> FetchChildParentMap(id recordId)
    //{
      //  Map<Case,List<Case>> ChildvsParent= new Map<Case,List<Case>>();
      //  List<Case> caselistparent = [Select Id,CaseNumber from case where accountid = :recordid AND parentId = Null];
      //  for( case i : caselistparent)
      //  {
       //     List<Case> innerlist = [Select Id,CaseNumber from case ]
     //   }
   // }
}