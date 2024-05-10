import { Container, Graphics, Sprite } from "pixi.js";
import type { AssetsFactory } from "../hared/assets-factory/AssetsFactory";

export class StaticBackground extends Container {
  constructor(private screenSize: any, private assets: AssetsFactory) {
    super();

    this.createMounts( 600, 250, 1.3);
    this.createMounts( 820, 230, 1.6);

    for (let i = 0; i < 300; i++) {
     const star = this.createStar();
      star.x = Math.random() * this.screenSize.width;
      star.y = Math.random() * this.screenSize.height;
    }

    const water = new Graphics();
    water.rect(0, this.screenSize.height / 2 + 130, screenSize.width, screenSize.height);
    water.fill(0x0072ec);
    this.addChild(water);

  }

  private createStar() {
    const star = new Graphics();
    star.rect(0,0,2,2);
    star.fill(0xdddddd);
    this.addChild(star);

    return star;
  }

  private createMounts( x: number, y: number, scale: number) {
      
    const mounts = new Sprite(this.assets.getTexture('mounts0000'));
      mounts.scale.x = scale;
      mounts.scale.y = scale;
      mounts.x = x;
      mounts.y = y;
      this.addChild(mounts);
  }
}