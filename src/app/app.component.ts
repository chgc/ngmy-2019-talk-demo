import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikiSearchResult } from './wiki-search.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http
      .get<WikiSearchResult>(
        'https://en.wikipedia.org//w/api.php?action=query&format=json&origin=*&list=search&srsearch=angular'
      )
      .subscribe(data => console.log(data));
  }
}
