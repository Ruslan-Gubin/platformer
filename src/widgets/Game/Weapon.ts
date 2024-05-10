import type { BulletFactory } from "../entities/bullets/BulletFactory";
import type { BulletContextType } from "../entities/types";

export class Weapon {
  private currentGunStrategy: any;
  private count: number = 0;
  private limit: number = 6;
  private isFire: boolean = false;

  constructor(private bulletFactory: BulletFactory) {
    this.currentGunStrategy = this.defaultGunStrategy;
  }

  public update(bulletContext: BulletContextType) {
    if (!this.isFire) return;

    if (this.count % this.limit === 0) {
      this.currentGunStrategy(bulletContext);
    }
    this.count++;
  }

  public setWeapon(type: number) {
    switch (type) {
      case 1:
        this.currentGunStrategy = this.defaultGunStrategy;
        break;
      case 2:
        this.currentGunStrategy = this.spreadGunStrategy;
        break;
    }
  }

  public startFire() {
    this.isFire = true;
  }

  public stopFire() {
    this.isFire = false;
    this.count = 0;
  }

  private defaultGunStrategy(bulletContext: BulletContextType) {
    this.limit = 15;
    this.bulletFactory.createBullet(bulletContext);
  }

  private spreadGunStrategy(bulletContext: BulletContextType) {
    this.limit = 40;
    let angleShift = -20;

    for (let i = 0; i < 5; i++) {
      const localBulletContext = {
        x: bulletContext.x,
        y: bulletContext.y,
        angle: bulletContext.angle + angleShift,
        type: bulletContext.type,
      };
      this.bulletFactory.createSpreadGunBullet(localBulletContext);
      angleShift += 10;
    }
  }
}
