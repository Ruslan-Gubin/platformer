import { AnimatedSprite, Container, Sprite } from "pixi.js";
import type { AssetsFactory } from "../../../hared/assets-factory/AssetsFactory";

export class RunnerView extends Container {
  public bounds = {
    width: 0,
    height: 0,
  };

  private collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private stm: {
    currentState: string;
    states: Record<string, Sprite | AnimatedSprite>;
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

    this.stm.states.run = this.getRunImage();
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

  get isFliped() {
    return this.rootNode.scale.x === -1;
  }

  public showRun() {
    this.toState("run");
  }

  public showJump() {
    this.toState("jump");
  }

  public showFall() {
    this.toState("fall");
  }

  public flip(direction: number) {
    switch (direction) {
      case 1:
        return (this.rootNode.scale.x = direction);
      case -1:
        return (this.rootNode.scale.x = direction);
    }
  }

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

  private getRunImage() {
    const view = new AnimatedSprite(
      this.assets.getAnimationTexture("runnerrun")
    );
    view.animationSpeed = 1 / 10;
    view.play();
    view.y += 2;
    return view;
  }

  private getJumpImage() {
    const view = new Sprite(this.assets.getTexture("runnerjump0000"));
    return view;
  }

  private getFallImage() {
    const view = new Sprite(this.assets.getTexture("runnerjump0000"));
    return view;
  }
}
