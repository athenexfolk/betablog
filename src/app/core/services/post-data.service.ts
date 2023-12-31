import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  private _title = '';
  private _description = '';
  private _coverImageSrc?: string;
  private _coverImage?: File;
  private _content = '';
  private _tags: string[] = [];

  constructor() {}

  set title(newTitle: string) {
    this._title = newTitle;
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }

  set coverImageSrc(newCoverImageSrc: string | undefined) {
    this._coverImageSrc = newCoverImageSrc;
  }

  set coverImage(newCoverImage: File | undefined) {
    this._coverImage = newCoverImage;
  }

  set content(newContent: string) {
    this._content = newContent;
  }

  get coverImage() {
    return this._coverImage;
  }

  set tags(newTags: string[]) {
    this._tags = newTags;
  }

  getCurrentPostData() {
    return {
      title: this._title,
      description: this._description,
      coverImageFile: this.coverImage,
      coverImageSrc: this._coverImageSrc,
      content: this._content,
      tags: this._tags,
    };
  }

  clearPostData() {
    this._title = '';
    this._description = '';
    this._coverImageSrc = undefined;
    this._coverImage = undefined;
    this.content = '';
    this._tags = [];
  }
}
