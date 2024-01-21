import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {CharactersService} from '../../shared/services/characters.service';
import {CommonModule} from '@angular/common';
import {CharacterEntityModel} from '../../shared/model/character.model';
import {SharedService} from '../../shared/services/shared.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject<void>();
  characterDetail!: CharacterEntityModel;
  characterQuotes: string[] | any = [];

  constructor(private router: ActivatedRoute,
              private charactersService: CharactersService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.isLoadingSubject.next(true);
    this.router.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: Params) => {
        this.getCharacterDetail(params['slug']);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  getCharacterDetail(slug: string) {
    this.charactersService.getCharacterDetail(slug).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.characterDetail = response[0];
          this.characterQuotes = this.characterDetail.quotes;
        }
        this.sharedService.isLoadingSubject.next(false);
      }, () => {
      });
  }

  randomizeQuote() {
    this.sharedService.buttonClickedSubject.next(true);
    this.charactersService.generateRandomQuotes(this.characterDetail.slug, this.characterQuotes?.length)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      if (response.length > 0) {
        this.characterQuotes = [];
        response.map((eachQuote: any) => {
          this.characterQuotes.push(eachQuote.sentence);
        });
        this.sharedService.buttonClickedSubject.next(false);
      }
    })
  }
}
