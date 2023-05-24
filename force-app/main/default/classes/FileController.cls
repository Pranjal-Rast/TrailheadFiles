public class FileController {

    @AuraEnabled
    public static Id saveTheFile(Id parentId, String fileName,String data) {
        //base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        ContentVersion cv = new ContentVersion();
        cv.ContentLocation = 'S';
        //cv.ContentDocumentId = contentDocumentId;
        cv.VersionData = blob.valueOf(data);
        cv.Title = fileName;
        cv.PathOnClient = cv.Title + '.html';
        insert cv;
        System.debug('contentDocumentId='+cv.ContentDocumentId);              
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: cv.Id].ContentDocumentId;
        cdl.LinkedEntityId = parentId ;
        cdl.ShareType = 'V';
        insert cdl;

        return cv.Id;
    }

    //@AuraEnabled
    //public static Id showTheFile(Id parentId, String fileName, String data) {        
        //return saveTheFile(parentId, fileName,data);
    //}
}