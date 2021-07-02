/*
 * @license
 * (c) Copyright 2019 | MY-D Foundation | Created by Matthew Moy de Vitry
 * Use of this code is governed by the GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0)
 * and the profit contribution agreement available at https://www.my-d.org/ProfitContributionAgreement
 */

import { NgRedux, select } from '@angular-redux/store';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CLOSE_SIDEBARS, EDIT_FILTER_TEXT, TOGGLE_LIST, TOGGLE_MENU } from '../actions';
import { DataService } from '../data.service';
import { IAppState } from '../store';
import * as sharedConstants from './../../assets/shared-constants.json';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @select() showList;
  @select() showMenu: Observable<boolean>;
  @select() filterText;
  @select() lang$;
  @select() mode;
  @Output() menuToggle = new EventEmitter<boolean>();
  @select() device$;
  publicSharedConsts = sharedConstants;
  public locationOptions = [];
  public last_scan: Date = new Date();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private dataService: DataService,
    private translateService: TranslateService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.dataService.fetchLocationMetadata().then(locationInfo => {
      // get location information
      const keys = Object.keys(locationInfo);
      for (const key of keys) {
        //console.log(key);
        if ('test' === key) {
          if (environment.production) {
            console.log('ignoring test ' + new Date().toISOString());
            continue;
          }
        }
        this.locationOptions.push(key);
      }
      if (!environment.production) {
        console.log(this.locationOptions.length + '/' + keys.length + ' locations added ' + new Date().toISOString());
      }
    });

    // watch for fountains to be loaded to obtain last scan time
    // for https://github.com/water-fountains/proximap/issues/188 2)
    this.dataService.fountainsLoadedSuccess.subscribe(fountains => {
      this.last_scan = _.get(fountains, ['properties', 'last_scan'], '');
    });
  }

  toggleMenu(show) {
    console.log('toggleMenu ' + show + ' ' + new Date().toISOString());
    this.ngRedux.dispatch({ type: TOGGLE_MENU, payload: show });
    // this.menuToggle.emit(true);
  }

  applyTextFilter(search_text) {
    console.log('applyTextFilter ' + search_text + ' ' + new Date().toISOString());
    this.ngRedux.dispatch({ type: EDIT_FILTER_TEXT, text: search_text });
  }

  toggleList(show) {
    console.log('toggleList ' + show + ' ' + new Date().toISOString());
    this.ngRedux.dispatch({ type: TOGGLE_LIST, payload: show });
  }

  returnToRoot() {
    // close sidebars
    this.ngRedux.dispatch({ type: CLOSE_SIDEBARS });
  }
}
