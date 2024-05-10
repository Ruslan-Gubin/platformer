import  { Container } from "pixi.js";

export class BulletView extends Container {
  
  private bulletCollisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  constructor() {
    super();

    this.bulletCollisionBox.width = 5;
    this.bulletCollisionBox.height = 5;
  }

  get getCollisionBox() {
    this.bulletCollisionBox.x = this.x;
    this.bulletCollisionBox.y = this.y;
    
    return this.bulletCollisionBox;
  }
}