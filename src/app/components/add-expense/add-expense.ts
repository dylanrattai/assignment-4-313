import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseCategory } from '../../models/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-expense.html',
})
export class AddExpenseComponent {
  svc    = inject(ExpenseService);
  router = inject(Router);

  // Two-way bound fields
  title    = '';
  amount   = 0;
  category: ExpenseCategory | '' = '';

  submitted  = false;
  successMsg = signal('');

  getCategoryColor(cat: string): string {
    const map: Record<string, string> = {
      Work: '#4e73df', Personal: '#9b59b6', Grocery: '#2ecc71',
      Utilities: '#e67e22', Shopping: '#e91e8c', Travel: '#1abc9c', Food: '#e74c3c',
    };
    return map[cat] ?? '#6c757d';
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.title.trim() || this.amount <= 0 || !this.category) return;

    this.svc.addExpense({
      title:    this.title.trim(),
      amount:   this.amount,
      category: this.category as ExpenseCategory,
    });

    this.successMsg.set(`"${this.title}" added successfully!`);
    this.onReset();
    setTimeout(() => this.router.navigate(['/expenses']), 1200);
  }

  onReset(): void {
    this.title     = '';
    this.amount    = 0;
    this.category  = '';
    this.submitted = false;
  }
}
