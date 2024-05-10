import { Spritesheet, Assets,  Texture } from "pixi.js";
import { atlasPatch } from "../../../main";

export class AssetsFactory {
  
  private spritesheet: Spritesheet;
  
  constructor() {
    this.spritesheet = new Spritesheet(
      Texture.from(atlasPatch.png),
      Assets.cache.get(atlasPatch.json).data,
    );
    this.spritesheet.parse();
  }

   getTexture(texteName: string) {
    return this.spritesheet.textures[texteName];
  }

  public getAnimationTexture(animationName: string) {
    return this.spritesheet.animations[animationName];
  }
}

