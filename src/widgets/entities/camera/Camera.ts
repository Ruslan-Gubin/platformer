import type { Hero } from "../hero/Hero";


export class Camera {
  private target: Hero;
  private world: any;
  private isBackScrollX: boolean;
  private centerScreenPointX: number;
  private rightBorderWorldPointX: number;
  private lastTargetX: number = 0;


  constructor(public cameraSettings: any) {
    this.target = cameraSettings.target;
    this.world = cameraSettings.world;
    this.isBackScrollX = cameraSettings.isBackScrollX;

    this.centerScreenPointX = cameraSettings.screenSize.width / 2;
    this.rightBorderWorldPointX =  this.world.width - this.centerScreenPointX;
  }

  update() {
    if (this.target.x > this.centerScreenPointX &&
        this.target.x < this.rightBorderWorldPointX &&
        (this.isBackScrollX || this.target.x > this.lastTargetX)
      ) {
      this.world.x = this.centerScreenPointX - this.target.x;
      this.lastTargetX = this.target.x;
    }
  }
}