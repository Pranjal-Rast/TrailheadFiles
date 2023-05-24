global class ScheduledBatchAssignCasesByEmail {
	global void execute(SchedulableContext sc) {
      BatchAssignCasesByEmail b = new BatchAssignCasesByEmail(); 
      database.executebatch(b);
   }
}