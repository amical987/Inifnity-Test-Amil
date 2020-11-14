import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiResponse } from 'src/app/core/models/api';
import { UserInterfaceUtilityService } from 'src/app/core/utilities/user-interface-utility.service';

import { Media } from '../models/media.model';
import { MediaApiService } from '../services/media-api.service';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {
  blob: Blob;
  imgPath: SafeUrl;
  media: Media;
  show: boolean = false;
  showMedia: Media[] = [];
  supportedMedia: boolean;
  url: any;

  constructor(
    private mediaApiService: MediaApiService,
    private utilityService: UserInterfaceUtilityService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.mediaApiService.getAll().subscribe((response: ApiResponse<Media[]>) => {
      response.records.forEach(async element => {
        element.safeUrl = await this.generateUrl(element);
        this.showMedia.push(element);
      });
    });
  }

  async generateUrl(media: Media) {
    this.supportedMedia = this.utilityService.checkExtension(media.extension);

    if (this.supportedMedia && !media.isCdn) {
      return await this.downloadFile(media);
    }
  }

  async downloadFile(media: Media, download: boolean = false) {
    await this.mediaApiService.download(media.url).toPromise().then((response: any) => {
      this.blob = new Blob([response], { type: response.type });
      this.media = media;

      if (download) {
        this.setLinkAttribut(this.blob);
      }
      else {
        this.url = this.setImagePath(this.blob);
      }
    });

    return this.url;
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

  private setImagePath(blob: Blob) {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }
}
