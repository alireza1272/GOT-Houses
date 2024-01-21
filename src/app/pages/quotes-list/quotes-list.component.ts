import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntityListComponent} from '../../shared/component/entity-list/entity-list.component';
import {Subject, takeUntil} from 'rxjs';
import {QuotesService} from '../../shared/services/quotes.service';
import {QuoteEntityModel} from '../../shared/model/quote.model';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [
    EntityListComponent
  ],
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.scss'
})
export class QuotesListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject<void>();
  quotes!: QuoteEntityModel[];

  constructor(
    private quotesService: QuotesService,
    public sharedService: SharedService,) {
  }

  ngOnInit() {
    this.sharedService.isLoadingSubject.next(true);
    this.getRandomQuotes(5);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  getRandomQuotes(count: number) {
    this.quotesService.getRandomQuotes(count).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        this.quotes = response;
        this.sharedService.isLoadingSubject.next(false);
        this.sharedService.buttonClickedSubject.next(false);
      }, (error) => {
      })
  }

}
