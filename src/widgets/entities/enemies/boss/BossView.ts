import { AnimatedSprite, Container } from "pixi.js";
import type { AssetsFactory } from "../../../hared/assets-factory/AssetsFactory";


export class BossView extends Container {
  private view: AnimatedSprite;

  private _collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(
    public assets: AssetsFactory
  ) {
    super();

    this.view = new AnimatedSprite(
      this.assets.getAnimationTexture("bossdoor")
    );
    this.view.animationSpeed = 1 / 10;
    this.view.scale.x = 1.4;
    this.view.scale.y = 1.4;
    this.view.play();

    this.addChild(this.view);


    this._collisionBox.width = 64;
    this._collisionBox.height = 82;
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

    const explosion1 = this.createExplosion();
    const explosion2 = this.createExplosion();
    explosion2.y = -explosion1.height;

    return explosion1;
  }

  private createExplosion() {
    const explosion = new AnimatedSprite(
      this.assets.getAnimationTexture("explosion")
    );

    explosion.animationSpeed = 1 / 5;
    explosion.scale.x = 2;
    explosion.scale.y = 2;
    explosion.loop = false;
    explosion.play();
    this.addChild(explosion);

    /** удаляем саму анимацию */
    explosion.onComplete = () => explosion.removeFromParent();

    return explosion;
  }

  /** вызываем анимацию после смерти босса и в конце убираем босса со сцены */
  public showAdditionalExplosoins() {
    const explosion1 = this.createExplosion();
    const explosion2 = this.createExplosion();
    const explosion3 = this.createExplosion();
    const explosion4 = this.createExplosion();

    explosion1.x = 30;

    explosion2.x = 120;
    explosion2.y = 60;

    explosion3.x = 200;

    explosion4.x = -40;
    explosion4.y = 40;
  }
}
