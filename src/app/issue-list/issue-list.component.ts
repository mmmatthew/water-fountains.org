/*
 * @license
 * (c) Copyright 2019 | MY-D Foundation | Created by Matthew Moy de Vitry
 * Use of this code is governed by the GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0)
 * and the profit contribution agreement available at https://www.my-d.org/ProfitContributionAgreement
 */

import { select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../locations';
import { AppError, DataIssue } from '../types';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent {
  @select('dataIssues') dataIssues$: Observable<DataIssue[]>;
  @select('appErrors') appErrors$: Observable<AppError[]>;
  @select('lang') lang$: Observable<string>;
  @select('city') city$: Observable<City | null>;
  // issue_count:number;
}
