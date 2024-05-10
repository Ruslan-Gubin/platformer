import { Entity } from "../../Entity";
import { GeometryUtils } from "../../../hared/geometry-utils/GeometryUtils";
import type { TourelleView } from "./TourelleView";
import type { Hero } from "../../hero/Hero";
import type { BulletFactory } from "../../bullets/BulletFactory";

export class Tourelle extends Entity {
  public type: string = "enemy";
  private counter: number = 0;
  private health = 5;

  constructor(
    public view: TourelleView,
    private target: Hero,
    private bulletFactory: BulletFactory
  ) {
    super(view);
    this.isActive = false;
  }


  update() {
    if (this.target.isDead) return;
    
    if (!this.isActive) {
      this.checkActive();
      return;
    }

    const angle = GeometryUtils.getAtangens(this, this.target);
    this.view.gunRotation = angle;

    this.fire(angle);
  }

  /** активируем врага если он показался на экране */
  private checkActive() {
    this.isActive = (this.x - this.target.x < 512 + this.collisionBox.width * 2);
  }

  public damage() {
    this.health--;

    if (this.health < 1) {
      this.counter = 0;
 
    const deadAnimation =  this.view.showAndGetDeadAnimation();
    deadAnimation.onComplete = () => (this.setDead());
    
    }
  }

  private fire(angle: number) {
    this.counter++;

    if (this.counter < 100) return;

    const bulletContext = {
      x: this.x,
      y: this.y,
      angle: GeometryUtils.getRadiant(angle),
      type: "enemyBullet",
    };

    this.bulletFactory.createBullet(bulletContext);

    this.counter = 0;
  }
}
