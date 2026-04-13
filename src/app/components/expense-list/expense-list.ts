import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseItemComponent } from '../expense-item/expense-item';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink, ExpenseItemComponent],
  templateUrl: './expense-list.html',
})
export class ExpenseListComponent {
  svc    = inject(ExpenseService);
  router = inject(Router);

  // Two-way bound filter/sort fields
  searchQuery    = '';
  filterCategory = '';
  sortBy         = 'newest';

  deleteTarget = signal<Expense | null>(null);

  filtered(): Expense[] {
    let list = [...this.svc.expenses()];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
      );
    }

    if (this.filterCategory) {
      list = list.filter(e => e.category === this.filterCategory);
    }

    switch (this.sortBy) {
      case 'amount-desc': list.sort((a, b) => b.amount - a.amount); break;
      case 'amount-asc':  list.sort((a, b) => a.amount - b.amount); break;
      case 'title':       list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'oldest':      /* natural insertion order */ break;
      default:            list.reverse(); break; // newest
    }
    return list;
  }

  filteredTotal(): number {
    return this.filtered().reduce((sum, e) => sum + e.amount, 0);
  }

  clearFilters(): void {
    this.searchQuery    = '';
    this.filterCategory = '';
    this.sortBy         = 'newest';
  }

  onDeleteRequest(id: string): void {
    const exp = this.svc.getExpenseById(id);
    if (exp) this.deleteTarget.set(exp);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (target) {
      this.svc.deleteExpense(target.id);
      this.deleteTarget.set(null);
    }
  }

  onEdit(expense: Expense): void {
    this.router.navigate(['/edit', expense.id]);
  }
}
