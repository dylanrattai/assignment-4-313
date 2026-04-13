import { Routes } from '@angular/router';
import { DashboardComponent }    from './components/dashboard/dashboard';
import { AddExpenseComponent }   from './components/add-expense/add-expense';
import { ExpenseListComponent }  from './components/expense-list/expense-list';
import { EditExpenseComponent }  from './components/edit-expense/edit-expense';

export const routes: Routes = [
  { path: '',         component: DashboardComponent   },
  { path: 'add',      component: AddExpenseComponent  },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'edit/:id', component: EditExpenseComponent },
  { path: '**',       redirectTo: ''                  },
];
