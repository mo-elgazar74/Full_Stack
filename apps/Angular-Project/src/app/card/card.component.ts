import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
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

  ngOnInit() {
    this.loadCards();
  }

  addCard(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const formValue = form.value as CardDto;
    this.cardService.addCard(formValue).subscribe(() => {
      form.resetForm();
      this.loadCards();
    });
  }

  loadCards() {
    this.cardService.getCards().subscribe((data) => (this.cards = data));
  }
}
