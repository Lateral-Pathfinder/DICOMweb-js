﻿class WadoUriProxy
{
    private _xhr: XMLHttpRequest;
    private static _QueryParamsFormatted: string = "?RequestType=wado&studyUID={0}&seriesUID={1}&objectUID={2}"

    //returns the DICOM DS 
    getDicomInstance(instanceData: CommonDicomInstanceParams, anonymize: boolean, imageParams: WadoImageParams, successCallback: (buffer: any) => void, failureCallback: (error: ErrorEvent) => void) { 
        this.getObjectInstance(instanceData, MimeTypes.DICOM, imageParams, successCallback, failureCallback)
    } 

     //returns a jpeg image reprenstation of the DICOM image
    getJpegImage(instanceData: CommonDicomInstanceParams, imageParams: WadoImageParams, successCallback: (buffer: any) => void, failureCallback: (error: ErrorEvent) => void)
    {
       this.getObjectInstance(instanceData, MimeTypes.Jpeg, imageParams, successCallback, failureCallback)
    }

    //returns the image data after being decoded
   getUncompressedImage(instanceData: CommonDicomInstanceParams, imageParams: WadoImageParams, successCallback: (buffer:ArrayBuffer)=>void, failureCallback:(error:ErrorEvent)=>void)
   {
        this.getObjectInstance ( instanceData, MimeTypes.UncompressedData, imageParams, successCallback, failureCallback)
   }

   getObjectInstance
       (instanceData: CommonDicomInstanceParams,
           mimeType: string,
           imageParams: WadoImageParams,
           successCallback: (buffer: any) => void,
           failureCallback: (error: Event) => void
       )
   {
       var url = this.createUrl(instanceData, mimeType, imageParams);
       var xhr = new XMLHttpRequest();
       
       xhr.overrideMimeType("application/octet-stream");
       xhr.open("GET", url, true);
       xhr.responseType = "arraybuffer";
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4 && xhr.status == 200) {
               var buffer = new Uint8Array(xhr.response);

               successCallback(buffer);
           }
       };
       xhr.onerror = function (error) {
           failureCallback(error);
       };
       xhr.send(null);
   } 

   private createUrl(instanceData: CommonDicomInstanceParams,mimeType: string,imageParams: WadoImageParams): string {
      var url = DICOMwebJS.ServerConfiguration.getWadoUriUrl();

       url += WadoUriProxy._QueryParamsFormatted.format(instanceData.studyUID, instanceData.seriesUID, instanceData.instanceUID);

       if (mimeType)
       {
           url += "&contentType=" + mimeType;
       }
       //TODO: implement all other parameters....
       
       return url;
   }
}

class CommonDicomInstanceParams
{
   studyUID: string;
   seriesUID: string;
   instanceUID: string;
}
class WadoImageParams
{
   //IWadoBurnAnnotation? BurnAnnotation { get; set; }

   //int? Rows    { get; set; }
   //int? Columns { get; set; }
   //int? FrameNumber  { get; set; }
   //int? ImageQuality { get; set; }

   //string Region                { get; set; }
   //string WindowCenter          { get; set; }
   //string WindowWidth           { get; set; }
   //string PresentationUID       { get; set; }
   //string presentationSeriesUID { get; set; }
   //string TransferSyntax        { get; set; }
}