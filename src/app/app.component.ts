import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { WelllogComponent } from './welllog/welllog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'hello-welllog';
  @ViewChild(WelllogComponent) welllogComponent: WelllogComponent;
  constructor() {

  }
  ngAfterViewInit(): void {
    this.welllogComponent.getWidget().addTrack(geotoolkit.welllog.TrackType.IndexTrack);
    const logTrack = this.welllogComponent.getWidget().addTrack(geotoolkit.welllog.TrackType.LinearTrack);
    this.addCurves(logTrack);
    this.welllogComponent.getWidget().setDepthLimits(0, 100);
    this.welllogComponent.getWidget().setDepthScale(10);
  }
  private addCurves(logTrack: geotoolkit.welllog.LogTrack) {
    const data = this.createLogData();
    const curve = this.createCurve(data, 'orange');
    logTrack.addChild(curve);
  }
  private createLogData(): geotoolkit.welllog.data.LogData {
    const depths = [10, 12, 20, 27, 30, 35, 40, 42, 50, 55, 60, 67, 70, 75];
    const values = [75, 100, 90, 50, 60, 95, 60, 75, 80, 100, 40, 67, 40, 80];
    return new geotoolkit.welllog.data.LogData({
        'name': 'CALI',
        'depths': depths,
        'values': values,
        'indexunit': 'ft'
    });
  }
  private createCurve(dataSource, color) : geotoolkit.welllog.LogCurve {
    return new geotoolkit.welllog.LogCurve(dataSource)
        .setLineStyle({
            'color': color,
            'width': 2
        });
  }
}

