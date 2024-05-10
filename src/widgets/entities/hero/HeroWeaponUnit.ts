import type { BulletContextType, ButtonContextType } from "../types";
import type { HeroView } from "./HeroView";

export class HeroWeaponUnit {
  private bulletAngle: number = 0;
  public bulletContext: BulletContextType = {
    x: 0,
    y: 0,
    angle: 0,
    type: 'heroBullet',
  };

  constructor(private heroView: HeroView) {}

  get bulletContextHero() {
    this.bulletContext.x =
      this.heroView.x + this.heroView.getBulletPointShift.x;
    this.bulletContext.y =
      this.heroView.y + this.heroView.getBulletPointShift.y;
    this.bulletContext.angle = this.heroView.isFliped
      ? this.bulletAngle * -1 + 180
      : this.bulletAngle;
    return this.bulletContext;
  }

  public setBulletAngle(
    buttonContex: ButtonContextType,
    isJump: boolean
  ) {
    if (buttonContex.arrowLeft || buttonContex.arrowRight) {
      if (buttonContex.arrowUp) {
        this.bulletAngle = -45;
      } else if (buttonContex.arrowDown) {
        this.bulletAngle = 45;
      } else {
        this.bulletAngle = 0;
      }
    } else {
      if (buttonContex.arrowUp) {
        this.bulletAngle = -90;
      } else if (buttonContex.arrowDown && isJump) {
        this.bulletAngle = 90;
      } else {
        this.bulletAngle = 0;
      }
    }
  }
}
