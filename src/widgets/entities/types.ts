import type { Bullet } from "./bullets/Bullet";
import type { BulletView } from "./bullets/BulletView";
import { GravitableBullet } from "./bullets/GravitableBullet";
import type { Boss } from "./enemies/boss/Boss";
import type { BossGun } from "./enemies/boss/BossGun";
import type { BossGunView } from "./enemies/boss/BossGunView";
import type { BossView } from "./enemies/boss/BossView";
import type { Runner } from "./enemies/runner/Runner";
import type { RunnerView } from "./enemies/runner/RunnerView";
import type { Tourelle } from "./enemies/tourelle/Tourelle";
import type { TourelleView } from "./enemies/tourelle/TourelleView";
import type { Hero } from "./hero/Hero";
import type { HeroView } from "./hero/HeroView";
import type { BridgePlatform } from "./platforms/BridgePlatform";
import type { Platform } from "./platforms/Platform";
import type { PlatformView } from "./platforms/PlatformView";
import type { Powerup } from "./powerups/Powerups";
import type { PowerupView } from "./powerups/PowerupsView";
import type { SpreadgunPowerup } from "./powerups/SpreadgunPawerup";
import type { SpreadGunPowerupView } from "./powerups/SpreadgunPowerupView";

export type EntityesSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type EntityArrayItemType = Tourelle | Hero | Runner | Bullet | Platform | BridgePlatform | Powerup | SpreadgunPowerup | Boss | BossGun | GravitableBullet;
export type EntityArrayType = EntityArrayItemType[];

export type EntityViewTypes = HeroView | RunnerView | BulletView | TourelleView | PlatformView | PowerupView | SpreadGunPowerupView | BossView | BossGunView;

export type BulletContextType = {
  x: number;
  y: number;
  angle: number;
  type: string;
};

export type ButtonContextType = {
  arrowLeft: boolean;
  arrowRight: boolean;
  arrowUp: boolean;
  arrowDown: boolean;
  shoot?: boolean;
}
