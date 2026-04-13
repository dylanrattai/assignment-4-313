import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  svc = inject(ExpenseService);

  getCategoryColor(category: string): string {
    const map: Record<string, string> = {
      Work: '#4e73df', Personal: '#9b59b6', Grocery: '#2ecc71',
      Utilities: '#e67e22', Shopping: '#e91e8c', Travel: '#1abc9c', Food: '#e74c3c',
    };
    return map[category] ?? '#6c757d';
  }

  categoryBreakdown() {
    const total = this.svc.totalExpense();
    const map = new Map<string, number>();
    for (const e of this.svc.expenses()) {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    }
    return Array.from(map.entries())
      .map(([category, catTotal]) => ({
        category,
        total: catTotal,
        percentage: total > 0 ? (catTotal / total) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }

  recentExpenses() {
    return [...this.svc.expenses()].slice(-5).reverse();
  }
}
