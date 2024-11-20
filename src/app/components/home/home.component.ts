import { Component } from '@angular/core';
import {BannerComponent} from "@app/components/banner/banner.component";
import {FeatureFlagDirective} from "@app/directives/feature-flag.directive";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        BannerComponent,
        FeatureFlagDirective
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
