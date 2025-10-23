import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

interface Card {
  id: number;
  title: string;
  description?: string;
}

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  private cards: Card[] = [];

  create(createCardDto: CreateCardDto) {
    const card: Card = { id: Date.now(), ...createCardDto };
    this.cards.push(card);
    this.logger.log(`New card added: ${createCardDto.title}`);
    return card;
  }

  findAll() {
    return this.cards;
  }

  findOne(id: number) {
    const card = this.cards.find((c) => c.id === id);
    if (!card) throw new NotFoundException(`Card with id ${id} not found`);
    return card;
  }

  update(id: number, dto: UpdateCardDto) {
    const index = this.cards.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Card with id ${id} not found`);
    const updated: Card = { ...this.cards[index], ...dto, id };
    this.cards[index] = updated;
    return updated;
  }

  remove(id: number) {
    const index = this.cards.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Card with id ${id} not found`);
    const [deleted] = this.cards.splice(index, 1);
    return deleted;
  }
}
