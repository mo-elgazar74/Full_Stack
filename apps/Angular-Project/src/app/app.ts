import { ChangeDetectionStrategy,Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CardComponent } from "./card/card.component";
import { AboutComponent } from "./about/about.component";

@Component({
  imports: [NxWelcome, RouterModule, CardComponent, RouterOutlet, AboutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent{
  protected title = 'Angular-Project';
}
