import { Application, Assets, type ApplicationOptions } from "pixi.js";
import { Game } from "./widgets/Game/Game";
import { AssetsFactory } from "./widgets/hared/assets-factory/AssetsFactory";

const initConfig: Partial<ApplicationOptions> | undefined = {
  width: 1024,
  height: 768,
  hello: true,
  autoStart: true,
};
const pixiApp = new Application();

await pixiApp.init(initConfig);

await Assets.load('../assets/atlas.json');
await Assets.load('../assets/atlas.png');

const assets = new AssetsFactory();

const rootElement = document.getElementById('root')!;

rootElement.appendChild(pixiApp.canvas);

const game = new Game(pixiApp, assets);

document.addEventListener('keydown', (key: KeyboardEvent) => game.keyboardProcessor.onKeyDown(key));
document.addEventListener('keyup', (key: KeyboardEvent) => game.keyboardProcessor.onKeyUp(key));

pixiApp.ticker.add(game.update, game);
