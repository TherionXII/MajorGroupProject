import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {FileUploadService} from '../../Services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    fileData: File = null;
    uploading = false;
    images: any = [];
    pageNumber: any = '';

    imageChangedEvent: any = '';
    imageBase64: any = '';
    croppedTextPosition: any = '';
    croppedImage: any = '';
    croppedPosition: any = '';

    extractedText: any = '';
    extractedImages: any = [];
    selectedImage: any = '';
    imageRequired = false;

    @ViewChild(ImageCropperComponent, {static: false}) imageCropper: ImageCropperComponent;


    constructor(private fileUploadService: FileUploadService) { }

    ngOnInit() {
    }

    selectPageToCrop(image: any, indexOfImage: any): void {
        this.imageBase64 = image;
        this.pageNumber = indexOfImage;
    }

    selectImageFromPage(): void {
        this.imageRequired = true;
        this.selectedImage = this.croppedImage;
        this.extractedImages.unshift(this.selectedImage);
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
        this.croppedPosition = event.imagePosition;
    }

    selectTextFromPage(): void {
        this.croppedTextPosition = this.croppedPosition;
        this.fileUploadService.uploadFileAndArea(this.fileData, this.pageNumber, this.croppedTextPosition)
        .subscribe(events => {
            if (events.type === HttpEventType.Response) {
                this.extractedText = events.body.extractedText;
                this.extractedImages = events.body.imagesOnPage;
                console.log(this.extractedText);
            }
        });
    }

    fileProgress(fileInput: any): void {
        this.fileData = fileInput.target.files[0] as File;
    }

    uploadPDF(): void {
        this.uploading = true;
        this.fileUploadService.uploadFile(this.fileData)
        .subscribe(events => {
            if (events.type === HttpEventType.Response) {
                this.uploading = false;
                this.images = events.body;
            }
        });
    }

    postToForum(image: any): void {
        console.log(this.extractedText);
        if (image !== null) {
            console.log(image);
        }
    }

}
