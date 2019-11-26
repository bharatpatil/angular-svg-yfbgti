import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { select, zoom, event, zoomTransform, zoomIdentity } from "d3";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
  stage: any;
  @ViewChild("stageRef", { static: true }) stageRef;
  container: any;
  @ViewChild("containerEl", { static: true }) containerEl;

  zoomFunc: any;
  clients = [
    {
      x: 10,
      y: 10
    },
    {
      x: 15,
      y: 20
    }
  ];

  aps = [
    {
      x: 100,
      y: 50
    },
    {
      x: 60,
      y: 80
    }
  ];

  dimension = {
    width: window.innerWidth - 15 ,
    height: window.innerHeight - 50
  };

  initializeD3Instances() {
    this.stage = select(this.stageRef.nativeElement);
    this.container = select(this.containerEl.nativeElement);
  }

  transform(t) {
    return function(d, i, nodes) {
      const el = select(nodes[i]);
      // intentionally commented code, this shows how to reverse calculate x,y, position of an element
      // const matrix = el.node().transform.baseVal.consolidate().matrix;
      // if (!el.attr("data-x")) {
      //   el.attr("data-x", matrix.e);
      // }
      // if (!el.attr("data-y")) {
      //   el.attr("data-y", matrix.f);
      // }
      if (!d) {
        d = {
          x: el.attr("data-x"),
          y: el.attr("data-y")
        };
      }
      return "translate(" + t.apply([d.x, d.y]) + ")";
    };
  }

  zoomedCallback = () => {
    console.log("zoomed");
    const transformEvent = event.transform;
    this.container
      .selectAll(".client-svg-group,.ap-svg-group")
      .attr("transform", this.transform(transformEvent));
    this.container.select(".plan-image").attr("transform", transformEvent);
  };

  addZooming() {
    let svg, container, zoomed;

    this.zoomFunc = zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [this.dimension.width, this.dimension.height]])
      .on("zoom", this.zoomedCallback);

    this.stage.call(this.zoomFunc);
  }

  ngOnInit() {
    for(let i=0; i< 20; i++) {
      this.addClient();
    }
    for(let i=0; i< 10; i++) {
      this.addAP();
    }
  }

  ngAfterViewInit() {
    this.initializeD3Instances();
    this.addZooming();
    // setTimeout(()=>{
    //   setInterval(()=>{
    //     this.randomlyPickClientAndChangePosition();
    //   }, 1000);      
    // });
  }

  getRandomNumber(space) {
    return Math.floor(Math.random() * space);
  }

  getRandomCoordinates() {
    const obj = {
      x: this.getRandomNumber(this.dimension.width),
      y: this.getRandomNumber(this.dimension.height)
    };

    return obj;
  }

  addClient() {
    this.clients.push(this.getRandomCoordinates());
  }

  addAP() {
    this.aps.push(this.getRandomCoordinates());
  }

  onClientClick(id) {
    alert(`client ${id} clicked`);
  }

  onApClient(id) {
    alert(`ap ${id} clicked`);
  }
  
  randomlyPickClientAndChangePosition() {
    const index = Math.floor(Math.random() * this.clients.length);

    const client = this.clients[index];

    client.x = this.getRandomNumber(this.dimension.width);
    client.y = this.getRandomNumber(this.dimension.height);


  }
}
