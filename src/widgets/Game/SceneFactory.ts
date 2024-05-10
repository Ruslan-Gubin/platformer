import type { EnemiesFactory } from "../entities/enemies/EnemiesFactory";
import type { Hero } from "../entities/hero/Hero";
import type { Platform } from "../entities/platforms/Platform";
import type { PlatformFactory } from "../entities/platforms/PlatformFactory";
import type { PowerupsFactory } from "../entities/powerups/PowerupsFactory";
import type { EntityArrayType } from "../entities/types";

export class SceneFactory {
  private boxSize: number = 128;

  constructor(
    private platforms: Platform[] = [],
    private platformFactory: PlatformFactory,
    private enemiesFactory: EnemiesFactory,
    private target: Hero,
    private entityes: EntityArrayType,
    private powerupFactory: PowerupsFactory
  ) {}

  public createScene() {
    this.createDecoration();
    this.createPlatforms();
    this.createGround();
    this.createStep();
    this.createWater();
    this.createBossWall();
    this.createInterective();
    this.createEnemieRunners();
    this.createEnemieTourelles();
    this.createPowerUps();
  }

  private createDecoration () {
    for (let i = 22; i < 52; i++) {
      this.platformFactory.createJungle(this.boxSize * i, 0)
    }
  }

  private createPlatforms() {
    const platformsCoordinate = [
      {
        y: 276,
        x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      },
      {
        y: 384,
        x: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24,
          25, 34, 35, 36, 45, 46, 48,
        ],
      },
      {
        y: 492,
        x: [5, 6, 7, 13, 14, 31, 32, 49],
      },
      {
        y: 578,
        x: [46, 47, 48],
      },
      {
        y: 600,
        x: [8, 11, 28, 29, 30],
      },
      {
        y: 624,
        x: [50],
      },
    ];

    for (const index of platformsCoordinate) {
      for (let i = 0; i < index.x.length; i++) {
        this.platforms.push(
          this.platformFactory.createPlatform(
            this.boxSize * index.x[i],
            index.y
          )
        );
      }
    }
  }

  private createGround() {
    const boxCoordinate = [
      {
        y: 600,
        x: [36, 37, 39, 40],
      },
      {
        y: 492,
        x: [42, 43],
      },
      {
        y: 720,
        x: [35, 45, 46, 47, 48, 49, 50, 51, 52],
      },
    ];

    for (const index of boxCoordinate) {
      for (let i = 0; i < index.x.length; i++) {
        this.platforms.push(
          this.platformFactory.createBox(this.boxSize * index.x[i], index.y)
        );
      }
    }
  }

  private createStep() {
    const boxCoordinate = [
      {
        y: 720,
        x: [9, 10, 25, 26, 27, 32, 33, 34],
      },
    ];

    for (const index of boxCoordinate) {
      for (let i = 0; i < index.x.length; i++) {
        this.platforms.push(
          this.platformFactory.createStepBox(this.boxSize * index.x[i], index.y)
        );
      }
    }
  }

  private createWater() {
    const waterCoordinate = [
      {
        y: 768,
        x: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
          22, 23, 24, 28, 29, 30, 31,
        ],
      },
    ];

    for (const index of waterCoordinate) {
      for (let i = 0; i < index.x.length; i++) {
        this.platforms.push(
          this.platformFactory.createWater(this.boxSize * index.x[i], index.y)
        );
      }
    }
  }

  private createBossWall() {
    const waterCoordinate = [
      {
        y: 170,
        x: [52], 
      },
    ];
    for (const index of waterCoordinate) {
      for (let i = 0; i < index.x.length; i++) {
        this.platforms.push(
          this.platformFactory.createBossWall(
            this.boxSize * index.x[i],
            index.y
          )
        );
      }
    }

    /** добавляем сердце босса */
    this.enemiesFactory.createBoss(this.boxSize * 52, 440);

  }

  private createInterective() {
    const coordinatesBridges = [
      {
        y: 384,
        x: [16, 17, 18, 19],
      },
    ];

    this.createBridges(coordinatesBridges);
  }

  private createBridges(coordinates: { y: number; x: number[] }[]) {
    for (const index of coordinates) {
      for (let i = 0; i < index.x.length; i++) {
        const bridge = this.platformFactory.createBridge(
          this.boxSize * index.x[i],
          index.y
        );
        bridge.setTarget(this.target);
        this.platforms.push(bridge);
        this.entityes.push(bridge);
      }
    }
  }

  private createEnemieTourelles() {
    const coordinates = [
      {
        y: 670,
        x: [10, 45.5, 48.5],
      },
      {
        y: 500,
        x: [22.4],
      },
      {
        y: 550,
        x: [29.5, 35.5],
      },
    ];

    for (const index of coordinates) {
      for (let i = 0; i < index.x.length; i++) {
        this.enemiesFactory.createTourelle(this.boxSize * index.x[i], index.y);
      }
    }
  }

  private createEnemieRunners() {
    const runnerJumping = [40, 42];

    const coordinates = [
      {
        y: 290,
        x: [9, 10, 11, 13, 13.4, 13.7, 16, 20, 21, 29, 30],
      },
      {
        y: 400,
        x: [40, 42],
      },
    ];

    for (const index of coordinates) {
      for (let i = 0; i < index.x.length; i++) {
        /** создаем бегуна, вконце добавляем шанс прыжка по платформе */
        this.enemiesFactory.createRunner(
          this.boxSize * index.x[i],
          index.y,
          runnerJumping.includes(index.x[i]) ? 1 : 0.4
        );
      }
    }
  }

  private createPowerUps() {
    const coordinates = [
      {
        y: 150,
        x: [5,15,25],
      },
    ];

    for (const index of coordinates) {
      for (let i = 0; i < index.x.length; i++) {
        this.powerupFactory.createPowerup(this.boxSize * index.x[i], index.y);
      }
    }

  }

}
