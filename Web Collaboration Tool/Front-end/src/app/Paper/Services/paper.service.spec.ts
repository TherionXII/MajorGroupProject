import { TestBed } from '@angular/core/testing';

import { PaperService } from './paper.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IPaper} from '../Interfaces/IPaper';
import {IPage} from '../Interfaces/IPage';
import {IPaperQuestion} from '../Interfaces/IPaperQuestion';

describe('PaperService', () => {
  let paperService: PaperService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ PaperService ]
  }));

  beforeEach(() => {
    paperService = TestBed.inject(PaperService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(paperService).toBeTruthy();
  });

  it('should send a successful request to create a paper', () => {
    paperService.createPaper('0', {} as IPaper)
      .subscribe(response => expect(response.id).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/createPaper`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/createPaper`);
    expect(request.request.body).toEqual({} as IPaper);

    request.flush({ id: 0 } as IPaper);
  })

  it('should send an unsuccessful request to create a paper', () => {
    paperService.createPaper('0', {} as IPaper)
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/createPaper`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/createPaper`);
    expect(request.request.body).toEqual({} as IPaper);

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to upload a file', () => {
    const mockFormData = new FormData();
    mockFormData.append('file', {} as File);

    paperService.uploadFile(0, {} as File)
      .subscribe(response => expect(response.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/uploadPaper`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/uploadPaper`);
    expect(request.request.body).toEqual(mockFormData);

    request.flush([ { id: 0 } as IPage]);
  });

  it('should send an unsuccessful request to upload a file', () => {
    const mockFormData = new FormData();
    mockFormData.append('file', {} as File);

    paperService.uploadFile(0, {} as File)
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/uploadPaper`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/uploadPaper`);
    expect(request.request.body).toEqual(mockFormData);

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to process a question', () => {
    paperService.processQuestion(0, { pageNumber: 0 } as IPaperQuestion)
      .subscribe(response => expect(response.id).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/0/extractText`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/0/extractText`);
    expect(request.request.body).toEqual({ pageNumber: 0 } as IPaperQuestion);

    request.flush({ id: 0 } as IPaperQuestion);
  });

  it('should send an unsuccessful request to process a question', () => {
    paperService.processQuestion(0, { pageNumber: 0 } as IPaperQuestion)
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/0/extractText`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/0/extractText`);
    expect(request.request.body).toEqual({ pageNumber: 0 } as IPaperQuestion);

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to get papers for specific group', () => {
    paperService.getPapersForGroup('0')
      .subscribe(response => expect(response.length).toEqual(1), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/getPapers`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/getPapers`);

    request.flush([ { id: 0 } as IPaper ]);
  });

  it('should send an unsuccessful request to get papers for specific group', () => {
    paperService.getPapersForGroup('0')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/getPapers`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/getPapers`);

    request.flush('Error', { status: 401, statusText: 'Error' });
  });

  it('should send a successful request to get papers a specific paper', () => {
    paperService.getPaper('0')
      .subscribe(response => expect(response.id).toEqual(0), () => fail('Should have succeeded!'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/getPaper`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/getPaper`);

    request.flush({ id: 0 } as IPaper);
  });

  it('should send a successful request to get papers a specific paper', () => {
    paperService.getPaper('0')
      .subscribe(() => fail('Should have failed!'), error => expect(error.error).toEqual('Error'));

    const request = httpTestingController.expectOne(`http://localhost:8080/api/papers/0/getPaper`);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(`http://localhost:8080/api/papers/0/getPaper`);

    request.flush('Error', { status: 401, statusText: 'Error' });
  });
});
