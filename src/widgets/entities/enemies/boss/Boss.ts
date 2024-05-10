import { Entity } from "../../Entity";
import type { BossView } from "./BossView";

export class Boss extends Entity {
  public type: string = 'enemy';

  private height: number = 5;

  constructor(public view: BossView) {
    super(view);

    this.isActive = true;
    this.isBoss = true;
  };

  update() {

  }

  damage() {
    this.height--;

    if (this.height < 1) {
      this.isActive = false;

    const deadAnimation =  this.view.showAndGetDeadAnimation();
    deadAnimation.onComplete = 
        () => (
          this.view.showAdditionalExplosoins(), 
          deadAnimation.removeFromParent()
        );
    }
  }


}