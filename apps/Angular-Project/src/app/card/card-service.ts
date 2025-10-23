import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

export interface CardDto {
  id?: number;
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

  deleteCard(id: number): Observable<CardDto> {
    return this.http.delete<CardDto>(`${this.apiUrl}/${id}`);
  }

  updateCard(id: number, card: Partial<CardDto>): Observable<CardDto> {
    return this.http.patch<CardDto>(`${this.apiUrl}/${id}`, card);
  }
}
