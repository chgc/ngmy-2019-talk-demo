import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { WikiSearchResult } from './wiki-search.model';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchInput = new FormControl();
  data: string[] = [];

  wikiApi = switchMap(keyword =>
    this.http.get<WikiSearchResult>(
      'https://en.wikipedia.org//w/api.php?action=query&format=json&origin=*&list=search&srsearch=' +
        keyword
    )
  );

  slowdownRequest = obs =>
    obs.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

  formatData = (obs: Observable<WikiSearchResult>) =>
    obs.pipe(
      map(data => data.query.search),
      map(search => search.map(x => x.title))
    );

  constructor(private http: HttpClient) {
    this.searchInput.valueChanges
      .pipe(
        this.slowdownRequest,
        this.wikiApi,
        this.formatData
      )
      .subscribe(data => {
        this.data = data;
      });
  }
}
