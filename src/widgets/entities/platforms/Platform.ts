import { Entity } from "../Entity";
import type { PlatformView } from "./PlatformView";

export class Platform extends Entity {

  private _type: string = 'default';
  private _isStep: boolean = false;
  
  constructor(public view: PlatformView) {
    super(view);
    this.isActive = true;
  }
  
  public update() {}
  
  public damage() {}

  public get type(): string {
    return this._type;
  }
  
  set type(value: string) {
    this._type = value;
  }
  
  public get isStep(): boolean {
    return this._isStep;
  }
  
  set isStep(value: boolean) {
    this._isStep = value;
  }

}
