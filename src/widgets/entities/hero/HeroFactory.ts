import { Hero } from "./Hero";
import { HeroView } from "./HeroView";
import type { Container } from "pixi.js";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class HeroFactory {
  constructor(
    private worldContainer: Container,
    public assets: AssetsFactory
  ) {}

  public createHero(x: number, y: number) {
    const heroView = new HeroView(this.assets);
    this.worldContainer.addChild(heroView);

    const hero = new Hero(heroView);
    hero.x = x;
    hero.y = y;

    return hero;
  }
}
