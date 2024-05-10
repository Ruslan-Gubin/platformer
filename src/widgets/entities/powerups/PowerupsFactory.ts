import { Powerup } from "./Powerups";
import { PowerupView } from "./PowerupsView";
import { SpreadgunPowerup } from "./SpreadgunPawerup";
import { SpreadGunPowerupView } from "./SpreadgunPowerupView";
import type { World } from "../../Game/World";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";
import type { Hero } from "../hero/Hero";
import type { EntityArrayType } from "../types";


export class PowerupsFactory {

  constructor(
    public entities: EntityArrayType,
    public assets: AssetsFactory,
    private worldContainer: World,
    public target: Hero,
  ) {}


  public createPowerup(x: number, y: number) {
    const view = new PowerupView(this.assets);

    const powerup = new Powerup(this, view, y, this.target);

    view.x = x;

    this.worldContainer.addChild(view);
    this.entities.push(powerup);
  }

  public createSpreadGunPowerup (x: number, y: number) {
    const view = new SpreadGunPowerupView(this.assets);
    const powerup = new SpreadgunPowerup(view);
    powerup.x = x;
    powerup.y = y;

    this.worldContainer.addChild(view);
    this.entities.push(powerup);
  }

}