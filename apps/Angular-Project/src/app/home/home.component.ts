import { ChangeDetectionStrategy,Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
