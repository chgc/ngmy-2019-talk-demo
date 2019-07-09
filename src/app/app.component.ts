import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikiSearchResult } from './wiki-search.model';
import { map } from 'rxjs/operators';

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
      .pipe(
        map(data => data.query.search),
        map(search => search.map(x => x.title))
      )
      .subscribe(data => console.log(data));
  }
}
