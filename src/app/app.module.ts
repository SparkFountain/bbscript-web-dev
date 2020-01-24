import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LexerComponent } from './lexer/lexer.component';
import { CommandsComponent } from './commands/commands.component';
import { ContactComponent } from './contact/contact.component';
import { ImprintComponent } from './imprint/imprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PostComponent } from './post/post.component';
import { CommandsBasicsService } from 'bbscript/src/services/commands/basics.service';
import { CommandsBasicsMathsService } from 'bbscript/src/services/commands/basics/maths.service';
import { AceModule } from 'ngx-ace-wrapper';
import { LexerService } from 'bbscript/src/services/lexer.service';
import { LanguageService } from 'bbscript/src/services/language.service';
import { GeneralService } from 'bbscript/src/services/general.service';
import { GameStateService } from 'bbscript/src/services/game-state.service';
import { CommandsBasicsDiverseService } from 'bbscript/src/services/commands/basics/diverse.service';
import { CommandsBasicsStringsService } from 'bbscript/src/services/commands/basics/strings.service';
import { CommandsBasicsTimeRandomService } from 'bbscript/src/services/commands/basics/time-random.service';
import { CommandsDataBankService } from 'bbscript/src/services/commands/data/bank.service';
import { CommandsDataFileSystemService } from 'bbscript/src/services/commands/data/file-system.service';
import { CommandsGraphics2dDisplayService } from 'bbscript/src/services/commands/graphics2d/display.service';
import { CommandsGraphics2dGraphicsService } from 'bbscript/src/services/commands/graphics2d/graphics.service';
import { CommandsGraphics2dImagesService } from 'bbscript/src/services/commands/graphics2d/images.service';
import { DebugEnvironment } from 'bbscript/src/environment/debug.environment';
import { CommandsGraphics2dMoviesService } from 'bbscript/src/services/commands/graphics2d/movies.service';
import { CommandsGraphics2dPixelService } from 'bbscript/src/services/commands/graphics2d/pixel.service';
import { CommandsGraphics2dTextService } from 'bbscript/src/services/commands/graphics2d/text.service';
import { CommandsGraphics3dAnimationsService } from 'bbscript/src/services/commands/graphics3d/animations.service';
import { CommandsGraphics3dBrushesService } from 'bbscript/src/services/commands/graphics3d/brushes.service';
import { CommandsGraphics3dCameraService } from 'bbscript/src/services/commands/graphics3d/camera.service';
import { CommandsGraphics3dCollisionsService } from 'bbscript/src/services/commands/graphics3d/collisions.service';
import { CommandsGraphics3dControlsService } from 'bbscript/src/services/commands/graphics3d/controls.service';
import { CommandsGraphics3dCoordinatesService } from 'bbscript/src/services/commands/graphics3d/coordinates.service';
import { CommandsGraphics3dDiverseService } from 'bbscript/src/services/commands/graphics3d/diverse.service';
import { CommandsGraphics3dLightShadowService } from 'bbscript/src/services/commands/graphics3d/light-shadow.service';
import { CommandsGraphics3dPickingService } from 'bbscript/src/services/commands/graphics3d/picking.service';
import { CommandsGraphics3dSceneService } from 'bbscript/src/services/commands/graphics3d/scene.service';
import { CommandsGraphics3dSceneryService } from 'bbscript/src/services/commands/graphics3d/scenery.service';
import { CommandsGraphics3dScreenService } from 'bbscript/src/services/commands/graphics3d/screen.service';
import { CommandsGraphics3dSpritesService } from 'bbscript/src/services/commands/graphics3d/sprites.service';
import { CommandsGraphics3dStatusService } from 'bbscript/src/services/commands/graphics3d/status.service';
import { CommandsGraphics3dSurfacesService } from 'bbscript/src/services/commands/graphics3d/surfaces.service';
import { CommandsGraphics3dTerrainService } from 'bbscript/src/services/commands/graphics3d/terrain.service';
import { CommandsGraphics3dTexturesService } from 'bbscript/src/services/commands/graphics3d/textures.service';
import { CommandsGuiButtonService } from 'bbscript/src/services/commands/gui/button.service';
import { CommandsGuiCanvasService } from 'bbscript/src/services/commands/gui/canvas.service';
import { CommandsGuiDesktopService } from 'bbscript/src/services/commands/gui/desktop.service';
import { CommandsGuiDiverseService } from 'bbscript/src/services/commands/gui/diverse.service';
import { CommandsGuiEventService } from 'bbscript/src/services/commands/gui/event.service';
import { CommandsGuiGadgetService } from 'bbscript/src/services/commands/gui/gadget.service';
import { CommandsGuiHtmlService } from 'bbscript/src/services/commands/gui/html.service';
import { CommandsGuiIconStripService } from 'bbscript/src/services/commands/gui/icon-strip.service';
import { CommandsGuiListTabberService } from 'bbscript/src/services/commands/gui/list-tabber.service';
import { CommandsGuiMenuService } from 'bbscript/src/services/commands/gui/menu.service';
import { CommandsGuiPanelService } from 'bbscript/src/services/commands/gui/panel.service';
import { CommandsGuiProgressBarService } from 'bbscript/src/services/commands/gui/progress-bar.service';
import { CommandsGuiRequestService } from 'bbscript/src/services/commands/gui/request.service';
import { CommandsGuiSliderService } from 'bbscript/src/services/commands/gui/slider.service';
import { CommandsGuiTextAreaService } from 'bbscript/src/services/commands/gui/text-area.service';
import { CommandsGuiTextFieldService } from 'bbscript/src/services/commands/gui/text-field.service';
import { CommandsGuiToolbarService } from 'bbscript/src/services/commands/gui/toolbar.service';
import { CommandsGuiTreeViewService } from 'bbscript/src/services/commands/gui/tree-view.service';
import { CommandsGuiWindowService } from 'bbscript/src/services/commands/gui/window.service';
import { CommandsIOGamepadService } from 'bbscript/src/services/commands/io/gamepad.service';
import { CommandsIOKeyboardService } from 'bbscript/src/services/commands/io/keyboard.service';
import { CommandsIOMouseService } from 'bbscript/src/services/commands/io/mouse.service';
import { CommandsSound3DService } from 'bbscript/src/services/commands/sound/3d.service';
import { CommandsSoundChannelsService } from 'bbscript/src/services/commands/sound/channels.service';
import { CommandsSoundMusicSamplesService } from 'bbscript/src/services/commands/sound/music-samples.service';
import { CommandsGraphics3dMeshesService } from 'bbscript/src/services/commands/graphics3d/meshes.service';
import { NgxPopperModule } from 'ngx-popper';
import { BlitzBasicScriptCanvasModule } from 'bbscript/src/components/canvas/canvas.module';
import { CommandsDataService } from 'bbscript/src/services/commands/data.service';
import { CommandsGraphics2DService } from 'bbscript/src/services/commands/graphics2d.service';
import { CommandsGraphics3DService } from 'bbscript/src/services/commands/graphics3d.service';
import { CommandsGUIService } from 'bbscript/src/services/commands/gui.service';
import { CommandsIOService } from 'bbscript/src/services/commands/io.service';
import { CommandsSoundService } from 'bbscript/src/services/commands/sound.service';
import { Render2dService } from 'bbscript/src/services/render2d.service';
import { GamingComponent } from './gaming/gaming.component';
import { BlitzBasicScriptGameModule } from 'bbscript/src/lib/blitz-basic-script-game.module';
import { BlitzBasicScriptGameService } from 'bbscript/src/lib/blitz-basic-script-game.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LexerComponent,
    CommandsComponent,
    ContactComponent,
    ImprintComponent,
    NotFoundComponent,
    TermsOfUseComponent,
    DisclaimerComponent,
    PostComponent,
    GamingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AceModule,
    BlitzBasicScriptGameModule,
    BlitzBasicScriptCanvasModule,
    NgxPopperModule.forRoot({})
  ],
  providers: [
    BlitzBasicScriptGameService,
    LexerService,
    LanguageService,
    GeneralService,
    GameStateService,
    DebugEnvironment,
    CommandsBasicsService,
    CommandsBasicsDiverseService,
    CommandsBasicsMathsService,
    CommandsBasicsStringsService,
    CommandsBasicsTimeRandomService,
    CommandsDataService,
    CommandsDataBankService,
    CommandsDataFileSystemService,
    CommandsGraphics2DService,
    CommandsGraphics2dDisplayService,
    Render2dService,
    CommandsGraphics2dGraphicsService,
    CommandsGraphics2dImagesService,
    CommandsGraphics2dMoviesService,
    CommandsGraphics2dPixelService,
    CommandsGraphics2dTextService,
    CommandsGraphics3DService,
    CommandsGraphics3dAnimationsService,
    CommandsGraphics3dBrushesService,
    CommandsGraphics3dCameraService,
    CommandsGraphics3dCollisionsService,
    CommandsGraphics3dControlsService,
    CommandsGraphics3dCoordinatesService,
    CommandsGraphics3dDiverseService,
    CommandsGraphics3dLightShadowService,
    CommandsGraphics3dMeshesService,
    CommandsGraphics3dPickingService,
    CommandsGraphics3dSceneService,
    CommandsGraphics3dSceneryService,
    CommandsGraphics3dScreenService,
    CommandsGraphics3dSpritesService,
    CommandsGraphics3dStatusService,
    CommandsGraphics3dSurfacesService,
    CommandsGraphics3dTerrainService,
    CommandsGraphics3dTexturesService,
    CommandsGUIService,
    CommandsGuiButtonService,
    CommandsGuiCanvasService,
    CommandsGuiDesktopService,
    CommandsGuiDiverseService,
    CommandsGuiEventService,
    CommandsGuiGadgetService,
    CommandsGuiHtmlService,
    CommandsGuiIconStripService,
    CommandsGuiListTabberService,
    CommandsGuiMenuService,
    CommandsGuiPanelService,
    CommandsGuiProgressBarService,
    CommandsGuiRequestService,
    CommandsGuiSliderService,
    CommandsGuiTextAreaService,
    CommandsGuiTextFieldService,
    CommandsGuiToolbarService,
    CommandsGuiTreeViewService,
    CommandsGuiWindowService,
    CommandsIOService,
    CommandsIOGamepadService,
    CommandsIOKeyboardService,
    CommandsIOMouseService,
    CommandsSoundService,
    CommandsSound3DService,
    CommandsSoundChannelsService,
    CommandsSoundMusicSamplesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
