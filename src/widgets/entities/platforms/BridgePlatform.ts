import { AnimatedSprite } from "pixi.js";
import { Platform } from "./Platform";
import type { PlatformView } from "./PlatformView";
import type { Hero } from "../hero/Hero";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class BridgePlatform extends Platform {
  private target: Hero | null = null;

  constructor(public view: PlatformView, private assets: AssetsFactory) {
    super(view);
    this.type = 'bridge';
  }

  public setTarget(target: Hero) {
    this.target = target;
  }

  update() {
    if (this.target) {
      if (this.x - this.target.x < -50 && this.isActive) {
        this.isActive = false;
        const deadAnimation =  this.showAndGetDeadAnimation();
        deadAnimation.onComplete = () => (this.setDead());
      }
      return;
    }
  }

  private showAndGetDeadAnimation() {
    const explosion = new AnimatedSprite(
      this.assets.getAnimationTexture("explosion")
    );

    explosion.animationSpeed = 1 / 5;
    explosion.scale.x = 1.5;
    explosion.scale.y = 1.5;
    explosion.x = - 10; 
    explosion.loop = false; 
    explosion.play();
    this.view.addChild(explosion);

    return explosion;
  }
}
