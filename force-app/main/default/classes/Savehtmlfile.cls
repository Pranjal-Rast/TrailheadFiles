public with sharing class Savehtmlfile {
@Auraenabled(cacheable=true)
    public static list<Save_HTML_File__c> getHtmlrecord(){
        return [select htmlvalue__c from Save_HTML_File__c];
    }
}