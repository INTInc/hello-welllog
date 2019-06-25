import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-welllog',
  templateUrl: './welllog.component.html',
  styleUrls: ['./welllog.component.scss']
})
export class WelllogComponent implements AfterViewInit {
  @ViewChild('wellog') canvas: ElementRef;
  @ViewChild('parent') parent: ElementRef;
  private plot: geotoolkit.plot.Plot;
  private widget: geotoolkit.welllog.widgets.WellLogWidget;
  constructor() { }
  getWidget(): geotoolkit.welllog.widgets.WellLogWidget {
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
    this.plot = new geotoolkit.plot.Plot({
      'canvasElement': this.canvas.nativeElement,
      'root': widget,
      'autoUpdate': true
    });
    this.widget = widget;
  }
  private createWidget(): geotoolkit.welllog.widgets.WellLogWidget {
    const widget = new geotoolkit.welllog.widgets.WellLogWidget({
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
