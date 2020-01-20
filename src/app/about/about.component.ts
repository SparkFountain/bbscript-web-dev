import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AceConfig } from '../interfaces/ace-config.interface';
import { AceDirective } from 'ngx-ace-wrapper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild(AceDirective, { static: false }) directiveRef?: AceDirective;

  public ace: AceConfig;
  public features: Feature[];

  constructor(private translate: TranslateService) {
    this.ace = {
      instance: null,
      config: {
        mode: 'bbscript',
        theme: 'terminal',
        wrap: false,
        readOnly: true
      },
      code: ''
    };
  }

  ngOnInit(): void {
    const images: string[] = [
      'laptop.jpeg',
      'palm-trees.jpeg',
      'devices.jpg',
      'keyboard.jpeg',
      'super-mario.jpeg',
      'gamble.jpeg',
      'shadow.jpg',
      'community.jpg',
      'dart.jpeg'
    ];

    this.features = [];

    // TODO: fix
    setTimeout(() => {
      for (let i = 0; i <= 8; i++) {
        this.features.push({
          title: this.translate.instant(`FEATURES.${i + 1}.TITLE`),
          message: this.translate.instant(`FEATURES.${i + 1}.MESSAGE`),
          image: `/assets/gfx/${images[i]}`
        });
      }
    }, 100);
  }

  ngAfterViewInit(): void {
    this.ace.instance = this.directiveRef.ace();
    this.directiveRef.setValue(`Graphics3D width, height, 32, mode
SetBuffer BackBuffer()

; environment
AmbientLight 200, 200, 200

cam = CreateCamera()
CameraClsColor cam, 135, 206, 235

light = CreateLight()
RotateEntity light, 0, 30, 0

; aircraft
aircraft = LoadSprite("gfx/aircraft.png", 2)
EntityBox aircraft, 0, 0, 0, 1, 1, 1
EntityType aircraft, 1
PositionEntity aircraft, 64, 10, 2
PositionEntity cam, 64, 10, 0
EntityParent cam, aircraft
speed#=0.1
If cheat = "highspeed" Then speed = 0.3

; water
water = LoadTerrain("gfx/watertexture.png")
TerrainShading water, 1
waterTexture = LoadTexture("gfx/water.png")
EntityTexture water, waterTexture
PositionEntity water, -64, 0, -64

; island
island = LoadTerrain("gfx/map" + Rand(1, 5) + ".png")
terrainTexture = LoadTexture("gfx/terrain.png")
ScaleTexture terrainTexture, 10, 10
EntityTexture island, terrainTexture
ScaleEntity island, 1, 5, 1
PositionEntity island, 0, -0.1, 0
TerrainDetail island, 3000, 1
TerrainShading island, 1`);
  }
}

export interface Feature {
  title: string;
  message: string;
  image: string;
}
