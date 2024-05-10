import { EntityViewTypes } from "./types";

export class Entity {
  private _isBoss: boolean = false;
 
  private _isActive: boolean = false;

  public isDead: boolean = false;
  public _gravitable: boolean = false;

  constructor(protected view: EntityViewTypes) {}

  public get isBoss(): boolean {
    return this._isBoss;
  }
  
  public set isBoss(value: boolean) {
    this._isBoss = value;
  }

  public get isActive(): boolean {
    return this._isActive;
  }
  
  public set isActive(value: boolean) {
    this._isActive = value;
  }
  
  public set gravitable(value) {
    this._gravitable = value;
  }
  
  public get gravitable() {
    return this._gravitable;
  }

  get x () {
    return this.view.x;
  }

  set x (value: number) {
    this.view.x = value;
  }

  get y() {
    return this.view.y;
  }

  set y (value: number) {
    this.view.y = value;
  }

  get collisionBox () {
    return this.view.getCollisionBox;
  }

  get checkIsDead () {
    return this.isDead;
  }

  public setDead () {
    this.isDead = true;
  }

  /** для героя вызываем метод воскрешения */
  public resuraction () {
    this.isDead = false;
  }

  public removeFromStage() {
    if (this.view.parent) {
      this.view.removeFromParent();
    }
  }

  

}