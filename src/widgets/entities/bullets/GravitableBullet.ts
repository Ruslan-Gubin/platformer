import { Bullet } from "./Bullet";
import type { BulletView } from "./BulletView";

export class GravitableBullet extends Bullet {
 public isForbiddenHorizontalCollision?: boolean = true;

  private _prevPoint = {
      x: 0,
      y: 0,
  };

  private velocityY = 0;
  private GRAVITY_FORCE = 0.2;

  constructor(public view: BulletView) {
      super(view, 60);

      this.gravitable = true;
  }


  get getCollisionBox() {
      return this.view.getCollisionBox;
  }

  get x() {
      return this.view.x;
  }
  set x(value) {
      this.view.x = value;
  }
  get y() {
      return this.view.y;
  }
  set y(value) {
      this.view.y = value;
  }

  get prevPoint() {
      return this._prevPoint;
  }

  update() {
      this.prevPoint.x = this.x;
      this.prevPoint.y = this.y;

      this.x += this.speed;

      this.velocityY += this.GRAVITY_FORCE;
      this.y += this.velocityY;
  }

  stay() {
      this.setDead();
  }

  isJumpState() {
      return false;
  }
}