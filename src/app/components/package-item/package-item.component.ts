import { Component, Input } from '@angular/core';
import { Package } from 'src/app/interfaces';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent {
  @Input() packageItem!: Package
}
