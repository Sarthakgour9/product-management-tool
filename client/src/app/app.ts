import { Component, signal, effect, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('client');
  darkMode = signal<boolean>(false);

  constructor() {
    // Effect to update CSS class and localStorage when darkMode changes
    effect(() => {
      const isDark = this.darkMode();
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
      }
    });
  }

  ngOnInit() {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference) {
      this.darkMode.set(savedPreference === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.set(prefersDark);
    }
  }

  toggleDarkMode() {
    this.darkMode.update(v => !v);
  }
}
