import { Container } from "pixi.js";


export class World extends Container {
 
  private background;
  private game;
  private foreground;

  constructor() {
    super();
    
    this.background = new Container();
    this.addChild(this.background);

    this.game = new Container();
    this.addChild(this.game);

    this.foreground = new Container();
    this.addChild(this.foreground);

  }

  get backgroundWorld() {
    return this.background;
  }

  get gameWorld() {
    return this.game;
  }

  get foregroundWorld() {
    return this.foreground;
  }

}