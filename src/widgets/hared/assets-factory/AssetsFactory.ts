import { Spritesheet, Assets,  Texture } from "pixi.js";

export class AssetsFactory {
  
  private spritesheet: Spritesheet;
  
  constructor() {
    this.spritesheet = new Spritesheet(
      Texture.from('../assets/atlas.png'),
      Assets.cache.get('../assets/atlas.json').data,
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

