import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.css']
})
export class SearchPaginationComponent {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm: string = '';

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  pages(): number[] {
    return Array(this.totalPages).fill(0).map((x,i) => i+1);
  }
}
