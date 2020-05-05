import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperUploadComponent } from './paper-upload.component';
import {PaperModule} from '../../paper.module';
import {PaperService} from '../../Services/paper.service';
import {of, throwError} from 'rxjs';
import {IPage} from '../../Interfaces/IPage';

describe('PaperUploadComponent', () => {
  let component: PaperUploadComponent;
  let fixture: ComponentFixture<PaperUploadComponent>;

  const paperServiceStub = jasmine.createSpyObj('PaperService', [ 'uploadFile' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperUploadComponent ],
      imports: [ PaperModule ],
      providers: [ { provide: PaperService, useValue: paperServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => component.paperId = 0);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields successfully', () => {
    expect(component.paperId).toEqual(0);
    expect(component.isUploading).toBeFalse();
    expect(component.paperUploadedEvent).not.toBeUndefined();
  });

  it('should set fileData when fileUpload event is triggered', () => {
    component.onFileChange({ target: { files: [ { name: 'mockFile' } as File ] } });

    expect(component.fileData.name).toEqual('mockFile');
  });

  it('should set isUploading as false when upload finished, and should emit an event on successful upload', () => {
    const mockFileUploadEvent = { target: { files: [ { name: 'mockFile' } as File ] } }
    const mockPages = [ { id: 0} as IPage, { id: 1} as IPage ];
    component.onFileChange(mockFileUploadEvent);

    const emitSpy = spyOn(component.paperUploadedEvent, 'emit');
    paperServiceStub.uploadFile.and.returnValue(of(mockPages));

    component.onUpload();

    expect(paperServiceStub.uploadFile).toHaveBeenCalledWith(component.paperId, component.fileData);
    expect(emitSpy).toHaveBeenCalledWith(mockPages);
    expect(component.isUploading).toBeFalse();
    expect(component.fileUploadError).toEqual('');
  })

  it('should set isUploading as false when upload failed, and should set an error message', () => {
    const mockFileUploadEvent = { target: { files: [ { name: 'mockFile' } as File ] } }
    component.onFileChange(mockFileUploadEvent);

    const emitSpy = spyOn(component.paperUploadedEvent, 'emit');
    paperServiceStub.uploadFile.and.returnValue(throwError('Error'));

    component.onUpload();

    expect(paperServiceStub.uploadFile).toHaveBeenCalledWith(component.paperId, component.fileData);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.isUploading).toBeFalse();
    expect(component.fileUploadError).toEqual('Failed to upload file; please try again later');
  });
});
