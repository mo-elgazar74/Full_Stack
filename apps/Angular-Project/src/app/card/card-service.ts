import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

export interface CardDto {
  title: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'http://localhost:3000/api/card';
  private readonly http = inject(HttpClient);

  getCards(): Observable<CardDto[]> {
    return this.http.get<CardDto[]>(this.apiUrl);
  }

  addCard(card: CardDto): Observable<CardDto> {
    return this.http.post<CardDto>(this.apiUrl, card);
  }
}
