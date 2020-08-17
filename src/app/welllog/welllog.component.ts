import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { WellLogWidget } from '@int/geotoolkit/welllog/widgets/WellLogWidget';
@Component({
  selector: 'app-welllog',
  templateUrl: './welllog.component.html',
  styleUrls: ['./welllog.component.scss']
})
export class WelllogComponent implements AfterViewInit {
  @ViewChild('wellog', { static: true }) canvas: ElementRef;
  @ViewChild('parent', { static: true }) parent: ElementRef;
  private plot: Plot;
  private widget: WellLogWidget;
  constructor() { }
  getWidget(): WellLogWidget {
    return this.widget;
  }
  ngAfterViewInit() {
    this.init();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event);
  }
  private init() {
    this.initPlot();
    this.resize(null);
  }
  private initPlot() {
    const widget = this.createWidget();
    this.plot = new Plot({
      'canvasElement': this.canvas.nativeElement,
      'root': widget,
      'autoUpdate': true
    });
    this.widget = widget;
  }
  private createWidget(): WellLogWidget {
    const widget = new WellLogWidget({
      'horizontalscrollable': false,
      'verticalscrollable': true,
      'trackcontainer': {
        'border': { 'visible': false }
      },
      'border': { 'visible': false }
    });
    return widget;
  }
  private resize(event) {
    if (this.plot) {
      this.plot.setSize(this.parent.nativeElement.clientWidth, this.parent.nativeElement.clientHeight);
    }
  }
}
