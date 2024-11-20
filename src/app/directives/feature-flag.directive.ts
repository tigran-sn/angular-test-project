import {Directive, inject, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {FeatureFlagService} from "@app/services/feature-flag.service";
import {FeatureFlagKeys} from "@app/types";

@Directive({ selector: '[featureFlag]', standalone: true })
export class FeatureFlagDirective {
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);
  featureFlagService = inject(FeatureFlagService);
  // hasView = signal(false);
  hasView = false;

  @Input() set featureFlag(feature: FeatureFlagKeys) {
    if (this.featureFlagService.getFeature(feature) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  @Input() set featureFlagElse(elseTemplateRef: TemplateRef<any>) {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(elseTemplateRef);
    }
  }
}
