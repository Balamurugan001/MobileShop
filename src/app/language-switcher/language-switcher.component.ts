import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ta']);
    translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang() ?? 'en';
    this.translate.use(browserLang.match(/en|ta/) ? browserLang : 'en');
  }

  switchLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.translate.use(selectedLang);
  }
}