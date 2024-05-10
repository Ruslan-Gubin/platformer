import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class HeroView extends Container {
  public bounds = {
    width: 0,
    height: 0,
  };

  public collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private _hitBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    shiftX: 0,
    shiftY: 0,
  };

  private bulletPointShift = {
    x: 0,
    y: 0,
  };
  private stm: {
    currentState: string;
    states: Record<string, Sprite | Container>;
  } = {
    currentState: "default",
    states: {},
  };

  private rootNode: any;

  constructor(public assets: AssetsFactory) {
    super();
    this.createNodeStructure();
    this.rootNode.pivot.x = 10;
    this.rootNode.x = 10;
    this.bounds.width = 20;
    this.bounds.height = 90;
    this.collisionBox.width = this.bounds.width;
    this.collisionBox.height = this.bounds.height;

    this.stm.states.stay = this.getStayImage();
    this.stm.states.run = this.getRunImage();
    this.stm.states.runShoot = this.getRunShootImage();
    this.stm.states.stayUp = this.getStayUpImage();
    this.stm.states.runUp = this.getRunUpImage();
    this.stm.states.runDown = this.getRunDownImage();
    this.stm.states.lay = this.getLayImage();
    this.stm.states.jump = this.getJumpImage();
    this.stm.states.fall = this.getFallImage();

    for (let key in this.stm.states) {
      this.rootNode.addChild(this.stm.states[key]);
    }

    this.toState("stay");
  }

  get getCollisionBox() {
    this.collisionBox.x = this.x;
    this.collisionBox.y = this.y;
    return this.collisionBox;
  }

  get hitBox() {
    this._hitBox.x = this.x + this._hitBox.shiftX;
    this._hitBox.y = this.y + this._hitBox.shiftY;
    return this._hitBox;
  }

  get isFliped() {
    return this.rootNode.scale.x === -1;
  }

  get getBulletPointShift() {
    return this.bulletPointShift;
  }

  /** востановление героя после смерти */
  public reset() {
    this.rootNode.visible = true;
    this.collisionBox.width = this.bounds.width;
    this.collisionBox.height = this.bounds.height;
  }

  /** анимация смерти героя */
  public showAndGetDeadAnimation() {
    this.rootNode.visible = false;
    this.collisionBox.width = 0;
    this.collisionBox.height = 0;

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTexture("explosion")
    );
    explosion.animationSpeed = 1/5;
    explosion.x = -50; //смещаем позицию анимации
    explosion.loop = false; //убераем зацикливание анимации
    explosion.play();
    this.addChild(explosion);

    return explosion;
  }

  private setBulletPointShift(x: number, y: number) {
    this.bulletPointShift.x =
      (x + this.pivot.x * this.rootNode.scale.x) * this.rootNode.scale.x;
    this.bulletPointShift.y = y;
  }

  public showStay() {
    this.toState("stay");
    this.setBulletPointShift(50, 29);

    this.showStayBox();
  }

  public showStayUp() {
    this.toState("stayUp");
    this.setBulletPointShift(28, -30);

    this.showStayBox();
  }

  public showRun() {
    this.toState("run");
    this.setBulletPointShift(65, 30);

    this.showStayBox();
  }

  public showRunShoot() {
    this.toState("runShoot");
    this.setBulletPointShift(50, 29);

    this.showStayBox();
  }

  public showRunUp() {
    this.toState("runUp");
    this.setBulletPointShift(40, 0);

    this.showStayBox();
  }

  public showRunDown() {
    this.toState("runDown");
    this.setBulletPointShift(47, 50);

    this.showStayBox();
  }

  public showLay() {
    this.toState("lay");
    this.setBulletPointShift(50, 70);

    this.showLayHitBox();
  }

  public showJump() {
    this.toState("jump");
    this.setBulletPointShift(-2, 40);

    this.showJumpHitBox();
  }

  public showFall() {
    this.toState("fall");

    this.showStayBox();
  }

  public flip(direction: number) {
    switch (direction) {
      case 1:
        return (this.rootNode.scale.x = direction);
      case -1:
        return (this.rootNode.scale.x = direction);
    }
  }

  private toState(keyState: string) {
    if (this.stm.currentState === keyState) return;

    for (let key in this.stm.states) {
      if (key !== keyState && !this.stm.states[key].visible) continue;

      key !== keyState
        ? (this.stm.states[key].visible = false)
        : ((this.stm.states[key].visible = true),
          (this.stm.currentState = key));
    }
  }

  private createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.rootNode = rootNode;
  }

  private getStayImage() {
    const view = new Sprite(this.assets.getTexture("stay0000"));
    return view;
  }

  private getStayUpImage() {
    const view = new Sprite(this.assets.getTexture("stayup0000"));
    view.x += 2;
    view.y -= 31;
    return view;
  }

  private getRunImage() {
    const view = new AnimatedSprite(this.assets.getAnimationTexture("run"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  /** анимация для выстрелов при ходьбе */
  private getRunShootImage() {
    const container = new Container();

    const upperPart = new Sprite(this.assets.getTexture("stay0000"));
    upperPart.x = 8;
    upperPart.y = 2;

    const upperPartMask = new Graphics();
    upperPartMask.rect(0, 0, 100, 45);
    upperPartMask.fill({ color: 0xffffff });

    upperPart.mask = upperPartMask;

    const bottomPart = new AnimatedSprite(
      this.assets.getAnimationTexture("run")
    );
    bottomPart.animationSpeed = 1 / 10;
    bottomPart.play();
    bottomPart.y -= 3;

    const bottomPartMask = new Graphics();
    bottomPartMask.rect(0, 45, 100, 45);
    bottomPartMask.fill({ color: 0xffffff });

    bottomPart.mask = bottomPartMask;

    container.addChild(upperPart);
    container.addChild(bottomPart);
    container.addChild(upperPartMask);
    container.addChild(bottomPartMask);

    return container;
  }

  private getRunUpImage() {
    const view = new AnimatedSprite(this.assets.getAnimationTexture("runup"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  private getRunDownImage() {
    const view = new AnimatedSprite(this.assets.getAnimationTexture("rundown"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    return view;
  }

  private getLayImage() {
    const view = new Sprite(this.assets.getTexture("lay0000"));
    view.x -= 25;
    view.y += 50;
    return view;
  }

  private getJumpImage() {
    const view = new AnimatedSprite(this.assets.getAnimationTexture("jump"));
    view.animationSpeed = 1 / 10;
    view.play();
    view.y -= 3;
    view.x -= 10;
    return view;
  }

  private getFallImage() {
    const view = new Sprite(this.assets.getTexture("run0003"));
    return view;
  }

  private showStayBox() {
    this._hitBox.width = 20;
    this._hitBox.height = 90;
    this._hitBox.shiftX = 0;
    this._hitBox.shiftY = 0;
  }

  private showJumpHitBox() {
    this._hitBox.width = 40;
    this._hitBox.height = 40;
    this._hitBox.shiftX = -10;
    this._hitBox.shiftY = 25;
  }

  private showLayHitBox() {
    this._hitBox.width = 90;
    this._hitBox.height = 20;
    this._hitBox.shiftX = -45;
    this._hitBox.shiftY = 70;
  }
}
