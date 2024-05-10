import { Container, Graphics, Sprite } from "pixi.js";
import { Platform } from "./Platform";
import type { World } from "../../Game/World";
import { PlatformView } from "./PlatformView";
import { BridgePlatform } from "./BridgePlatform";
import type { AssetsFactory } from "../../hared/assets-factory/AssetsFactory";

export class PlatformFactory {
  private platformWidth: number = 128;
  private platformHeight: number = 24;

  constructor(private worldContainer: World, public assets: AssetsFactory) {}


  private platform(
    view: PlatformView,
    x: number,
    y: number,
    type: string = "default"
  ) {
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = type;
    return platform;
  }



  public createPlatform(x: number, y: number) {
    const skin = this.getGroundPlatform();

    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);

    this.worldContainer.backgroundWorld.addChild(view);

    return this.platform(view, x, y);
  }

  public createBox(x: number, y: number) {
    const skin = this.getGroundPlatform();

    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);

    this.worldContainer.backgroundWorld.addChild(view);

    return this.platform(view, x, y, "box");
  }

  public createStepBox(x: number, y: number) {
    const step = this.createBox(x, y);
    step.isStep = true;
    step.type = "box";

    return step;
  }

  public createWater(x: number, y: number) {
    const skin = new Graphics();
    skin.rect(0, -this.platformHeight, this.platformWidth, this.platformHeight);
    skin.lineTo(this.platformWidth, this.platformHeight);
    skin.fill(0x0072);

    const waterTop = new Sprite(this.assets.getTexture('water0000'));
    waterTop.y = -this.platformHeight;

    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    view.addChild(waterTop);

    this.worldContainer.foregroundWorld.addChild(view);

    return this.platform(view, x, y, "box");
  }

  public createJungle(x: number, y: number) {
    const jungleTop = new Sprite(this.assets.getTexture('jungletop0000'));
   
    for (let i = 1; i <= 5; i++) {
      const jungleBottom = this.createJungleBottom(jungleTop);
      jungleBottom.y = jungleTop.height * i - 2 * i;
      
    }

    jungleTop.x = x;
    jungleTop.y = y;
   this.worldContainer.backgroundWorld.addChild(jungleTop)
  }

  private createJungleBottom(jungleTop: Sprite) {
    const jungleBottom = new Sprite(this.assets.getTexture('junglebottom0000'));
    jungleTop.addChild(jungleBottom);
    return jungleBottom
  }

  public createBossWall(x: number, y: number) {
    const skin = new Sprite(this.assets.getTexture("boss0000"));
    skin.scale.x = 1.5;
    skin.scale.y = 1.5;

    const view = new PlatformView(this.platformWidth * 3, 768);
    view.addChild(skin);

    this.worldContainer.backgroundWorld.addChild(view);

    return this.platform(view, x - 64, y - 45, "box");
  }

  createBridge(x: number, y: number) {
    const skin = new Sprite(this.assets.getTexture("bridge0000"));
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);

    this.worldContainer.backgroundWorld.addChild(view);

    const platform = new BridgePlatform(view, this.assets);
    platform.x = x;
    platform.y = y;
    platform.isActive = true;

    return platform;
  }

  private getGroundPlatform() {
    const container = new Container();
    const grass = new Sprite(this.assets.getTexture("platform0000"));
    const ground = new Sprite(this.assets.getTexture("ground0000"));
    ground.y = grass.height - 1;
    const ground2 = new Sprite(this.assets.getTexture("ground0000"));
    ground2.y = grass.height * 2 - 2;
    const ground3 = new Sprite(this.assets.getTexture("ground0000"));
    ground3.y = grass.height * 3 - 4;
    container.addChild(grass);
    container.addChild(ground);
    container.addChild(ground2);
    container.addChild(ground3);

    return container;
  }
}
