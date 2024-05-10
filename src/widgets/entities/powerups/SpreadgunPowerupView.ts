import { Container, Sprite } from "pixi.js";
import { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class SpreadGunPowerupView extends Container {

  private _collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  
  constructor(private assets: AssetsFactory) {
    super();

    const view = new Sprite(this.assets.getTexture('spreadgun0000'));
    this.addChild(view);

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

}