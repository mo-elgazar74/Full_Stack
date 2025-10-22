import { Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  private cards = [];

  create(createCardDto: CreateCardDto) {
    const card = { id: Date.now(), ...createCardDto };
    this.cards.push(card);
    this.logger.log(`New card added: ${createCardDto.title}`);
    return card;
  }

  findAll() {
    return this.cards;
  }
}
