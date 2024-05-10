import { Bullet } from "./Bullet";
import { BulletView } from "./BulletView";
import { GravitableBullet } from "./GravitableBullet";
import { Graphics, type Container } from "pixi.js";
import type { BulletContextType, EntityArrayType } from "../types";

export class BulletFactory {
  constructor(
    private worldContainer: Container,
    private entities: EntityArrayType
  ) {}

  public createBullet(bulletContext: BulletContextType) {
    const skin = new Graphics();
    skin.rect(0, 0, 5, 5);
    skin.fill(0xffffff);

    const view = new BulletView();
    this.worldContainer.addChild(view);
    view.addChild(skin);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.speed = 10;

    this.entities.push(bullet);
  }

  public createSpreadGunBullet(bulletContext: BulletContextType) {
    const skin = new Graphics();
    skin.circle(0, 0, 6);
    skin.fill(0xff2222);
    skin.circle(-3, -3, 3);
    skin.fill(0xdddddd);

    const view = new BulletView();
    this.worldContainer.addChild(view);
    view.addChild(skin);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.speed = 7;

    this.entities.push(bullet);
  }

  public createBossBullet(bulletContext: BulletContextType) {
    const skin = new Graphics();
    skin.circle(0, 0, 6);
    skin.fill(0xff2222);
    skin.circle(-3, -3, 3);
    skin.fill(0xdddddd);

    const view = new BulletView();
    this.worldContainer.addChild(view);
    view.addChild(skin);

    const bullet = new GravitableBullet(view);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.speed = Math.random() * -6 -2;

    this.entities.push(bullet);
  }
}
