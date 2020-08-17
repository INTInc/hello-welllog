import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { WelllogComponent } from './welllog/welllog.component';
import { TrackType } from '@int/geotoolkit/welllog/TrackType';
import { LogTrack } from '@int/geotoolkit/welllog/LogTrack';
import { LogData } from '@int/geotoolkit/welllog/data/LogData';
import { LogCurve } from '@int/geotoolkit/welllog/LogCurve';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'hello-welllog';
  @ViewChild(WelllogComponent, { static: true }) welllogComponent: WelllogComponent;
  constructor() {

  }
  ngAfterViewInit(): void {
    this.welllogComponent.getWidget().addTrack(TrackType.IndexTrack);
    const logTrack = this.welllogComponent.getWidget().addTrack(TrackType.LinearTrack);
    this.addCurves(logTrack);
    this.welllogComponent.getWidget().setDepthLimits(0, 100);
    this.welllogComponent.getWidget().setDepthScale(10);
  }
  private addCurves(logTrack: LogTrack) {
    const data = this.createLogData();
    const curve = this.createCurve(data, 'orange');
    logTrack.addChild(curve);
  }
  private createLogData(): LogData {
    const depths = [10, 12, 20, 27, 30, 35, 40, 42, 50, 55, 60, 67, 70, 75];
    const values = [75, 100, 90, 50, 60, 95, 60, 75, 80, 100, 40, 67, 40, 80];
    return new LogData({
        'name': 'CALI',
        'depths': depths,
        'values': values,
        'indexunit': 'ft'
    });
  }
  private createCurve(dataSource, color) : LogCurve {
    return new LogCurve(dataSource)
        .setLineStyle({
            'color': color,
            'width': 2
        });
  }
}

