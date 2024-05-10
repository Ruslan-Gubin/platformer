import { Container } from "pixi.js";

export class PlatformView extends Container {
  private collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(width: number, height: number) {
    super();

    this.collisionBox.width = width;
    this.collisionBox.height = height;
  }

  get getCollisionBox() {
    this.collisionBox.x = this.x;
    this.collisionBox.y = this.y;

    return this.collisionBox;
  }

}
