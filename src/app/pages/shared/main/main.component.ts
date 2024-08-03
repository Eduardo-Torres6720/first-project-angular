import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    MatCardContent,
    RouterOutlet,
    MatIconButton,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
