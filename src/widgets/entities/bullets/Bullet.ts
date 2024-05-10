import { Entity } from "../Entity";
import type { BulletView } from "./BulletView";

export class Bullet extends Entity {
  public speed = 10;
  private angle: number = 0;
  public type: string = 'bullet';

  constructor(public view: BulletView, angle: number) {
    super(view);
    this.angle = angle * Math.PI / 180;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  public damage() {}
}
