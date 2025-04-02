import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import { LegalValueService } from './legalValue.service';
import { UnitsRow } from '../models/UnitsRow.model';

interface tableDropdown { label: string};

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-legalValue-list',
  templateUrl: './legalValue.component.html',
  styleUrls: ['./legalValue.component.css']
})
export class LegalValueComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  tables: string[];
  selectedTableValue: string = 'Legal Value Table';

  unitsRows: UnitsRow[];

  cities: City[];

  selectedCity1: City;


  private subscription: Subscription;

  constructor(private slService: LegalValueService,
    private logservice: LoggingService) { }

  ngOnInit() {

    this.tables = [
       'Amount',
       'Drink Category',
       'Units'
    ];
    this.unitsRows = [
      { fpConversion: 1, bScalable: true, unit: 'ounce' },
      { fpConversion: 8, bScalable: true, unit: 'cup' },
      { fpConversion: 3, bScalable: true, unit: 'top' }
    ];

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.logservice.printLog('Finishing Shopping List onInit');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
   }
  onSelectTable(index: number) {
    this.selectedTableValue = this.tables[index];
  }
  onButtonClick() {
    console.log('Button was clicked.');
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
