import type { Game } from "../../Game/Game";

export class KeyboardProcessor {
  private keyMap: Record<string, any> = {
    KeyA: {
      isDown: false,
    },
    KeyD: {
      isDown: false,
    },
    KeyW: {
      isDown: false,
    },
    KeyS: {
      isDown: false,
    },
    ArrowLeft: {
      isDown: false,
    },
    ArrowRight: {
      isDown: false,
    },
    ArrowUp: {
      isDown: false,
    },
    ArrowDown: {
      isDown: false,
    },
  };

  constructor(public gameContext: Game) {}

  public getButton(keyName: string) {
    return this.keyMap[keyName];
  }

  onKeyDown(key: KeyboardEvent) {
    if (!this.keyMap.hasOwnProperty(key.code)) return;
    const button = this.keyMap[key.code];

    button.isDown = true;
      button.executeDown?.call(this.gameContext);
  }

  onKeyUp(key: KeyboardEvent) {
    if (!this.keyMap.hasOwnProperty(key.code)) return;
    const button = this.keyMap[key.code];

    button.isDown = false;
    button.executeUp?.call(this.gameContext);
  }

  isButtonPressed(keyName: string): boolean {
    return this.keyMap[keyName]?.isDown;
  }
}
