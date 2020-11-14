import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';

import { ApiResponse } from '../../core/models/api/api-response';
import { UserInterfaceUtilityService } from '../../core/utilities/user-interface-utility.service';
import { Media } from '../models/media.model';
import { MediaApiService } from '../services/media-api.service';

@Component({
  selector: "app-edit-media",
  templateUrl: "./media-edit.component.html",
  styleUrls: ["./media-edit.component.scss"],
})
export class MediaEditComponent implements OnInit, OnDestroy {
  blob: Blob;
  buttonDisabled: boolean;
  buttonText = 'Edit';
  file: File = null;
  fileName: string;
  fileUploaded: boolean;
  hasAnotherDropZoneOver = false;
  hasBaseDropZoneOver = false;
  imgPath: SafeUrl;
  media: Media;
  mediaForm: FormGroup;
  nodeId: string;
  show: boolean = false;
  supportedMedia: boolean;
  uploadPicture: boolean = true;
  uploader: FileUploader;
  validForm: boolean = true;

  private routeSub: Subscription;

  constructor(private router: ActivatedRoute,
    private mediaApiService: MediaApiService,
    private formBuilder: FormBuilder,
    private utilityService: UserInterfaceUtilityService,
    private sanitizer: DomSanitizer,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.routeSub = this.router.url.subscribe((url) => {
      this.configureUploader();

      this.nodeId = url[1].path;

      this.mediaApiService.getById(this.nodeId).subscribe((response: ApiResponse<any>) => {
        this.onSuccessGettingMedia(response);
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  cancelUpload(): void {
    this.uploader.queue = [];
    this.fileUploaded = false;
    this.fileName = '';
  }

  downloadFile(download: boolean = false): void {
    this.mediaApiService.download(this.media.url).subscribe((response: any) => {
      this.blob = new Blob([response], { type: response.type });

      if (download) {
        this.setLinkAttribut(this.blob);
      } else {
        this.setImagePath(this.blob);
      }
    });
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
      formData.append("id", this.media.id);
      formData.append("nodeId", this.nodeId);

      this.buttonText = 'Loading...';
      this.buttonDisabled = true;

      this.mediaApiService.update(formData).subscribe((prop: ApiResponse<any>) => {
        this.media.id = prop.records.id;
        this.buttonText = 'Edit';
        this.buttonDisabled = false;
      });
    }
  }

  private onSuccessGettingMedia(response: any): void {
    this.media = response.records;

    this.supportedMedia = this.utilityService.checkExtension(this.media.extension);

    this.mediaForm = this.formBuilder.group({
      title: [this.media.title, [Validators.required]],
      description: [this.media.description, [Validators.required]],
      alt: [this.media.alt],
      isSecure: [this.media.isSecure],
      id: [this.media.id]
    });

    if (this.supportedMedia && !this.media.isCdn) {
      this.downloadFile();
    }

    if (this.media.isCdn) {
      this.imgPath = this.media.isCdn;
      this.show = true;
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

  private setLinkAttribut(data: any): void {
    const linkElement = document.createElement('a');

    linkElement.setAttribute('style', 'display:none;');

    document.body.appendChild(linkElement);

    linkElement.download = this.media.title;
    linkElement.href = URL.createObjectURL(data);
    linkElement.target = '_blank';
    linkElement.click();

    document.body.removeChild(linkElement);
  }

  private setImagePath(blob: Blob): void {
    this.imgPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    this.show = true;
  }
}
