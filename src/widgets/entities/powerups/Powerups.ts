import { GeometryUtils } from "../../hared/geometry-utils/GeometryUtils";
import { Entity } from "../Entity";
import type { Hero } from "../hero/Hero";
import type { PowerupsFactory } from "./PowerupsFactory";
import type { PowerupView } from "./PowerupsView";

export class Powerup extends Entity {
  public type: string = "powerup";

  private velocityX: number = 4;
  private velocityY: number = 50;

  constructor(
    private factory: PowerupsFactory,
    public view: PowerupView,
    private flyY: number,
    public target: Hero
  ) {
    super(view);

    this.isActive = false;
    this.view.visible = false;
  }

  get x() {
    return this.view.x;
  }

  set x(value: number) {
    this.view.x = value;
  }

  get y() {
    return this.view.y;
  }

  set y(value: number) {
    this.view.y = value;
  }

  public update() {
    if (!this.isActive) {
      this.checkActive();
      return;
    }

    if (this.isActive && !this.view.visible) {
      this.view.visible = true;
    }

    this.x += this.velocityX;
    this.y = GeometryUtils.getSinusoid(this.flyY, this.x, this.velocityY);
  }

  /** активируем бонус если герой пересек границу экрана */
  private checkActive() {
    this.isActive = this.x - this.target.x < -440 - this.collisionBox.width;
  }

  /** получение урона по обьекту */
  public damage() {
    if (!this.isActive) return;

    this.factory.createSpreadGunPowerup(this.x, this.y);

    this.velocityX = 0;
    this.velocityY = 0;
    const deadAnimation =  this.view.showAndGetDeadAnimation();
    deadAnimation.onComplete = () => (this.setDead());
  }
}
