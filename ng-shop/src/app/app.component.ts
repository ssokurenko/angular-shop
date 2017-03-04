import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import {ProductService} from "./shared/services/product.service";

@Component({
  selector: 'ngs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
      private domSanitizer: DomSanitizer,
      private iconRegistry: MdIconRegistry,
      productService: ProductService) {
    this.registerIcons(new Map<string, string>([
      [ 'logo', 'assets/ngshop-logo.svg' ]
    ]));
    productService.getAll()
        .subscribe(products => console.log(products));
  }

  private registerIcons(icons: Map<string, string>) {
    icons.forEach((url, id) => {
      const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.iconRegistry.addSvgIconInNamespace('ngs', id, safeUrl);
    });
  }
}
