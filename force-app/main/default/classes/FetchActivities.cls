public class FetchActivities {
	@auraEnabled
    public static List<event> fetchEvent(id recordId)
    {
        List<event> eventList = [Select id,Whoid,whatid,AccountId from event where whoid=:recordid];
        return eventList;
    }
    
    @auraEnabled
    public static List<Task> fetchTask(id recordId)
    {
        List<Task> taskList = [Select id,whoId,whatId,AccountId from task where whoId=:recordId];
        return taskList;
    }
}