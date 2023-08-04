import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { WellLogWidget } from '@int/geotoolkit/welllog/widgets/WellLogWidget';
@Component({
  selector: 'app-welllog',
  templateUrl: './welllog.component.html',
  styleUrls: ['./welllog.component.scss']
})
export class WelllogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wellog', { static: true }) canvas: ElementRef;
  private plot: Plot;
  private widget: WellLogWidget;
  constructor() { }
  getWidget(): WellLogWidget {
    return this.widget;
  }
  ngAfterViewInit() {
    this.initPlot();
  }
  private initPlot() {
    const widget = this.createWidget();
    this.plot = new Plot({
      'canvaselement': this.canvas.nativeElement,
      'root': widget,
      'autosize': true,
      'autoupdate': true
    });
    this.widget = widget;
  }
  private createWidget(): WellLogWidget {
    return new WellLogWidget({
      'horizontalscrollable': false,
      'verticalscrollable': true,
      'trackcontainer': {
        'border': { 'visible': false }
      },
      'border': { 'visible': false }
    });
  }
  ngOnDestroy(): void {
    this.plot.dispose();
  }
}
