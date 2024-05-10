import { AnimatedSprite, Container, Sprite } from "pixi.js";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class PowerupView extends Container {
  private _collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private view: any;

  constructor(public assets: AssetsFactory) {
    super();

    this.view = new Sprite(this.assets.getTexture("powerup0000"));
    this.addChild(this.view);

    this._collisionBox.width = 50;
    this._collisionBox.height = 20;
  }

  get getCollisionBox() {
    this._collisionBox.x = this.x;
    this._collisionBox.y = this.y;
    return this._collisionBox;
  }

  get hitBox() {
    return this._collisionBox;
  }

  public showAndGetDeadAnimation() {
    this.view.visible = false; 
    this._collisionBox.width = 0;
    this._collisionBox.height = 0;

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTexture("explosion")
    );

    explosion.animationSpeed = 1 / 5;
    explosion.y = -explosion.height / 2; //смещаем позицию анимации
    explosion.loop = false; //убераем зацикливание анимации
    explosion.play();
    this.addChild(explosion);

    return explosion;
  }
}
