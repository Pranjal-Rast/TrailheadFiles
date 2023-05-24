/*global class BatchAssignCasesByEmail implements Database.Batchable<sObject>, Database.Stateful{
    global Database.QueryLocator  start (Database.BatchableContext BC) {
        QueueSobject Queue = [Select Id,QueueId from QueueSobject where Queue.Name = 'Support Team'];
        return Database.getQueryLocator('Select Id,ownerId from Case Where Owner.Name =\'Support Team\'');
    }
    
    global void execute (Database.BatchableContext bc , list<Case> listOfCases){
        map<Id,List<Case>> mapOwnerIdVsCasesList = new map<Id,List<Case>>();
        Integer limitOfCases = 10;
        List<string> ListOfusers = new list<string>{'Pranjal Rastogi','Shivam Saini','Manish Tripathi','Sandeep Singh','Bhavya Bhasin'};
        List<user> UserList = [Select id from user where Name IN: ListOfusers];
        if(listOfCases.size() >= ListOfusers.size()*limitOfCases)
        {
            for(Integer i =0;i<UserList.size();i++)
            {
                id ownerId = UserList[i].Id;
                for(integer j = i*limitOfCases ; j < (i+1)*limitOfCases;j++ )
                {
                    listOfCases[j].OwnerId = ownerId;
                }
            }
        }
        else
        {
            integer casesToAssignPerUser = Integer.valueOf(listOfCases.size()/ListOfusers.size());
            system.debug('casesToAssignPerUser:::'+casesToAssignPerUser);
            for(Integer i =0;i<UserList.size();i++)
            {
                id ownerId = UserList[i].Id;
                //system.debug(i+'-'+UserList[i].Name);
                for(integer j = i*casesToAssignPerUser;j<(i+1)*casesToAssignPerUser;j++)
                {
                    listOfCases[j].OwnerId = ownerId;
                }
            }   
        }
        system.debug('listOfCases:::'+listOfCases);
        update listOfCases;
    }
        global void finish(Database.BatchableContext bc){}  
 }
	*/
global class AssignCasesBatch implements Database.Batchable<SObject> {
    
    global Database.QueryLocator start(Database.BatchableContext BC) {
        // Get all active cases assigned to the Support Team queue
        return Database.getQueryLocator([
            SELECT Id, OwnerId 
            FROM Case 
            WHERE IsClosed = false AND OwnerId = :QueueId
            ORDER BY CreatedDate DESC
        ]);
    }
    global void execute(Database.BatchableContext BC, List<Case> scope) {
        List<User> users = [SELECT Id, Name FROM User WHERE IsActive = true AND Name IN ('Pranjal Rastogi', 'Bhavya Bhasin', 'Shivam Saini', 'Manish Tripathi', 'Sandeep Singh') ORDER BY Name ASC];
        Integer userCount = users.size();
        Integer userIndex = 0;
        Map<Id, List<Case>> casesByUser = new Map<Id, List<Case>>();
        
        // Group cases by owner
        for (Case c : scope) {
            if (!casesByUser.containsKey(users[userIndex].Id)) {
                casesByUser.put(users[userIndex].Id, new List<Case>());
            }
            casesByUser.get(users[userIndex].Id).add(c);
            
            userIndex++;
            if (userIndex == userCount) {
                userIndex = 0;
            }
        }
        
        // Assign cases to users in batches of 10
        List<Case> casesToUpdate = new List<Case>();
        Integer limitOfCases = 10;
        for (Id userId : casesByUser.keySet()) {
            List<Case> cases = casesByUser.get(userId);
            Integer casesToAssign = limitOfCases - [SELECT COUNT() FROM Case WHERE IsClosed = false AND OwnerId = :userId];
            casesToAssign = Math.min(casesToAssign, cases.size());
            
            for (Integer i = 0; i < casesToAssign; i++) {
                Case c = cases.remove(0);
                c.OwnerId = userId;
                casesToUpdate.add(c);
            }

        }
        update casesToUpdate;
    }
    
    global void finish(Database.BatchableContext BC) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[]{'pranjalrave@gmail.com'};
        mail.setToAddresses(toAddresses);
        mail.setSubject('Assign Cases Batch Job Completed');
        mail.setPlainTextBody('The Assign Cases batch job has completed successfully.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
    }
    
    // Replace the ID with your Support Team Queue Id
    private static String QueueId = '00G5h000000wvA1EAI';
}