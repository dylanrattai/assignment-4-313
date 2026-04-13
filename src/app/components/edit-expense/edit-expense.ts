import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { Expense, ExpenseCategory } from '../../models/expense';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './edit-expense.html',
})
export class EditExpenseComponent implements OnInit {
  svc    = inject(ExpenseService);
  route  = inject(ActivatedRoute);
  router = inject(Router);

  // Two-way bound fields (pre-populated in ngOnInit)
  title    = '';
  amount   = 0;
  category: ExpenseCategory | '' = '';

  expenseId  = '';
  submitted  = false;
  notFound   = signal(false);
  successMsg = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.expenseId = id;
    const found = this.svc.getExpenseById(id);
    if (!found) {
      this.notFound.set(true);
      return;
    }
    // Pre-populate via two-way binding
    this.title    = found.title;
    this.amount   = found.amount;
    this.category = found.category;
  }

  getCategoryColor(cat: string): string {
    const map: Record<string, string> = {
      Work: '#4e73df', Personal: '#9b59b6', Grocery: '#2ecc71',
      Utilities: '#e67e22', Shopping: '#e91e8c', Travel: '#1abc9c', Food: '#e74c3c',
    };
    return map[cat] ?? '#6c757d';
  }

  onSave(): void {
    this.submitted = true;
    if (!this.title.trim() || this.amount <= 0 || !this.category) return;

    const updated: Expense = {
      id:       this.expenseId,
      title:    this.title.trim(),
      amount:   this.amount,
      category: this.category as ExpenseCategory,
    };

    this.svc.editExpense(updated);
    this.successMsg.set('Expense updated successfully!');
    setTimeout(() => this.router.navigate(['/expenses']), 1000);
  }
}
