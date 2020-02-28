import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {FileUploadService} from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    fileData: File = null;
    uploading = false;
    uploadedFilePath: string = null;
    images: any = [];
    pageNumber: any = '';

    imageChangedEvent: any = '';
    imageBase64: any = '';
    croppedImage: any = '';
    croppedImagePosition: any = '';

    extractedText: any = '';
    extractedImages: any = [];
    indexOfSelectedImage: any = '';
    imagesRequired = false;

    @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;


    constructor(private fileUploadService: FileUploadService) { }

    ngOnInit() {
    }

    selectPageToCrop(image: any, indexOfImage: any): void {
        this.imageBase64 = image;
        this.pageNumber = indexOfImage;
        console.log(indexOfImage);
    }

    selectImage(image: any, indexOfImage: any): void {
        this.imageBase64 = image;
        this.indexOfSelectedImage = indexOfImage;
        console.log(this.indexOfSelectedImage);
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.croppedImagePosition = event.imagePosition;
        console.log(event);
    }

    cropImage() {
        this.fileUploadService.uploadFileAndArea(this.fileData, this.pageNumber, this.croppedImagePosition)
        .subscribe(events => {
            if (events.type === HttpEventType.Response) {
                console.log(events);
                this.extractedText = events.body.extractedText;
                this.extractedImages = events.body.imagesOnPage;
                console.log(this.extractedText);
            }
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
    }

    onSubmit() {
        this.uploading = true;
        this.fileUploadService.uploadFile(this.fileData)
        .subscribe(events => {
            if (events.type === HttpEventType.Response) {
                this.uploading = false;
                console.log(events.body);
                this.images = events.body;
            }
        });
    }

}
