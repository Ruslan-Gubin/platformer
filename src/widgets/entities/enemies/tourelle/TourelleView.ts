import { AnimatedSprite, Container, Sprite } from "pixi.js";
import type { AssetsFactory } from "../../../hared/assets-factory/AssetsFactory";

export class TourelleView extends Container {
  private gunView: Sprite;

  private tourelleCollisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  constructor(public assets: AssetsFactory) {
    super();
    

    const view = new Sprite(this.assets.getTexture('tourelle0000'));
    view.scale.x = 1.4;
    view.scale.y = 1.4;
    view.x -= view.width / 2;
    view.y -= view.height / 2;

    
    this.gunView = new Sprite(this.assets.getTexture('tourellegun0000'));
    this.gunView.scale.x = 1.4;
    this.gunView.scale.y = 1.4;
    this.gunView.pivot.x = 22;
    this.gunView.pivot.y = 19;
    
    this.tourelleCollisionBox.width = 128;
    this.tourelleCollisionBox.height = 128;

    this.addChild(view);
    this.addChild(this.gunView);
  }

  public get gunRotation() {
    return this.gunView.rotation;
  }

  public set gunRotation(value: number) {
    this.gunView.rotation = value;
  }

  get getCollisionBox() {
    this.tourelleCollisionBox.x = this.x - this.tourelleCollisionBox.width / 2;
    this.tourelleCollisionBox.y = this.y - this.tourelleCollisionBox.height / 2;;
    
    return this.tourelleCollisionBox;
  }

  public showAndGetDeadAnimation() {
    this.gunView.visible = false; //убераем отображение пушки
    this.gunView.width = 0;
    this.gunView.height = 0;

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTexture("explosion")
    );

    explosion.animationSpeed = 1/5;
    explosion.scale.x = 2;
    explosion.scale.y = 2;
    explosion.x = - explosion.width / 2; //смещаем позицию анимации
    explosion.y = - explosion.height / 2; //смещаем позицию анимации
    explosion.loop = false; //убераем зацикливание анимации
    explosion.play();
    this.addChild(explosion);

    return explosion;
  }
}
