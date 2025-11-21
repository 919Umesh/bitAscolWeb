import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css']
})
export class EmptyState {
  @Input() icon: string = '📭';
  @Input() title: string = 'No Data Found';
  @Input() description: string = 'There is no data available at the moment.';
  @Input() actionText: string = '';
  @Input() showImage: boolean = true;
  @Input() imageUrl: string = 'assets/svg/nodatabg.png';
  @Input() imageAlt: string = 'No Data';
  @Output() onAction = new EventEmitter<void>();
}