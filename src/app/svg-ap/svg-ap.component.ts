import { select, zoomTransform } from 'd3';
import { Component, Input, ElementRef, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "[app-svg-ap]",
  templateUrl: "./svg-ap.component.html",
  styleUrls: ["./svg-ap.component.css"]
})
export class SvgApComponent {
  
  @Input() x: number;
  @Input() y: number;
  @Input() radius: number = 10;
  @Input() floor: ElementRef;
  @Input() deviceId: string;
  @Output() apClick = new EventEmitter<any>();

  translate() {
    // get the current applied zoom information
    const currentTransform = zoomTransform(
        select(this.floor).node()
    );
    
    // calculate new x and y position relative to the current zoom
    const newXYPosition = currentTransform.translate(
      this.x,
      this.y
    );

    return `translate(${newXYPosition.x},${newXYPosition.y})`;
  }

  onClick($event) {
    this.apClick.emit(this.deviceId);
  }
}
