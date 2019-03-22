/*
 * @license
 * (c) Copyright 2019 | MY-D Foundation | Created by Matthew Moy de Vitry
 * Use of this code is governed by the GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0)
 * and the profit contribution agreement available at https://www.my-d.org/ProfitContributionAgreement
 */

import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import {FilterCategories, IAppState} from '../store';
import { UPDATE_FILTER_CATEGORIES } from '../actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public onlyOlderThan: boolean = false;
  public ageLimit: number = 1600;
  public onlyNotable: boolean = false;
  public onlySpringwater: boolean = false;
  public filterCount: number = 0;
  public filterText: string = '';
  @select() filterCategories;
  @select() lang;

  updateFilters() {
    let filters:FilterCategories = {
      onlyOlderThan: this.onlyOlderThan ? this.ageLimit : null,
      onlyNotable: this.onlyNotable,
      onlySpringwater: this.onlySpringwater,
      filterText: this.filterText
    };
    this.ngRedux.dispatch({
      type: UPDATE_FILTER_CATEGORIES, payload: filters
    });
    this.filterCount =
      (this.onlyOlderThan ? 1 : 0) +
      (this.onlyNotable ? 1 : 0) +
      (this.onlySpringwater ? 1 : 0) +
      (this.filterText !== '' ? 1 : 0)
  }

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
  }

}
