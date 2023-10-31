(self.webpackChunkangular_avatar_editors=self.webpackChunkangular_avatar_editors||[]).push([[318],{"./packages/microsoft-avatar-editor/src/lib/avatar-editor.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>avatar_editor_component_stories});var animations=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var avatar_editor_componentngResource=__webpack_require__("./packages/microsoft-avatar-editor/src/lib/avatar-editor.component.scss?ngResource"),avatar_editor_componentngResource_default=__webpack_require__.n(avatar_editor_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),tabs=__webpack_require__("./node_modules/@angular/material/fesm2022/tabs.mjs"),src=__webpack_require__("./packages/gestures/src/index.ts"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),combineLatest=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js");let NgxAvatarEditorStore=class NgxAvatarEditorStore{constructor(){this.imageSize=(0,core.signal)({naturalWidth:0,naturalHeight:0}),this.cropBounds=(0,core.signal)(new DOMRectReadOnly),this.initialScale=(0,core.computed)((()=>1/this.maximumScale())),this.maximumScale=(0,core.computed)((()=>Math.min(this.imageSize().naturalWidth/this.cropBounds().width,this.imageSize().naturalHeight/this.cropBounds().height))),this.relativeScale=(0,core.signal)(0),this.absoluteScale=(0,core.computed)((()=>Math.exp(this.relativeScale()*Math.log(this.maximumScale())))),this.absoluteRotation=(0,core.signal)(0),this.zoomStepSize=(0,core.computed)((()=>Math.min(1,Math.max(.01,Math.min(this.cropBounds().width,this.cropBounds().height)/(2*Math.max(this.imageSize().naturalWidth,this.imageSize().naturalHeight)))))),this.imageWidth=(0,core.computed)((()=>this.imageSize().naturalWidth*this.absoluteScale()/this.maximumScale())),this.imageHeight=(0,core.computed)((()=>this.imageSize().naturalHeight*this.absoluteScale()/this.maximumScale()))}};NgxAvatarEditorStore=(0,tslib_es6.gn)([(0,core.Injectable)()],NgxAvatarEditorStore);let NgxAvatarEditorCanvasDirective=class NgxAvatarEditorCanvasDirective{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.#injector=(0,core.inject)(core.Injector),this.#store=(0,core.inject)(NgxAvatarEditorStore),this.#canvas=this.#elementRef.nativeElement,this.#context=this.#canvas.getContext("2d"),this.#image=new Image,this.#translation=(0,core.signal)(new DOMPointReadOnly),this._hostElement=this.#elementRef.nativeElement}#destroyRef;#elementRef;#injector;#store;#canvas;#context;#image;#translation;get src(){return this.#src}set src(value){this.#src=value,this.#loadImage(this.#src)}#src;ngAfterViewInit(){(0,combineLatest.a)([(0,rxjs_interop.Dx)(this.#store.cropBounds,{injector:this.#injector}),(0,rxjs_interop.Dx)(this.#store.imageSize,{injector:this.#injector})]).pipe((0,rxjs_interop.sL)(this.#destroyRef)).subscribe((([bounds,size])=>this.#fitImage(bounds,size))),(0,core.effect)((()=>this.#draw(this.#translation())),{injector:this.#injector})}_scaleBy(step,globalOrigin){const cx=(this.#store.cropBounds().width-this.#store.imageWidth())/2,cy=(this.#store.cropBounds().height-this.#store.imageHeight())/2,currentScale=this.#store.absoluteScale();if(this.#store.relativeScale.update((value=>this.#clamp(value+step,0,1))),globalOrigin){const ox=globalOrigin.x-this.#store.cropBounds().x,oy=globalOrigin.y-this.#store.cropBounds().y,nx=this.#clamp(ox+(this.#translation().x-ox)*this.#store.absoluteScale()/currentScale,this.#store.cropBounds().width-this.#store.imageWidth(),0),ny=this.#clamp(oy+(this.#translation().y-oy)*this.#store.absoluteScale()/currentScale,this.#store.cropBounds().height-this.#store.imageHeight(),0);return void this.#translation.set(new DOMPointReadOnly(nx,ny))}const dx=(this.#store.cropBounds().width-this.#store.imageWidth())/2-cx,dy=(this.#store.cropBounds().height-this.#store.imageHeight())/2-cy;this._translateBy(dx,dy)}_rotateBy(delta){this.#store.absoluteRotation.update((current=>current+delta))}_translateBy(deltaX,deltaY){const{width,height}=this.#store.cropBounds();this.#translation.update((({x,y})=>new DOMPointReadOnly(this.#clamp(x+deltaX,width-this.#store.imageWidth(),0),this.#clamp(y+deltaY,height-this.#store.imageHeight(),0))))}#loadImage(src){this.#image.onload=()=>{const{naturalWidth,naturalHeight}=this.#image;this.#store.imageSize.set({naturalWidth,naturalHeight})},this.#image.src=src}#fitImage(cropBounds,imageSize){const{naturalWidth,naturalHeight}=imageSize,{width,height}=cropBounds,x=(width-naturalWidth*this.#store.initialScale())/2,y=(height-naturalHeight*this.#store.initialScale())/2;this.#translation.set(new DOMPointReadOnly(x,y))}#draw(translation){const{width,height}=this.#store.cropBounds();this.#context.fillRect(0,0,width,height),this.#context.save(),this.#context.translate(width/2,height/2),this.#context.transform(1,0,0,1,0,0),this.#context.rotate(this.#store.absoluteRotation()*Math.PI/180),this.#context.translate(-1*width/2,-1*height/2),this.#context.drawImage(this.#image,translation.x,translation.y,this.#store.imageWidth(),this.#store.imageHeight()),this.#context.restore()}#clamp(value,min,max){return Math.min(max,Math.max(min,value))}static#_=this.propDecorators={src:[{type:core.Input,args:[{required:!0}]}]}};NgxAvatarEditorCanvasDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"canvas[ngxAvatarEditorCanvas]",standalone:!0})],NgxAvatarEditorCanvasDirective);var avatar_editor_rotate_controls_component=__webpack_require__("./packages/microsoft-avatar-editor/src/lib/avatar-editor-rotate-controls.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgZ2FwOiA4cHg7CiAgICAgIH0KICAgIA%3D%3D!./packages/microsoft-avatar-editor/src/lib/avatar-editor-rotate-controls.component.ts"),avatar_editor_rotate_controls_component_default=__webpack_require__.n(avatar_editor_rotate_controls_component),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),slider=__webpack_require__("./node_modules/@angular/material/fesm2022/slider.mjs");let NgxAvatarEditorRotateControlsComponent=class NgxAvatarEditorRotateControlsComponent{constructor(){this.#previousRotationSliderValue=0,this.valueFormatFn=value=>value.toString(),this.rotateBy=new core.EventEmitter}#previousRotationSliderValue;rotationChangeHandler(eventOrValue){let value=0;value=eventOrValue instanceof Event?eventOrValue.target.valueAsNumber:eventOrValue;const delta=value-this.#previousRotationSliderValue;this.#previousRotationSliderValue=value,this.updateRotation(delta)}updateRotation(value){this.rotateBy.emit(value)}static#_=this.propDecorators={valueFormatFn:[{type:core.Input}],rotateBy:[{type:core.Output}]}};NgxAvatarEditorRotateControlsComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ngx-avatar-editor-rotate-controls",standalone:!0,imports:[common.CommonModule,slider.KP,fesm2022_button.ot,icon.Ps],template:'\n    <button mat-icon-button (click)="updateRotation(-90)">\n      <span class="cdk-visually-hidden"\n        >Rotate 90 degrees counter clockwise</span\n      >\n      <mat-icon>rotate_90_degrees_ccw</mat-icon>\n    </button>\n    <mat-slider min="-45" max="45" [displayWith]="valueFormatFn">\n      <input matSliderThumb value="0" (input)="rotationChangeHandler($event)" />\n    </mat-slider>\n    <button mat-icon-button (click)="updateRotation(90)">\n      <span class="cdk-visually-hidden">Rotate 90 degrees clockwise</span>\n      <mat-icon>rotate_90_degrees_cw</mat-icon>\n    </button>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_editor_rotate_controls_component_default()]})],NgxAvatarEditorRotateControlsComponent);var avatar_editor_zoom_controls_component=__webpack_require__("./packages/microsoft-avatar-editor/src/lib/avatar-editor-zoom-controls.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgZ2FwOiA4cHg7CiAgICAgIH0KICAgIA%3D%3D!./packages/microsoft-avatar-editor/src/lib/avatar-editor-zoom-controls.component.ts"),avatar_editor_zoom_controls_component_default=__webpack_require__.n(avatar_editor_zoom_controls_component);let NgxAvatarEditorZoomControlsComponent=class NgxAvatarEditorZoomControlsComponent{constructor(){this.valueFormatFn=value=>value.toString(),this.zoomBy=new core.EventEmitter,this.zoomTo=new core.EventEmitter}increment(){this.zoomBy.emit(this.zoomStepValue)}decrement(){this.zoomBy.emit(-1*this.zoomStepValue)}updateZoom(eventOrValue){let value=0;value=eventOrValue instanceof Event?eventOrValue.target.valueAsNumber:eventOrValue;const percentage=(value-this.minZoom)/(this.maxZoom-this.minZoom);this.zoomTo.emit(percentage)}static#_=this.propDecorators={valueFormatFn:[{type:core.Input}],zoomBy:[{type:core.Output}],zoomTo:[{type:core.Output}],minZoom:[{type:core.Input,args:[{transform:core.numberAttribute,required:!0}]}],maxZoom:[{type:core.Input,args:[{transform:core.numberAttribute,required:!0}]}],zoomValue:[{type:core.Input,args:[{transform:core.numberAttribute,required:!0}]}],zoomStepValue:[{type:core.Input,args:[{transform:core.numberAttribute,required:!0}]}],canDecrement:[{type:core.Input,args:[{transform:core.booleanAttribute,required:!0}]}],canIncrement:[{type:core.Input,args:[{transform:core.booleanAttribute,required:!0}]}]}};NgxAvatarEditorZoomControlsComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ngx-avatar-editor-zoom-controls",standalone:!0,imports:[common.CommonModule,slider.KP,fesm2022_button.ot,icon.Ps],template:'\n    <button mat-icon-button [disabled]="!canDecrement" (click)="decrement()">\n      <span class="cdk-visually-hidden">Zoom Out</span>\n      <mat-icon>remove_circle_outline</mat-icon>\n    </button>\n    <mat-slider [min]="minZoom" [max]="maxZoom" [displayWith]="valueFormatFn">\n      <input\n        matSliderThumb\n        [value]="zoomValue"\n        (input)="updateZoom($event)"\n        (valueChange)="updateZoom($event)"\n      />\n    </mat-slider>\n    <button mat-icon-button [disabled]="!canIncrement" (click)="increment()">\n      <span class="cdk-visually-hidden">Zoom In</span>\n      <mat-icon>add_circle_outline</mat-icon>\n    </button>\n  ',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_editor_zoom_controls_component_default()]})],NgxAvatarEditorZoomControlsComponent);let NgxAvatarEditorComponent=class NgxAvatarEditorComponent{constructor(){this.store=(0,core.inject)(NgxAvatarEditorStore),this.rotateValueFormatFn=value=>`${value}º`,this.zoomValueFormatFn=value=>`${value}%`,this.minZoom=100,this.maxZoom=(0,core.computed)((()=>Math.round(100*this.store.maximumScale()))),this.zoomValue=(0,core.computed)((()=>Math.round(this.minZoom+(this.maxZoom()-this.minZoom)*this.store.relativeScale()))),this.canDecrementZoom=(0,core.computed)((()=>this.zoomValue()>this.minZoom)),this.canIncrementZoom=(0,core.computed)((()=>this.zoomValue()<this.maxZoom()))}zoomBy(stepOrEvent){if("object"==typeof stepOrEvent){const{step,globalOrigin}=stepOrEvent;this._canvas._scaleBy(step,globalOrigin)}else this._canvas._scaleBy(stepOrEvent)}zoomTo(value){value!==this.store.relativeScale()&&this.zoomBy(value-this.store.relativeScale())}rotateBy(delta){this._canvas._rotateBy(delta)}moveBy(point){this._canvas._translateBy(point.deltaX,point.deltaY)}ngAfterViewInit(){const canvasElement=this._canvas._hostElement,bounds=canvasElement.getBoundingClientRect();canvasElement.width=bounds.width,canvasElement.height=bounds.height,this.store.cropBounds.set(bounds)}static#_=this.propDecorators={src:[{type:core.Input,args:[{required:!0}]}],_canvas:[{type:core.ViewChild,args:[NgxAvatarEditorCanvasDirective]}]}};NgxAvatarEditorComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ngx-avatar-editor",standalone:!0,imports:[common.CommonModule,NgxAvatarEditorCanvasDirective,NgxAvatarEditorZoomControlsComponent,NgxAvatarEditorRotateControlsComponent,tabs.Nh,src.of,src.D2],template:'<div\n  id="editor"\n  ngxPointerDrag\n  ngxMouseWheelZoom\n  (moveBy)="moveBy($event)"\n  (zoomBy)="zoomBy($event)"\n>\n  <canvas ngxAvatarEditorCanvas [src]="src"></canvas>\n  <div id="shade"></div>\n</div>\n\n<mat-tab-group\n  mat-stretch-tabs="false"\n  mat-align-tabs="center"\n  fitInkBarToContent="true"\n  headerPosition="below"\n  disablePagination="true"\n  animationDuration="0"\n>\n  <mat-tab label="Zoom">\n    <ngx-avatar-editor-zoom-controls\n      [minZoom]="minZoom"\n      [maxZoom]="maxZoom()"\n      [zoomStepValue]="store.zoomStepSize()"\n      [zoomValue]="zoomValue()"\n      [canDecrement]="canDecrementZoom()"\n      [canIncrement]="canIncrementZoom()"\n      [valueFormatFn]="zoomValueFormatFn"\n      (zoomBy)="zoomBy($event)"\n      (zoomTo)="zoomTo($event)"\n  /></mat-tab>\n  <mat-tab label="Rotate"\n    ><ngx-avatar-editor-rotate-controls\n      [valueFormatFn]="rotateValueFormatFn"\n      (rotateBy)="rotateBy($event)"\n  /></mat-tab>\n</mat-tab-group>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,providers:[NgxAvatarEditorStore],styles:[avatar_editor_componentngResource_default()]})],NgxAvatarEditorComponent);const avatar_editor_component_stories={component:NgxAvatarEditorComponent,title:"Components/MicrosoftAvatarEditor",decorators:[(0,dist.applicationConfig)({providers:[(0,animations.provideAnimations)()]})],parameters:{layout:"centered"}},Primary={args:{src:"grace-hilty-uvAhJHLul_Q-unsplash.jpg"}}},"./packages/gestures/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D2:()=>MouseWheelZoomDirective,of:()=>PointerDragDirective});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let MouseWheelZoomDirective=class MouseWheelZoomDirective{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.step=.1,this.zoomBy=new core.EventEmitter}#destroyRef;#elementRef;ngAfterViewInit(){const element=this.#elementRef.nativeElement;(0,fromEvent.R)(element,"wheel",{passive:!1,capture:!0}).pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,tap.b)((event=>event.preventDefault())),(0,map.U)((event=>({step:-1*Math.sign(event.deltaY)*(event.ctrlKey?.1*this.step:this.step),globalOrigin:new DOMPointReadOnly(event.clientX,event.clientY)})))).subscribe((zoom=>this.zoomBy.emit(zoom)))}static#_=this.propDecorators={step:[{type:core.Input,args:[{transform:core.numberAttribute}]}],zoomBy:[{type:core.Output}]}};MouseWheelZoomDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[ngxMouseWheelZoom]",standalone:!0})],MouseWheelZoomDirective);var filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),fromEventPattern=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js"),share=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js");class Pointer{constructor(event){this.initial=this.previous=this.current=event}update(event){this.previous=this.current,this.current=event}}class PointerTracker{#pointers=new Map;get pointers(){return this.#pointers}constructor(target){this.start=(0,fromEventPattern.R)((handler=>target.addEventListener("pointerdown",handler)),(handler=>target.removeEventListener("pointerdown",handler))).pipe((0,tap.b)((event=>event.preventDefault())),(0,tap.b)((event=>{this.#pointers.set(event.pointerId,new Pointer(event))})),(0,share.B)()),this.move=(0,fromEventPattern.R)((handler=>target.addEventListener("pointermove",handler)),(handler=>target.removeEventListener("pointermove",handler))).pipe((0,tap.b)((event=>{const pointer=this.#pointers.get(event.pointerId);pointer&&pointer.update(event)})),(0,share.B)()),this.end=(0,fromEventPattern.R)((handler=>{target.addEventListener("pointerup",handler),target.addEventListener("pointercancel",handler)}),(handler=>{target.removeEventListener("pointerup",handler),target.removeEventListener("pointercancel",handler)})).pipe((0,tap.b)((event=>{this.#pointers.delete(event.pointerId)})),(0,filter.h)((()=>0===this.#pointers.size)),(0,share.B)())}}let PointerTrackerFactory=class PointerTrackerFactory{#elementTrackerMap=new WeakMap;attach(target){if(this.#elementTrackerMap.has(target))return this.#elementTrackerMap.get(target);const tracker=new PointerTracker(target);return this.#elementTrackerMap.set(target,tracker),tracker}detach(target){this.#elementTrackerMap.has(target)&&this.#elementTrackerMap.delete(target)}};PointerTrackerFactory=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],PointerTrackerFactory);let PointerDragDirective=class PointerDragDirective{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.#pointerTrackerFactory=(0,core.inject)(PointerTrackerFactory),this.moveBy=new core.EventEmitter}#destroyRef;#elementRef;#pointerTrackerFactory;ngAfterViewInit(){const element=this.#elementRef.nativeElement,pointerTracker=this.#pointerTrackerFactory.attach(element);pointerTracker.start.pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,filter.h)((()=>1===pointerTracker.pointers.size)),(0,switchMap.w)((()=>pointerTracker.move.pipe((0,takeUntil.R)(pointerTracker.end),(0,tap.b)((event=>element.setPointerCapture(event.pointerId))),(0,map.U)((()=>Array.from(pointerTracker.pointers.values()))),(0,map.U)((pointers=>({deltaX:pointers[0].current.x-pointers[0].previous.x,deltaY:pointers[0].current.y-pointers[0].previous.y}))))))).subscribe((coords=>{this.moveBy.emit(coords)}))}static#_=this.propDecorators={moveBy:[{type:core.Output}]}};PointerDragDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[ngxPointerDrag]",standalone:!0})],PointerDragDirective)},"./packages/microsoft-avatar-editor/src/lib/avatar-editor-rotate-controls.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgZ2FwOiA4cHg7CiAgICAgIH0KICAgIA%3D%3D!./packages/microsoft-avatar-editor/src/lib/avatar-editor-rotate-controls.component.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/microsoft-avatar-editor/src/lib/avatar-editor-zoom-controls.component.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgIDpob3N0IHsKICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgZ2FwOiA4cHg7CiAgICAgIH0KICAgIA%3D%3D!./packages/microsoft-avatar-editor/src/lib/avatar-editor-zoom-controls.component.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n      :host {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 8px;\n      }\n    ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/microsoft-avatar-editor/src/lib/avatar-editor.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  outline: 0;\n  overflow: hidden;\n  width: 256px;\n  height: 600px;\n}\n\n#editor {\n  width: 256px;\n  height: 256px;\n}\n\ncanvas[ngxAvatarEditorCanvas] {\n  width: 256px;\n  height: 256px;\n}\n\nmat-tab-group {\n  height: 100px;\n}\n\n#shade {\n  box-sizing: border-box;\n  position: absolute;\n  inset: 0;\n  max-height: 256px;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  outline: max(100vw, 100vh) solid rgba(255, 255, 255, 0.4);\n  pointer-events: none;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);