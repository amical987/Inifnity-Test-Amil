import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/core';

import { ApiResponse } from '../../core/models/api/api-response';
import { Media } from '../models/media.model';
import { MediaApiService } from '../services/media-api.service';

@Component({
  selector: "app-create-media",
  templateUrl: "./media-create.component.html",
  styleUrls: ["./media-create.component.scss"],
})
export class MediaCreateComponent {
  buttonDisabled: boolean;
  buttonText = 'Upload file';
  fileName: string;
  fileUploaded: boolean;
  hasAnotherDropZoneOver = false;
  hasBaseDropZoneOver = false;
  public media: Media;
  public mediaForm: FormGroup;
  public validForm: boolean = true;
  uploader: FileUploader;

  constructor(
    private mediaApiService: MediaApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.media = new Media();
  }

  ngOnInit(): void {
    this.mediaForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alt: [""],
      isSecure: [false]
    });

    this.configureUploader();
  }

  cancelUpload(): void {
    this.uploader.queue = [];
    this.fileUploaded = false;
    this.fileName = '';
  }

  fileOverBase(event: any): void {
    this.hasBaseDropZoneOver = event;
  }

  onProceed(): void {
    if (!this.mediaForm.valid) {
      this.validForm = false;
    } else {
      this.media = this.mediaForm.value as Media;

      const formData = new FormData();

      formData.append("title", this.media.title);
      formData.append("description", this.media.description);
      formData.append("file", this.uploader.queue[0].file.rawFile);
      formData.append("alt", this.media.alt);
      formData.append("isSecure", JSON.stringify(this.media.isSecure));
      //TODO add nodeId from tree
      formData.append("nodeId", 'F56E30B8-C9BF-4BED-864D-F590DC727089');

      this.buttonText = 'Loading...';
      this.buttonDisabled = true;

      this.mediaApiService.create(formData).subscribe((response: ApiResponse<any>) => {
        this.media.id = response.records.id;

        this.router.navigate([`media/edit/${response.records}`]);
      });
    }
  }

  private configureUploader(): void {
    this.uploader = new FileUploader({
      url: `${this.mediaApiService.baseUrl}/upload`,
      itemAlias: 'file',
      authToken: `Bearer ${this.authService.getAccessToken()}`
    });

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      this.fileName = fileItem.file.name;
      this.fileUploaded = true;
    };

    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      this.buttonText = 'Loading...';
      this.buttonDisabled = true;
    }
  }
}
