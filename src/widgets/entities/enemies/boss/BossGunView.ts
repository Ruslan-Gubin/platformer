import { AnimatedSprite, Container, Sprite } from "pixi.js";
import type { AssetsFactory } from "../../../hared/assets-factory/AssetsFactory";


export class BossGunView extends Container {
  private view: Sprite;

    private _collisionBox = {
        x:0,
        y:0,
        width:0,
        height:0,
    }


    constructor(private assets: AssetsFactory){
        super();



        this.view = new Sprite(this.assets.getTexture("bossgun0000"));
        this.view.scale.x = 1.4;
        this.view.scale.y = 1.4;

        this.addChild(this.view);


        this._collisionBox.width = 38;
        this._collisionBox.height = 18;
    }

    get getCollisionBox(){
        this._collisionBox.x = this.x - this._collisionBox.width/2;
        this._collisionBox.y = this.y - this._collisionBox.height/2;
        return this._collisionBox;
    }

    get hitBox() {
        return this._collisionBox;
    }

    showAndGetDeadAnimation(){
        this.view.visible = false;
        this._collisionBox.width = 0;
        this._collisionBox.height = 0;

        const explosion = new AnimatedSprite(this.assets.getAnimationTexture("explosion"));
        explosion.animationSpeed = 1/5;
        explosion.scale.x = 2;
        explosion.scale.y = 2;
        explosion.x = -explosion.width/2;
        explosion.y = -explosion.height/2;
        explosion.loop = false;
        explosion.play();
        this.addChild(explosion);

        return explosion;
    }
}