import { Injectable } from '@angular/core';
import * as d3 from 'd3';
@Injectable()
export class D3Service {

  constructor() { }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      
      const transform = d3.event.transform;    
      container.selectAll('.clients,.aps').attr('transform', transform);    
      container.select('.plan-image').attr('transform', transform);

    }

    zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([
          [0, 0],
          [300, 300]
      ])    
    .on('zoom', zoomed);
    svg.call(zoom);

  }
}