var RetrieveService = (function () {
    //_queryModel: QueryModel;
    function RetrieveService(retrieveServic) {
        this._retrieveService = retrieveServic;
    }
    RetrieveService.prototype.getObjectAsJson = function (instance, successCallback) {
        this._retrieveService.getObjectInstanceMetadata(instance.StudyInstanceUid, instance.SeriesInstanceUID, instance.SopInstanceUid, function (data, textStatus, jqXHR) {
            successCallback(data);
        });
    };
    RetrieveService.prototype.getStudyAsJson = function (study, successCallback) {
        this._retrieveService.getStudyMetadata(study.StudyInstanceUid, function (data, textStatus, jqXHR) {
            successCallback(data);
        }, function (ev) {
            console.error("getStudyMetadata failed");
        });
    };
    RetrieveService.prototype.DownloadObject = function (instance, successCallback) {
        this._retrieveService.getObjectDicom(instance.StudyInstanceUid, instance.SeriesInstanceUID, instance.SopInstanceUid, function (data, textStatus) {
            successCallback(data);
        }, function (ev) {
            alert("failed: " + ev); //TODO: move to view
        });
    };
    RetrieveService.prototype.DownloadStudy = function (instance, successCallback) {
        this._retrieveService.getStudyDicom(instance.StudyInstanceUid, function (data, textStatus) {
            successCallback(data);
        }, function (ev) {
            alert("failed: " + ev); //TODO: move to view
        });
    };
    return RetrieveService;
})();
