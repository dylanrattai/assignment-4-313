import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './expense-item.html',
  styles: [`
    .expense-card {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .expense-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
    }
    .high-expense   { background-color: #fff8f8 !important; }
    .medium-expense { background-color: #fffdf3 !important; }
  `],
})
export class ExpenseItemComponent {
  @Input({ required: true }) expense!: Expense;

  @Output() deleteExpense = new EventEmitter<string>();
  @Output() editExpense   = new EventEmitter<Expense>();

  get categoryColor(): string {
    const map: Record<string, string> = {
      Work: '#4e73df', Personal: '#9b59b6', Grocery: '#2ecc71',
      Utilities: '#e67e22', Shopping: '#e91e8c', Travel: '#1abc9c', Food: '#e74c3c',
    };
    return map[this.expense.category] ?? '#6c757d';
  }

  get categoryIcon(): string {
    const map: Record<string, string> = {
      Work: 'bi-briefcase', Personal: 'bi-person', Grocery: 'bi-cart',
      Utilities: 'bi-lightning', Shopping: 'bi-bag', Travel: 'bi-airplane', Food: 'bi-cup-hot',
    };
    return map[this.expense.category] ?? 'bi-tag';
  }

  get amountLevel(): 'high' | 'medium' | 'low' {
    if (this.expense.amount > 200) return 'high';
    if (this.expense.amount > 100) return 'medium';
    return 'low';
  }
}
