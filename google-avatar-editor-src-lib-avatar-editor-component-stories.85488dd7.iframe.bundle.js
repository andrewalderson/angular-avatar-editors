(self.webpackChunkangular_avatar_editors=self.webpackChunkangular_avatar_editors||[]).push([[60],{"./packages/google-avatar-editor/src/lib/avatar-editor.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>avatar_editor_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var avatar_editor_componentngResource=__webpack_require__("./packages/google-avatar-editor/src/lib/avatar-editor.component.scss?ngResource"),avatar_editor_componentngResource_default=__webpack_require__.n(avatar_editor_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),src=__webpack_require__("./packages/gestures/src/index.ts"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),combineLatest=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js");let NgxAvatarEditorImageDirective=class NgxAvatarEditorImageDirective{#destoryRef=(0,core.inject)(core.DestroyRef);#elementRef=(0,core.inject)(core.ElementRef);#injector=(0,core.inject)(core.Injector);loadHandler(){const{naturalWidth,naturalHeight}=this.#elementRef.nativeElement;this.#imageSize.set({naturalWidth,naturalHeight})}#matrix;#imageSize=(0,core.signal)({naturalWidth:0,naturalHeight:0});#cropBounds=(0,core.signal)(new DOMRectReadOnly);#cropBoundsCenter=(0,core.computed)((()=>new DOMPointReadOnly(this.#cropBounds().left+this.#cropBounds().width/2,this.#cropBounds().top+this.#cropBounds().height/2)));#maxScale=1;#minScale=(0,core.computed)((()=>1/Math.min(this.#imageSize().naturalWidth/this.#cropBounds().width,this.#imageSize().naturalHeight/this.#cropBounds().height)));#currentScale=0;#currentRotation=0;ngOnInit(){(0,combineLatest.a)([(0,rxjs_interop.Dx)(this.#cropBounds,{injector:this.#injector}),(0,rxjs_interop.Dx)(this.#imageSize,{injector:this.#injector})]).pipe((0,rxjs_interop.sL)(this.#destoryRef),(0,filter.h)((()=>this.#elementRef.nativeElement.complete)),(0,tap.b)((()=>this.#currentScale=this.#minScale()))).subscribe((([bounds,size])=>this.#fitImage(bounds,size)))}_setCropBounds(bounds){this.#cropBounds.set(bounds)}_scaleBy(step,globalOrigin){const scale=this.#clamp(1+step,this.#minScale()/this.#currentScale,this.#maxScale/this.#currentScale),image=this.#elementRef.nativeElement,currentImageBounds=image.getBoundingClientRect(),currentImageCenter=new DOMPointReadOnly(currentImageBounds.left+currentImageBounds.width/2,currentImageBounds.top+currentImageBounds.height/2);let{x:tx,y:ty}=globalOrigin?globalOrigin.matrixTransform((new DOMMatrix).translateSelf(currentImageCenter.x,currentImageCenter.y).scaleSelf(this.#currentScale).rotateSelf(this.#currentRotation).invertSelf()):new DOMPointReadOnly;if(tx=this.#clamp(tx,-1*image.naturalWidth/2,image.naturalWidth/2),ty=this.#clamp(ty,-1*image.naturalHeight/2,image.naturalHeight/2),this.#matrix?.scaleSelf(scale,scale,void 0,tx,ty),step<0){const scaledImageWidth=image.naturalWidth*this.#currentScale,scaledImageHeight=image.naturalHeight*this.#currentScale,scaledImageCenter=new DOMPointReadOnly(scaledImageWidth/2,scaledImageHeight/2),nextScaledImageWidth=scaledImageWidth*scale,nextScaledImageHeight=scaledImageHeight*scale,imageChangeWidthPercentage=(scaledImageWidth-nextScaledImageWidth)/scaledImageWidth,imageChangeHeightPercentage=(scaledImageHeight-nextScaledImageHeight)/scaledImageHeight,unscaledTranslatePercentageFromCenter=new DOMPointReadOnly(tx/(image.naturalWidth/2),ty/(image.naturalHeight/2)).matrixTransform((new DOMMatrix).rotateSelf(this.#currentRotation)),nextElementCenter=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(scaledImageCenter.x*unscaledTranslatePercentageFromCenter.x*imageChangeWidthPercentage,scaledImageCenter.y*unscaledTranslatePercentageFromCenter.y*imageChangeHeightPercentage)),imageCenterMaximumBounds=new DOMRectReadOnly((this.#cropBounds().width-nextScaledImageWidth)/2,(this.#cropBounds().height-nextScaledImageHeight)/2,nextScaledImageWidth-this.#cropBounds().width,nextScaledImageHeight-this.#cropBounds().height),{x:cx,y:cy}=nextElementCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).rotateSelf(this.#currentRotation).invertSelf());let ax=0,ay=0;cx<imageCenterMaximumBounds.left&&(ax=imageCenterMaximumBounds.left-cx),cx>imageCenterMaximumBounds.right&&(ax=imageCenterMaximumBounds.right-cx),cy<imageCenterMaximumBounds.top&&(ay=imageCenterMaximumBounds.top-cy),cy>imageCenterMaximumBounds.bottom&&(ay=imageCenterMaximumBounds.bottom-cy);const{x,y}=new DOMPointReadOnly(ax,ay).matrixTransform((new DOMMatrix).scaleSelf(this.#currentScale*scale).invertSelf());this.#matrix?.translateSelf(x,y)}this.#currentScale*=scale,this.#setTransform(this.#matrix)}_translateBy(deltaX,deltaY){if(!this.#matrix)return;const{a,b,c,d}=this.#matrix;let{x:tx,y:ty}=new DOMPoint(deltaX,deltaY).matrixTransform(new DOMMatrix([a,b,c,d,0,0]).invertSelf());const image=this.#elementRef.nativeElement,currentImageBounds=image.getBoundingClientRect(),scaledImageWidth=image.naturalWidth*this.#currentScale,scaledImageHeight=image.naturalHeight*this.#currentScale,currentImageCenter=new DOMPoint(currentImageBounds.left+currentImageBounds.width/2,currentImageBounds.top+currentImageBounds.height/2),imageCenterBoundsHalfWidth=(scaledImageWidth-this.#cropBounds().width)/2,imageCenterBoundsHalfHeight=(scaledImageHeight-this.#cropBounds().height)/2,{x:cx,y:cy}=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).rotateSelf(this.#currentRotation).invertSelf());return tx=this.#clamp(tx,-1*(imageCenterBoundsHalfWidth+cx),imageCenterBoundsHalfWidth-cx),ty=this.#clamp(ty,-1*(imageCenterBoundsHalfHeight+cy),imageCenterBoundsHalfHeight-cy),this.#matrix?.translateSelf(tx,ty),this.#setTransform(this.#matrix)}_rotateBy(degrees){const currentImageBounds=this.#elementRef.nativeElement.getBoundingClientRect(),currentImageCenter=new DOMPointReadOnly(currentImageBounds.left+currentImageBounds.width/2,currentImageBounds.top+currentImageBounds.height/2),{x:cx,y:cy}=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).scaleSelf(this.#currentScale).rotateSelf(this.#currentRotation).invertSelf());this.#currentRotation+=degrees;const{x:tx,y:ty}=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).scaleSelf(this.#currentScale).rotateSelf(this.#currentRotation).invertSelf());this.#matrix?.rotateSelf(degrees).translateSelf(cx-tx,cy-ty),this.#setTransform(this.#matrix)}#fitImage(cropBounds,imageSize){const{width,height}=cropBounds;if(0===width||0===height)return;const{naturalWidth,naturalHeight}=imageSize;if(0===naturalWidth||0===naturalHeight)return;const x=(width-naturalWidth)/2,y=(height-naturalHeight)/2;this.#matrix=new DOMMatrix([this.#minScale(),0,0,this.#minScale(),x,y]),this.#setTransform(this.#matrix)}#setTransform(matrix){matrix&&(this.#elementRef.nativeElement.style.transform=matrix.toString())}#clamp(value,min,max){return Math.min(max,Math.max(min,value))}static#_=this.propDecorators={loadHandler:[{type:core.HostListener,args:["load"]}]}};NgxAvatarEditorImageDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"img[ngxAvatarEditorImage]",standalone:!0})],NgxAvatarEditorImageDirective);let NgxAvatarEditorComponent=class NgxAvatarEditorComponent{#pointerDrag=(0,core.inject)(src.of,{self:!0});#wheelZoom=(0,core.inject)(src.D2,{self:!0});ngAfterViewInit(){const canvasElement=this._canvas.nativeElement;this._image._setCropBounds(canvasElement.getBoundingClientRect()),this.#wheelZoom.zoomBy.subscribe((({step,globalOrigin})=>this._image._scaleBy(step,globalOrigin))),this.#pointerDrag.moveBy.subscribe((({deltaX,deltaY})=>{this._image._translateBy(deltaX,deltaY)}))}_rotateBy(degrees){this._image._rotateBy(degrees)}static#_=this.propDecorators={src:[{type:core.Input,args:[{required:!0}]}],_canvas:[{type:core.ViewChild,args:["canvas"]}],_image:[{type:core.ViewChild,args:[NgxAvatarEditorImageDirective]}]}};NgxAvatarEditorComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ngx-avatar-editor",standalone:!0,imports:[common.CommonModule,NgxAvatarEditorImageDirective,fesm2022_button.ot,icon.Ps],template:'<div id="editor">\n  <div #canvas id="canvas">\n    <img ngxAvatarEditorImage [src]="src" />\n  </div>\n  <div id="transform-frame">\n    <div id="shade"></div>\n  </div>\n</div>\n<div id="controls">\n  <button mat-flat-button color="primary" (click)="_rotateBy(-90)">\n    <mat-icon>rotate_90_degrees_ccw</mat-icon>\n    <span>Rotate</span>\n  </button>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,hostDirectives:[src.D2,src.of],styles:[avatar_editor_componentngResource_default()]})],NgxAvatarEditorComponent);const avatar_editor_component_stories={component:NgxAvatarEditorComponent,title:"Components/GoogleAvatarEditor",parameters:{layout:"centered"}},Primary={args:{src:"grace-hilty-uvAhJHLul_Q-unsplash.jpg"}}},"./packages/gestures/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D2:()=>MouseWheelZoomDirective,of:()=>PointerDragDirective});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let MouseWheelZoomDirective=class MouseWheelZoomDirective{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.step=.1,this.zoomBy=new core.EventEmitter}#destroyRef;#elementRef;ngAfterViewInit(){const element=this.#elementRef.nativeElement;(0,fromEvent.R)(element,"wheel",{passive:!1,capture:!0}).pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,tap.b)((event=>event.preventDefault())),(0,map.U)((event=>({step:-1*Math.sign(event.deltaY)*(event.ctrlKey?.1*this.step:this.step),globalOrigin:new DOMPointReadOnly(event.clientX,event.clientY)})))).subscribe((zoom=>this.zoomBy.emit(zoom)))}static#_=this.propDecorators={step:[{type:core.Input,args:[{transform:core.numberAttribute}]}],zoomBy:[{type:core.Output}]}};MouseWheelZoomDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[ngxMouseWheelZoom]",standalone:!0})],MouseWheelZoomDirective);var filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),fromEventPattern=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js"),share=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js");class Pointer{constructor(event){this.initial=this.previous=this.current=event}update(event){this.previous=this.current,this.current=event}}class PointerTracker{#pointers=new Map;get pointers(){return this.#pointers}constructor(target){this.start=(0,fromEventPattern.R)((handler=>target.addEventListener("pointerdown",handler)),(handler=>target.removeEventListener("pointerdown",handler))).pipe((0,tap.b)((event=>event.preventDefault())),(0,tap.b)((event=>{this.#pointers.set(event.pointerId,new Pointer(event))})),(0,share.B)()),this.move=(0,fromEventPattern.R)((handler=>target.addEventListener("pointermove",handler)),(handler=>target.removeEventListener("pointermove",handler))).pipe((0,tap.b)((event=>{const pointer=this.#pointers.get(event.pointerId);pointer&&pointer.update(event)})),(0,share.B)()),this.end=(0,fromEventPattern.R)((handler=>{target.addEventListener("pointerup",handler),target.addEventListener("pointercancel",handler)}),(handler=>{target.removeEventListener("pointerup",handler),target.removeEventListener("pointercancel",handler)})).pipe((0,tap.b)((event=>{this.#pointers.delete(event.pointerId)})),(0,filter.h)((()=>0===this.#pointers.size)),(0,share.B)())}}let PointerTrackerFactory=class PointerTrackerFactory{#elementTrackerMap=new WeakMap;attach(target){if(this.#elementTrackerMap.has(target))return this.#elementTrackerMap.get(target);const tracker=new PointerTracker(target);return this.#elementTrackerMap.set(target,tracker),tracker}detach(target){this.#elementTrackerMap.has(target)&&this.#elementTrackerMap.delete(target)}};PointerTrackerFactory=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],PointerTrackerFactory);let PointerDragDirective=class PointerDragDirective{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.#pointerTrackerFactory=(0,core.inject)(PointerTrackerFactory),this.moveBy=new core.EventEmitter}#destroyRef;#elementRef;#pointerTrackerFactory;ngAfterViewInit(){const element=this.#elementRef.nativeElement,pointerTracker=this.#pointerTrackerFactory.attach(element);pointerTracker.start.pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,filter.h)((()=>1===pointerTracker.pointers.size)),(0,switchMap.w)((()=>pointerTracker.move.pipe((0,takeUntil.R)(pointerTracker.end),(0,tap.b)((event=>element.setPointerCapture(event.pointerId))),(0,map.U)((()=>Array.from(pointerTracker.pointers.values()))),(0,map.U)((pointers=>({deltaX:pointers[0].current.x-pointers[0].previous.x,deltaY:pointers[0].current.y-pointers[0].previous.y}))))))).subscribe((coords=>{this.moveBy.emit(coords)}))}static#_=this.propDecorators={moveBy:[{type:core.Output}]}};PointerDragDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[ngxPointerDrag]",standalone:!0})],PointerDragDirective)},"./packages/google-avatar-editor/src/lib/avatar-editor.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 1000px;\n  width: 840px;\n  background: #2e3035;\n}\n\n#editor {\n  position: relative;\n  box-sizing: border-box;\n  flex: 1;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  container: host/size;\n}\n\n#canvas {\n  --_canvas-size: 75%;\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  aspect-ratio: 1/1;\n  width: var(--_canvas-size);\n  height: auto;\n  pointer-events: none;\n}\n\n@container (aspect-ratio > 1) {\n  #canvas {\n    width: auto;\n    height: var(--_canvas-size);\n  }\n}\nimg[ngxAvatarEditorImage] {\n  position: absolute;\n}\n\n#transform-frame {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#shade {\n  --_canvas-size: 75%;\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  aspect-ratio: 1/1;\n  width: var(--_canvas-size);\n  height: auto;\n  border-radius: 50%;\n  border: none;\n  outline: max(100vw, 100vh) solid rgba(0, 0, 0, 0.3);\n  pointer-events: none;\n}\n\n@container (aspect-ratio > 1) {\n  #shade {\n    width: auto;\n    height: var(--_canvas-size);\n  }\n}\n#controls {\n  height: 100px;\n  width: 100%;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);