import { Component, signal } from '@angular/core';
import { FooterItems } from './models/consts/footer-items.const';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerItems =
    signal<{ title: string; icon: string; action: '', position?:string }[]>(FooterItems);
}
