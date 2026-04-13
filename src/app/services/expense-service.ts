import { Injectable, signal, computed } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenses = signal<Expense[]>([
    { id: crypto.randomUUID(), title: 'Office Supplies',  amount: 45.99,  category: 'Work'      },
    { id: crypto.randomUUID(), title: 'Weekly Groceries', amount: 123.50, category: 'Grocery'   },
    { id: crypto.randomUUID(), title: 'Electric Bill',    amount: 89.00,  category: 'Utilities' },
    { id: crypto.randomUUID(), title: 'Flight Tickets',   amount: 520.00, category: 'Travel'    },
    { id: crypto.randomUUID(), title: 'Dinner Out',       amount: 67.25,  category: 'Food'      },
  ]);

  categories = signal<ExpenseCategory[]>([
    'Work', 'Personal', 'Grocery', 'Utilities', 'Shopping', 'Travel', 'Food',
  ]);

  totalExpense    = computed(() => this.expenses().reduce((sum, e) => sum + e.amount, 0));
  transactionCount = computed(() => this.expenses().length);
  highestExpense  = computed(() => {
    const list = this.expenses();
    return list.length === 0 ? null : list.reduce((max, e) => e.amount > max.amount ? e : max, list[0]);
  });
  averageExpense  = computed(() =>
    this.transactionCount() === 0 ? 0 : this.totalExpense() / this.transactionCount()
  );

  addExpense(data: Omit<Expense, 'id'>): void {
    this.expenses.update(list => [...list, { ...data, id: crypto.randomUUID() }]);
  }

  deleteExpense(id: string): void {
    this.expenses.update(list => list.filter(e => e.id !== id));
  }

  // Extra Credit
  editExpense(updated: Expense): void {
    this.expenses.update(list => list.map(e => e.id === updated.id ? updated : e));
  }

  getExpenseById(id: string): Expense | undefined {
    return this.expenses().find(e => e.id === id);
  }
}
