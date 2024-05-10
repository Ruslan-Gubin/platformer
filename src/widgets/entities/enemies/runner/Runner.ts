import { Entity } from "../../Entity";
import type { RunnerView } from "./RunnerView";
import type { Hero } from "../../hero/Hero";
import type { ButtonContextType } from "../../types";

const heroState = {
  stay: "stay",
  jump: "jump",
  flyDown: "flyDown",
};

export class Runner extends Entity {
  private GRAVITY_FORCE: number = 0.2;
  private SPEED: number = 3;
  private JUPM_FORCE: number = 9;
  private velocityY: number = 0;
  private velocityX: number = 0;
  public jumpBehaviorKoef: number = 0.4;

  private movement = {
    x: 0,
    y: 0,
  };

  private state = heroState.jump;

  private prevPoint = {
    x: 0,
    y: 0,
  };

  public type = "enemy";

  constructor(public view: RunnerView, private target: Hero) {
    super(view);

    this.state = heroState.jump;
    this.view.showJump();

    this.movement.x = -1;

    this.gravitable = true;
    this.isActive = false;
  }


  get prevPointHero() {
    return this.prevPoint;
  }

  public update() {
    if (!this.isActive) {
      this.checkActive();
      return;
    }

    this.prevPoint.x = this.x;
    this.prevPoint.y = this.y;

    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0) {
      if (
        !(this.state === heroState.jump || this.state === heroState.flyDown)
      ) {
        if (Math.random() > this.jumpBehaviorKoef) {
          this.jump();
        } else {
          this.view.showFall();
        }
      }
      if (this.velocityY > 0) {
        this.state = heroState.flyDown;
      }
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  /** активируем врага если он показался на экране */
  private checkActive() {
    this.isActive = this.x - this.target.x < 512 + this.collisionBox.width * 2;
  }

  public damage() {
    /** убераем у врага все параметры передвижения */
    this.movement.x = 0;
    this.GRAVITY_FORCE = 0;
    this.velocityX = 0;
    this.velocityY = 0;

    /** устанавливаем анимацию при поподании по врагу */
    const deadAnimation =  this.view.showAndGetDeadAnimation();
    /** что то делаем по окончанию анимации */
    deadAnimation.onComplete = () => (this.setDead());
  }

  public stay(platformY: number) {
    if (this.state === heroState.jump || this.state === heroState.flyDown) {
      const buttonsContext = {
        arrowLeft: this.movement.x === -1,
        arrowRight: this.movement.x === 1,
        arrowDown: false,
        arrowUp: false,
      };
      this.state = heroState.stay;
      this.setView(buttonsContext);
    }

    this.state = heroState.stay;
    this.velocityY = 0;

    this.y = platformY - this.view.getCollisionBox.height;
  }

  public jump() {
    if (this.state === heroState.jump || this.state === heroState.flyDown)
      return;
    this.state = heroState.jump;
    this.velocityY -= this.JUPM_FORCE;
    this.view.showJump();
  }

  public isJumpState() {
    return this.state === heroState.jump;
  }

  public setView(buttonContex: ButtonContextType) {
    this.view.flip(this.movement.x);

    const isJumpState = this.isJumpState();

    if (isJumpState || this.state === heroState.flyDown) return;

    if (buttonContex.arrowLeft || buttonContex.arrowRight) {
      this.view.showRun();
    }
  }

  public removeFromParent() {
    if (this.view.parent) {
      this.view.removeFromParent();
    }
  }

  public get isStay() {
    return this.state === heroState.stay;
  }
}
