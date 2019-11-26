import { select, zoomTransform } from "d3";
import { Component, ElementRef, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "[app-svg-client]",
  templateUrl: "./svg-client.component.html",
  styleUrls: ["./svg-client.component.css"]
})
export class SvgClientComponent {
  @Input() x: number;
  @Input() y: number;
  @Input() radius: number = 10;
  @Input() floor: ElementRef;
  @Input() deviceId: string;
  @Output() clientClick = new EventEmitter<any>();

  translate() {
    // get the current applied zoom information
    const currentTransform = zoomTransform(select(this.floor).node());

    // calculate new x and y position relative to the current zoom
    const newXYPosition = currentTransform.translate(this.x, this.y);

    return `translate(${newXYPosition.x},${newXYPosition.y})`;
  }

  onClick($event) {
    this.clientClick.emit(this.deviceId);
  }
}
