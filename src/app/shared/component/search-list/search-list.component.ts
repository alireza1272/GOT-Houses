import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnInit {
  @Input() entitiesList: any;
  @Output() onFilterList: EventEmitter<any[]> = new EventEmitter<any[]>();
  searchTerm: string = '';
  initialList: any;
  /**
   * By the input `change` this property will call using `.next(value)` to debounce the search action (`debounceTime`)
   */
  searchTermChanged: Subject<string> = new Subject<string>();


  ngOnInit() {
    this.initialList = this.entitiesList;
    /**
     * Debounce (delay) the search action. This means that we don't filter the list per
     * word type, when user waits for a certain time AND the value is *changed*, a list will be filtered to
     * receive the search result.
     *
     * `distinctUntilChanged` checks to let the method to filter just when the search term is different from
     * its previous value
     */
    this.searchTermChanged.pipe(debounceTime(200)
      , distinctUntilChanged())
      .subscribe((termToSearch) => {
        if (termToSearch.length >= 0) {
          const filteredList = this.initialList.filter(
            (x: any) => x.name.toLowerCase().includes(termToSearch.toLowerCase())
          );
          this.onFilterList.emit(filteredList);
        } else {
          this.onFilterList.emit(this.initialList);
        }
      });
  }

  change(text: string) {
    this.searchTermChanged.next(text);
  }

  cancelSearch() {
    this.searchTerm = '';
    this.onFilterList.emit(this.initialList);
  }

  onKeyPress(event: any) {
    /**
     * on escape press
     */
    if (event.keyCode === 27) {
      this.cancelSearch();
    }
  }
}


