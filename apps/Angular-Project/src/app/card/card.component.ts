import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { FormsModule, type NgForm } from '@angular/forms';
import { CardService, type CardDto } from './card-service';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  cards: CardDto[] = [];
  private readonly cardService = inject(CardService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadCards();
  }

  addCard(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formValue = form.value as CardDto;
    this.cardService.addCard(formValue).subscribe({
      next: () => {
        form.resetForm();
        this.loadCards();
      },
      error: (error) => {
        console.error('Unable to create card', error);
      },
    });
  }

  loadCards() {
    this.cardService.getCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Unable to fetch cards', error);
        this.cards = [];
        this.cdr.markForCheck();
      },
    });
  }
}
