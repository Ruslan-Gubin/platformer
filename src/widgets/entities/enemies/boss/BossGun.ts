import { Entity } from "../../Entity";
import type { BulletFactory } from "../../bullets/BulletFactory";
import type { Hero } from "../../hero/Hero";
import type { BossGunView } from "./BossGunView";


export class BossGun extends Entity {

    private timeCounter: number = 0;
    private health: number = 0;

    type = "enemy";
    
    constructor(public view: BossGunView, private target: Hero, private bulletFactory: BulletFactory){
        super(view);

        this.isActive = false;
    }

    public  update(){
        if (this.target.isDead){
            return;
        }

        if(!this.isActive){
            if(this.x - this.target.x < 512 + this.collisionBox.width*2){
                this.isActive = true;
            }
            return;
        }

        this.fire();
    }

  public  damage(){
        this.health--;

        if (this.health < 1){
            this.timeCounter = 0;
            const deadAnimation = this.view.showAndGetDeadAnimation();
            deadAnimation.onComplete = () => {
                this.setDead();
            }
        }
    }

   private fire(){
        this.timeCounter++;

        /** к времени вылета пули добавляем небольшой рандом */
        if(this.timeCounter < 50 && Math.random() > 0.01){
            return;
        }

        const bulletContext = {
          x: this.x,
          y: this.y,
          angle: 180,
          type: 'enemyBullet'
        };

        this.bulletFactory.createBossBullet(bulletContext);

        this.timeCounter = 0;
    }
}