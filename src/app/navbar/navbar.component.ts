/*
 * @license
 * (c) Copyright 2019 | MY-D Foundation | Created by Matthew Moy de Vitry
 * Use of this code is governed by the GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0)
 * and the profit contribution agreement available at https://www.my-d.org/ProfitContributionAgreement
 */

import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { EDIT_FILTER_TEXT, TOGGLE_LIST, TOGGLE_MENU, CLOSE_SIDEBARS, CHANGE_LANG } from '../actions';
import _ from 'lodash';
import {DataService} from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @select() showList;
  @select() showMenu;
  @select() filterText;
  @select() mode;
  @Output() menuToggle = new EventEmitter<boolean>();
  @select() device$;
  public locationOptions = [];

  constructor(changeDetectorRef: ChangeDetectorRef,
              private dataService: DataService,
              private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {

    this.dataService.fetchLocationMetadata().then((locationInfo)=>{
      // get location information
      this.locationOptions = _.keys(locationInfo);
    })
  }

  toggleMenu(show) {
    this.ngRedux.dispatch({ type: TOGGLE_MENU, payload: show });
    // this.menuToggle.emit(true);
  }

  applyTextFilter(search_text) {
    this.ngRedux.dispatch({ type: EDIT_FILTER_TEXT, text: search_text });
  }

  toggleList(show) {
    this.ngRedux.dispatch({ type: TOGGLE_LIST, payload: show });
  }

  returnToRoot() {
    // close sidebars
    this.ngRedux.dispatch({ type: CLOSE_SIDEBARS });
  }


}
