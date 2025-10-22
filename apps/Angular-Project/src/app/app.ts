import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CardComponent } from './card/card.component';
import { AboutComponent } from './about/about.component';

@Component({
  standalone: true,
  imports: [NxWelcome, RouterOutlet, RouterLink, CardComponent, AboutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected title = 'Angular-Project';
}
