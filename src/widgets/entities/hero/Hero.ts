import { HeroWeaponUnit } from "./HeroWeaponUnit";
import { Entity } from "../Entity";
import type { HeroView } from "./HeroView";
import type { ButtonContextType } from "../types";

const heroState = {
  stay: "stay",
  jump: "jump",
  flyDown: "flyDown",
};

export class Hero extends Entity {
  private GRAVITY_FORCE: number = 0.2;
  private SPEED: number = 3;
  private JUPM_FORCE: number = 9;
  private velocityY: number = 0;
  private velocityX: number = 0;
  private isLay: boolean = false;
  private isStayUp: boolean = false;
  private heroWeaponUnit: HeroWeaponUnit;
  public isFall: boolean = false;

  private movement = {
    x: 0,
    y: 0,
  };

  private state = heroState.stay;

  private directionContext = {
    left: 0,
    right: 0,
  };

  private prevPoint = {
    x: 0,
    y: 0,
  };

  public type = "hero";

  constructor(public view: HeroView) {
    super(view);

    this.heroWeaponUnit = new HeroWeaponUnit(this.view);

    this.state = heroState.jump;
    this.view.showJump();

    this.gravitable = true;
    this.isActive = true;
  }

  get hitBox() {
    return this.view.hitBox;
  }

  get bulletContextHero() {
    return this.heroWeaponUnit.bulletContextHero;
  }

  get prevPointHero() {
    return this.prevPoint;
  }

  public update() {
    this.prevPoint.x = this.x;
    this.prevPoint.y = this.y;

    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0) {
      if (
        !(this.state === heroState.jump || this.state === heroState.flyDown)
      ) {
        this.view.showFall();
        this.isFall = true;
      }
      this.state = heroState.flyDown;
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public damage() {
    /** убераем у врага все параметры передвижения */
    this.movement.x = 0;
    this.GRAVITY_FORCE = 0;
    this.velocityX = 0;
    this.velocityY = 0;

    /** устанавливаем анимацию при поподании по врагу */
    const deadAnimation = this.view.showAndGetDeadAnimation();
    /** что то делаем по окончанию анимации */
    deadAnimation.onComplete = () => (this.setDead(), deadAnimation.destroy());
  }

  public stay(platformY: number) {
    if (this.state === heroState.jump || this.state === heroState.flyDown) {
      const buttonsContext = {
        arrowLeft: this.movement.x === -1,
        arrowRight: this.movement.x === 1,
        arrowDown: this.isLay,
        arrowUp: this.isStayUp,
      };
      this.state = heroState.stay;
      this.setView(buttonsContext);
    }

    this.state = heroState.stay;
    this.velocityY = 0;

    this.y = platformY - this.view.getCollisionBox.height;
    this.isFall = false;
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

  public throwDown() {
    this.state = heroState.jump;
    this.view.showFall();
    this.isFall = true;
  }

  public starLeftMove() {
    this.directionContext.left = -1;

    if (this.directionContext.right > 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = -1;
  }

  public starRightMove() {
    this.directionContext.right = 1;

    if (this.directionContext.left < 0) {
      this.movement.x = 0;
      return;
    }

    this.movement.x = 1;
  }

  public stopLeftMove() {
    this.directionContext.left = 0;
    this.movement.x = this.directionContext.right;
  }

  public stopRightMove() {
    this.directionContext.right = 0;
    this.movement.x = this.directionContext.left;
  }

  public setView(buttonContex: ButtonContextType) {
    this.view.flip(this.movement.x);
    this.isLay = buttonContex.arrowDown;
    this.isStayUp = buttonContex.arrowUp;
    const isJumpState = this.isJumpState();

    this.heroWeaponUnit.setBulletAngle(buttonContex, isJumpState);

    if (isJumpState || this.state === heroState.flyDown) return;

    if (buttonContex.arrowLeft || buttonContex.arrowRight) {
      if (buttonContex.arrowUp) {
        this.view.showRunUp();
      } else if (buttonContex.arrowDown) {
        this.view.showRunDown();
      } else {
        /** определяем герой просто идет или стреляет при ходьбе */
        if (buttonContex.shoot) {
          this.view.showRunShoot();
        } else {
          this.view.showRun();
        }
      }
    } else {
      if (buttonContex.arrowUp) {
        this.view.showStayUp();
      } else if (buttonContex.arrowDown) {
        this.view.showLay();
      } else {
        this.view.showStay();
      }
    }
  }

  public get isStay() {
    return this.state === heroState.stay;
  }

  public reset() {
    this.GRAVITY_FORCE = 0.2;
    this.view.reset();
    this.resuraction();
  }
}
