ace.define("ace/mode/bbscript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (acequire, exports, module) {
  "use strict";

  let oop = acequire("../lib/oop");
  let TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

  let BBScriptHighlightRules = function () {

    let keywordMapper = this.createKeywordMapper({
      "keyword.control.asp": "If|Then|Else|ElseIf|EndIf|End|While|Wend|For|To|Each|Case|Select|Default|Return"
        + "|Until|Next|Exit|Function|Type|After|Before|Delete|First|Last|Insert|Field|Include|Stop|Data|MainLoop"
        + "|Forever|Repeat|Step",
      "storage.type.asp": "Dim|Const|New|Local|Global",
      "keyword.operator.asp": "Mod|And|Not|Or|Xor",
      "constant.language.asp": "False|Null|True|Object",
      "support.class.collection.asp": "Contents|StaticObjects|ClientCertificate|Cookies|Form|QueryString|ServerVariables",
      "support.constant.asp": "Pi",
     "support.function.vb.asp": "CountGfxDrivers|CountGfxModes|EndGraphics|GfxDriverName|GfxModeDepth|GfxModeExists|GfxModeFormat|GfxModeHeight|GfxModeWidth|Graphics|GraphicsBuffer|GraphicsDepth|GraphicsFormat|GraphicsHeight|GraphicsLost|GraphicsWidth|SetGfxDriver|AutoMidHandle|BufferDirty|CopyImage|CreateImage|DrawBlock|DrawBlockRect|DrawImage|DrawImageRect|FreeImage|GrabImage|HandleImage|ImageBuffer|ImageHeight|ImageRectCollide|ImageRectOverlap|ImagesCollide|ImagesOverlap|ImageWidth|ImageXHandle|ImageYHandle|LoadAnimImage|LoadImage|MaskImage|MidHandle|RectsOverlap|ResizeImage|RotateImage|SaveImage|ScaleImage|TFormFilter|TFormImage|TileBlock|TileImage|GammaBlue|GammaGreen|GammaRed|SetGamma|UpdateGamma|AvailVidMem|BackBuffer|Cls|ClsColor|Color|CopyRect|Flip|FrontBuffer|Line|LoadBuffer|Origin|Oval|Rect|SaveBuffer|ScanLine|SetBuffer|TotalVidMem|Viewport|VWait|ColorBlue|ColorGreen|ColorRed|CopyPixel|CopyPixelFast|GetColor|LockBuffer|LockedFormat|LockedPitch|LockedPixels|Plot|ReadPixel|ReadPixelFast|UnlockBuffer|WritePixel|WritePixelFast|FontAscent|FontDescent|FontHeight|FontName|FontSize|FontStyle|FontWidth|FreeFont|LoadFont|Locate|Print|SetFont|StringHeight|StringWidth|Text|Write|CloseMovie|DrawMovie|MovieHeight|MoviePlaying|MovieWidth|OpenMovie|AddAnimSeq|Animate|Animating|AnimLength|AnimSeq|AnimTime|ExtractAnimSeq|LoadAnimSeq|SetAnimKey|SetAnimTime|AlignToVector|MoveEntity|PointEntity|PositionEntity|RotateEntity|ScaleEntity|TranslateEntity|TurnEntity|BrushAlpha|BrushBlend|BrushColor|BrushFX|BrushShininess|BrushTexture|CreateBrush|FreeBrush|GetBrushTexture|GetEntityBrush|GetSurfaceBrush|LoadBrush|PaintEntity|PaintMesh|PaintSurface|BSPAmbientLight|BSPLighting|LoadBSP|CreateMirror|CreatePivot|CreatePlane|GetMatElement|LoaderMatrix|Stats3D|TrisRendered|VectorPitch|VectorYaw|AntiAlias|CaptureWorld|ClearWorld|Dither|HWMultiTex|HWTexUnits|RenderWorld|UpdateWorld|WBuffer|WireFrame|CameraClsColor|CameraClsMode|CameraFogColor|CameraFogMode|CameraFogRange|CameraProject|CameraProjMode|CameraRange|CameraViewport|CameraZoom|CreateCamera|ProjectedX|ProjectedY|ProjectedZ|ClearCollisions|CollisionEntity|CollisionNX|CollisionNY|CollisionNZ|Collisions|CollisionSurface|CollisionTime|CollisionTriangle|CollisionX|CollisionY|CollisionZ|CountCollisions|EntityBox|EntityCollided|EntityRadius|EntityType|GetEntityType|MeshesIntersect|ResetEntity|CopyEntity|EntityAlpha|EntityAutoFade|EntityBlend|EntityColor|EntityFX|EntityOrder|EntityParent|EntityShininess|EntityTexture|FreeEntity|HideEntity|ShowEntity|AmbientLight|CreateLight|LightColor|LightConeAngles|LightMesh|LightRange|AnimateMD2|LoadMD2|MD2Animating|MD2AnimLength|MD2AnimTime|AddMesh|CopyMesh|CreateCone|CreateCube|CreateCylinder|CreateMesh|CreateSphere|FitMesh|FlipMesh|LoadAnimMesh|LoadMesh|MeshCullBox|MeshDepth|MeshHeight|MeshWidth|PositionMesh|RotateMesh|ScaleMesh|CameraPick|EntityPick|EntityPickMode|LinePick|PickedEntity|PickedNX|PickedNY|PickedNZ|PickedSurface|PickedTime|PickedTriangle|PickedX|PickedY|PickedZ|CountGfxModes3D|GfxDriver3D|GfxDriverCaps3D|GfxMode3D|GfxMode3DExists|Graphics3D|Windowed3D|CreateSprite|HandleSprite|LoadSprite|RotateSprite|ScaleSprite|SpriteViewMode|CountChildren|DeltaPitch|DeltaYaw|EntityClass|EntityDistance|EntityInView|EntityName|EntityPitch|EntityRoll|EntityVisible|EntityX|EntityY|EntityYaw|EntityZ|FindChild|GetChild|GetParent|NameEntity|AddTriangle|AddVertex|ClearSurface|CountSurfaces|CountTriangles|CountVertices|CreateSurface|FindSurface|GetSurface|TriangleVertex|UpdateNormals|VertexAlpha|VertexBlue|VertexColor|VertexCoords|VertexGreen|VertexNormal|VertexNX|VertexNY|VertexNZ|VertexRed|VertexTexCoords|VertexU|VertexV|VertexW|VertexX|VertexY|VertexZ|CreateTerrain|LoadTerrain|ModifyTerrain|TerrainDetail|TerrainHeight|TerrainShading|TerrainSize|TerrainX|TerrainY|TerrainZ|ActiveTextures|ClearTextureFilters|CreateTexture|FreeTexture|LoadAnimTexture|LoadTexture|PositionTexture|RotateTexture|ScaleTexture|SetCubeFace|SetCubeMode|TextureBlend|TextureBuffer|TextureCoords|TextureFilter|TextureHeight|TextureName|TextureWidth|TFormedX|TFormedY|TFormedZ|TFormNormal|TFormPoint|TFormVector|ChangeDir|CloseDir|CloseFile|CopyFile|CreateDir|CurrentDir|DeleteDir|DeleteFile|Eof|ExecFile|FilePos|FileSize|FileType|MoreFiles|NextFile|OpenFile|ReadAvail|ReadByte|ReadDir|ReadFile|ReadFloat|ReadInt|ReadLine|ReadShort|ReadString|SeekFile|WriteByte|WriteFile|WriteFloat|WriteInt|WriteLine|WriteShort|WriteString|GetJoy|FlushJoy|BankSize|CopyBank|CreateBank|FreeBank|PeekByte|PeekFloat|PeekInt|PeekShort|PokeByte|PokeFloat|PokeInt|PokeShort|ReadBytes|ResizeBank|WriteBytes|JoyDown|JoyHat|JoyHit|JoyPitch|JoyRoll|JoyType|JoyU|JoyUDir|JoyV|JoyVDir|JoyWait|JoyX|JoyXDir|JoyY|JoyYaw|JoyYDir|JoyZ|JoyZDir|WaitJoy|FlushMouse|GetMouse|HidePointer|MouseDown|MouseHit|MouseWait|MouseX|MouseXSpeed|MouseY|MouseYSpeed|MouseZ|MouseZSpeed|MoveMouse|ShowPointer|WaitMouse|FlushKeys|GetKey|Input|KeyDown|KeyHit|KeyWait|WaitKey|Abs|ACos|ASin|ATan|ATan2|Bin|Ceil|Cos|Exp|Float|Floor|Hex|Int|Log|Log10|Sgn|Sin|Sqr|Tan|AppTitle|CallDLL|CommandLine|DebugLog|DirectInputEnabled|EnableDirectInput|GetEnv|RuntimeError|RuntimeStats|SetEnv|SystemProperty|Asc|Chr|Instr|Left|Len|Lower|LSet|Mid|Replace|Right|RSet|Str|String|Trim|Upper|CreateTimer|CurrentDate|CurrentTime|Delay|FreeTimer|MilliSecs|PauseTimer|Rand|ResetTimer|ResumeTimer|Rnd|RndSeed|SeedRnd|TimerTicks|WaitTimer|ButtonState|CreateButton|SetButtonState|CanvasBuffer|CreateCanvas|FlipCanvas|Desktop|DesktopBuffer|ActiveObjects|AutoSuspend|CreateProcess|DebugObjects|EventData|EventID|EventSource|EventX|EventY|EventZ|FlushEvents|HotKeyEvent|PeekEvent|WaitEvent|ActivateGadget|ClientHeight|ClientWidth|DisableGadget|EnableGadget|FreeGadget|GadgetFont|GadgetGroup|GadgetHeight|GadgetText|GadgetWidth|GadgetX|GadgetY|HideGadget|QueryObject|SetGadgetFont|SetGadgetLayout|SetGadgetShape|SetGadgetText|ShowGadget|CreateHtmlView|HtmlViewBack|HtmlViewCurrentURL|HtmlViewEventURL|HtmlViewForward|HtmlViewGo|HtmlViewRun|HtmlViewStatus|FreeIconStrip|LoadIconStrip|SetGadgetIconStrip|AddGadgetItem|ClearGadgetItems|CountGadgetItems|CreateComboBox|CreateListBox|CreateTabber|GadgetItemText|InsertGadgetItem|ModifyGadgetItem|RemoveGadgetItem|SelectedGadgetItem|SelectGadgetItem|CheckMenu|CreateMenu|DisableMenu|EnableMenu|MenuChecked|MenuEnabled|MenuText|SetMenuText|UncheckMenu|UpdateWindowMenu|WindowMenu|CreatePanel|SetPanelColor|SetPanelImage|CreateProgBar|UpdateProgBar|Confirm|Notify|Proceed|RequestColor|RequestDir|RequestedBlue|RequestedGreen|RequestedRed|RequestFile|RequestFont|CreateSlider|SetSliderRange|SetSliderValue|SliderValue|AddTextAreaText|CreateTextArea|FormatTextAreaText|LockTextArea|SetTextAreaColor|SetTextAreaFont|SetTextAreaTabs|SetTextAreaText|TextAreaChar|TextAreaCursor|TextAreaLen|TextAreaLine|TextAreaLineLen|TextAreaSelLen|TextAreaText|UnlockTextArea|CreateLabel|CreateTextField|TextFieldText|CreateToolBar|DisableToolBarItem|EnableToolBarItem|SetToolBarTips|AddTreeViewNode|CollapseTreeViewNode|CountTreeViewNodes|CreateTreeView|ExpandTreeViewNode|FreeTreeViewNode|InsertTreeViewNode|ModifyTreeViewNode|SelectedTreeViewNode|SelectTreeViewNode|TreeViewNodeText|TreeViewRoot|ActivateWindow|ActiveWindow|CreateWindow|MaximizeWindow|MinimizeWindow|RestoreWindow|SetMinWindowSize|SetStatusText|WindowMaximized|WindowMinimized|CopyStream|CountHostIPs|DottedIP|HostIP|CreateNetPlayer|DeleteNetPlayer|HostNetGame|JoinNetGame|NetMsgData|NetMsgFrom|NetMsgTo|NetMsgType|NetPlayerLocal|NetPlayerName|RecvNetMsg|SendNetMsg|StartNetGame|StopNetGame|AcceptTCPStream|CloseTCPServer|CloseTCPStream|CreateTCPServer|OpenTCPStream|TCPStreamIP|TCPStreamPort|TCPTimeouts|CloseUDPStream|CreateUDPStream|RecvUDPMsg|SendUDPMsg|UDPMsgIP|UDPMsgPort|UDPStreamIP|UDPStreamPort|UDPTimeouts|CreateListener|EmitSound|Load3DSound|ChannelPan|ChannelPitch|ChannelPlaying|ChannelVolume|PauseChannel|ResumeChannel|StopChannel|PlayCDTrack|PlayMusic|FreeSound|LoadSound|LoopSound|PlaySound|SoundPan|SoundPitch|SoundVolume"
    }, "identifier", true);

    this.$rules = {
      "start": [
        {
          token: [
            "meta.ending-space"
          ],
          regex: "$"
        },
        {
          token: [null],
          regex: "^(?=\\t)",
          next: "state_3"
        },
        {
          token: [null],
          regex: "^(?= )",
          next: "state_4"
        },
        {
          token: [
            "text",
            "storage.type.function.asp",
            "text",
            "entity.name.function.asp",
            "text",
            "punctuation.definition.parameters.asp",
            "variable.parameter.function.asp",
            "punctuation.definition.parameters.asp"
          ],
          regex: "^(\\s*)(Function|Sub)(\\s+)([a-zA-Z_]\\w*)(\\s*)(\\()([^)]*)(\\))"
        },
        {
          token: "punctuation.definition.comment.asp",
          regex: ";(?=\\s|$)",
          next: "comment",
          caseInsensitive: true
        },
        {
          token: "storage.type.asp",
          regex: "On Error Resume Next|On Error GoTo",
          caseInsensitive: true
        },
        {
          token: "punctuation.definition.string.begin.asp",
          regex: '"',
          next: "string"
        },
        {
          token: [
            "punctuation.definition.variable.asp"
          ],
          regex: "(\\$)[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b\\s*"
        },
        {
          token: "constant.numeric.asp",
          regex: "-?\\b(?:(?:0(?:x|X)[0-9a-fA-F]*)|(?:(?:[0-9]+\\.?[0-9]*)|(?:\\.[0-9]+))(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"
        },
        {
          regex: "\\w+",
          token: keywordMapper
        },
        {
          token: ["entity.name.function.asp"],
          regex: "(?:(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b)(?=\\(\\)?))"
        },
        {
          token: ["keyword.operator.asp"],
          regex: "\\-|\\+|\\*\\/|\\>|\\<|\\=|\\&"
        }
      ],
      "state_3": [
        {
          token: [
            "meta.odd-tab.tabs",
            "meta.even-tab.tabs"
          ],
          regex: "(\\t)(\\t)?"
        },
        {
          token: "meta.leading-space",
          regex: "(?=[^\\t])",
          next: "start"
        },
        {
          token: "meta.leading-space",
          regex: ".",
          next: "state_3"
        }
      ],
      "state_4": [
        {
          token: ["meta.odd-tab.spaces", "meta.even-tab.spaces"],
          regex: "(  )(  )?"
        },
        {
          token: "meta.leading-space",
          regex: "(?=[^ ])",
          next: "start"
        },
        {
          defaultToken: "meta.leading-space"
        }
      ],
      "comment": [
        {
          token: "comment.line.apostrophe.asp",
          regex: "$|(?=(?:%>))",
          next: "start"
        },
        {
          defaultToken: "comment.line.apostrophe.asp"
        }
      ],
      "string": [
        {
          token: "constant.character.escape.apostrophe.asp",
          regex: '""'
        },
        {
          token: "string.quoted.double.asp",
          regex: '"',
          next: "start"
        },
        {
          defaultToken: "string.quoted.double.asp"
        }
      ]
    };

  };

  oop.inherits(BBScriptHighlightRules, TextHighlightRules);

  exports.BBScriptHighlightRules = BBScriptHighlightRules;
});

ace.define("ace/mode/bbscript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/bbscript_highlight_rules"], function (acequire, exports, module) {
  "use strict";

  let oop = acequire("../lib/oop");
  let TextMode = acequire("./text").Mode;
  let BBScriptHighlightRules = acequire("./bbscript_highlight_rules").BBScriptHighlightRules;

  let Mode = function () {
    this.HighlightRules = BBScriptHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
  };
  oop.inherits(Mode, TextMode);

  (function () {

    this.lineCommentStart = [";"];

    this.$id = "ace/mode/bbscript";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
