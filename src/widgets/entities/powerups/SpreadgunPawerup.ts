import { Entity } from "../Entity";
import type { SpreadGunPowerupView } from "./SpreadgunPowerupView";


export class SpreadgunPowerup extends Entity {
  public type: string = "spreadgunPowerup";
  public powerUpType: number = 2;

  private GRAVITY_FORCE = 0.2;
  private velocityX = 4;  
  private velocityY = -5;

  private _prevPoint = {
    x: 0,
    y: 0,
  }

  constructor(
    public view: SpreadGunPowerupView,
  ) {
    super(view);
    this.gravitable = true;
  }

  get prevPointHero() {
    return this._prevPoint;
  }

  get prevPoint() {
    return this._prevPoint;
  }

  public update() {
    this.prevPoint.x = this.x;
    this.prevPoint.y = this.y;

    /** добавляем горизонтальную енерцию при попадании, направление всегда вправо */
    this.velocityX = this.velocityX > 0 ? this.velocityX - 0.05 : 0;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  /** получение урона по обьекту */
  public damage() {
    this.setDead();
  }

  get hitBox() {
    return this.view.hitBox;
  }

  public stay(platformY: number) {
    this.velocityX = 0;
    this.velocityY = 0;

    this.y = platformY - this.view.getCollisionBox.height;
  }

  public isJumpState() {
    return false;
  }

}
