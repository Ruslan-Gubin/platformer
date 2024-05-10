import type { Container } from "pixi.js";
import { Runner } from "./runner/Runner";
import { RunnerView } from "./runner/RunnerView";
import { Tourelle } from "./tourelle/Tourelle";
import { TourelleView } from "./tourelle/TourelleView";
import { EntityArrayType } from "../types";
import type { Hero } from "../hero/Hero";
import type { BulletFactory } from "../bullets/BulletFactory";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";
import { BossView } from "./boss/BossView";
import { Boss } from "./boss/Boss";
import { BossGunView } from "./boss/BossGunView";
import { BossGun } from "./boss/BossGun";

export class EnemiesFactory {
  constructor(
    private worldContainer: Container,
    private target: Hero,
    private bulletFactory: BulletFactory,
    private entities: EntityArrayType,
    public assets: AssetsFactory
  ) {}

  public createRunner(x: number, y: number, jumpBehaviorKoef?: number) {
    const view = new RunnerView(this.assets);
    this.worldContainer.addChild(view);

    const runner = new Runner(view, this.target);
    runner.x = x;
    runner.y = y;

    /** устанавливаем вероятность прыжка если заканчивается платформа */
    if (jumpBehaviorKoef && typeof jumpBehaviorKoef === "number") {
      runner.jumpBehaviorKoef = jumpBehaviorKoef;
    }

    this.entities.push(runner);

    return runner;
  }

  createTourelle(x: number, y: number) {
    const view = new TourelleView(this.assets);
    this.worldContainer.addChild(view);

    const tourelle = new Tourelle(view, this.target, this.bulletFactory);
    tourelle.x = x;
    tourelle.y = y;

    this.entities.push(tourelle);

    return tourelle;
  }

  createBoss(x: number, y: number) {
    const view = new BossView(this.assets);
    this.worldContainer.addChild(view);

    const boss = new Boss(view);
    boss.x = x - 35;
    boss.y = y + 95;

    this.entities.push(boss);

    const gun1 = this.createBossGun();
    gun1.x = x - 56;
    gun1.y = y;
    
    const gun2 = this.createBossGun();
    gun2.x = x + 34;
    gun2.y = y;

    return boss;
  }

  private createBossGun() {
    const gunView = new BossGunView(this.assets);
    this.worldContainer.addChild(gunView);
    const bossGun = new BossGun(gunView, this.target, this.bulletFactory);
    this.entities.push(bossGun);
    return bossGun;
  }
}
