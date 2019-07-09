import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { WikiSearchResult, Search } from './wiki-search.model';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import * as R from 'ramda';

const slowdownRequest = R.pipe(
  debounceTime(500),
  distinctUntilChanged()
);

const formatData = R.pipe<WikiSearchResult, Search[], string[]>(
  data => data.query.search,
  R.map(x => x.title)
);

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

  constructor(private http: HttpClient) {
    this.searchInput.valueChanges
      .pipe(
        slowdownRequest,
        this.wikiApi,
        map(formatData)
      )
      .subscribe(data => {
        this.data = data;
      });
  }
}
