(self.webpackChunkangular_avatar_editors=self.webpackChunkangular_avatar_editors||[]).push([[873],{"./packages/basic-avatar-editor/src/lib/avatar-editor.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>avatar_editor_component_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),combineLatest=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js");let NgxAvatarEditorImageDirective=class NgxAvatarEditorImageDirective{#destoryRef=(0,core.inject)(core.DestroyRef);#elementRef=(0,core.inject)(core.ElementRef);#injector=(0,core.inject)(core.Injector);loadHandler(){const{naturalWidth,naturalHeight}=this.#elementRef.nativeElement;this.#imageSize.set({naturalWidth,naturalHeight})}#matrix;#imageSize=(0,core.signal)({naturalWidth:0,naturalHeight:0});#cropBounds=(0,core.signal)(new DOMRectReadOnly);#cropBoundsCenter=(0,core.computed)((()=>new DOMPointReadOnly(this.#cropBounds().left+this.#cropBounds().width/2,this.#cropBounds().top+this.#cropBounds().height/2)));#maxScale=1;#minScale=(0,core.computed)((()=>1/Math.min(this.#imageSize().naturalWidth/this.#cropBounds().width,this.#imageSize().naturalHeight/this.#cropBounds().height)));#currentScale=0;ngOnInit(){(0,combineLatest.a)([(0,rxjs_interop.Dx)(this.#cropBounds,{injector:this.#injector}),(0,rxjs_interop.Dx)(this.#imageSize,{injector:this.#injector})]).pipe((0,rxjs_interop.sL)(this.#destoryRef),(0,filter.h)((()=>this.#elementRef.nativeElement.complete)),(0,tap.b)((()=>this.#currentScale=this.#minScale()))).subscribe((([bounds,size])=>this.#fitImage(bounds,size)))}_setCropBounds(bounds){this.#cropBounds.set(bounds)}_scaleBy(step,globalOrigin){const scale=this.#clamp(1+step,this.#minScale()/this.#currentScale,this.#maxScale/this.#currentScale),image=this.#elementRef.nativeElement,currentImageBounds=image.getBoundingClientRect(),currentImageCenter=new DOMPointReadOnly(currentImageBounds.left+currentImageBounds.width/2,currentImageBounds.top+currentImageBounds.height/2);let{x:tx,y:ty}=globalOrigin?globalOrigin.matrixTransform((new DOMMatrix).translateSelf(currentImageCenter.x,currentImageCenter.y).scaleSelf(this.#currentScale).invertSelf()):new DOMPointReadOnly;if(tx=this.#clamp(tx,-1*image.naturalWidth/2,image.naturalWidth/2),ty=this.#clamp(ty,-1*image.naturalHeight/2,image.naturalHeight/2),this.#matrix?.scaleSelf(scale,scale,void 0,tx,ty),step<0){const scaledImageWidth=image.naturalWidth*this.#currentScale,scaledImageHeight=image.naturalHeight*this.#currentScale,scaledImageCenter=new DOMPointReadOnly(scaledImageWidth/2,scaledImageHeight/2),nextScaledImageWidth=scaledImageWidth*scale,nextScaledImageHeight=scaledImageHeight*scale,imageChangeWidthPercentage=(scaledImageWidth-nextScaledImageWidth)/scaledImageWidth,imageChangeHeightPercentage=(scaledImageHeight-nextScaledImageHeight)/scaledImageHeight,unscaledTranslatePercentageFromCenter=new DOMPointReadOnly(tx/(image.naturalWidth/2),ty/(image.naturalHeight/2)),nextElementCenter=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(scaledImageCenter.x*unscaledTranslatePercentageFromCenter.x*imageChangeWidthPercentage,scaledImageCenter.y*unscaledTranslatePercentageFromCenter.y*imageChangeHeightPercentage)),imageCenterMaximumBounds=new DOMRectReadOnly((this.#cropBounds().width-nextScaledImageWidth)/2,(this.#cropBounds().height-nextScaledImageHeight)/2,nextScaledImageWidth-this.#cropBounds().width,nextScaledImageHeight-this.#cropBounds().height),{x:cx,y:cy}=nextElementCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).invertSelf());let ax=0,ay=0;cx<imageCenterMaximumBounds.left&&(ax=imageCenterMaximumBounds.left-cx),cx>imageCenterMaximumBounds.right&&(ax=imageCenterMaximumBounds.right-cx),cy<imageCenterMaximumBounds.top&&(ay=imageCenterMaximumBounds.top-cy),cy>imageCenterMaximumBounds.bottom&&(ay=imageCenterMaximumBounds.bottom-cy);const{x,y}=new DOMPointReadOnly(ax,ay).matrixTransform((new DOMMatrix).scaleSelf(this.#currentScale*scale).invertSelf());this.#matrix?.translateSelf(x,y)}this.#currentScale*=scale,this.#setTransform(this.#matrix)}_translateBy(deltaX,deltaY){if(!this.#matrix)return;const{a,b,c,d}=this.#matrix;let{x:tx,y:ty}=new DOMPoint(deltaX,deltaY).matrixTransform(new DOMMatrix([a,b,c,d,0,0]).invertSelf());const image=this.#elementRef.nativeElement,currentImageBounds=image.getBoundingClientRect(),scaledImageWidth=image.naturalWidth*this.#currentScale,scaledImageHeight=image.naturalHeight*this.#currentScale,currentImageCenter=new DOMPoint(currentImageBounds.left+currentImageBounds.width/2,currentImageBounds.top+currentImageBounds.height/2),imageCenterBoundsHalfWidth=(scaledImageWidth-this.#cropBounds().width)/2,imageCenterBoundsHalfHeight=(scaledImageHeight-this.#cropBounds().height)/2,{x:cx,y:cy}=currentImageCenter.matrixTransform((new DOMMatrix).translateSelf(this.#cropBoundsCenter().x,this.#cropBoundsCenter().y).invertSelf());return tx=this.#clamp(tx,-1*(imageCenterBoundsHalfWidth+cx),imageCenterBoundsHalfWidth-cx),ty=this.#clamp(ty,-1*(imageCenterBoundsHalfHeight+cy),imageCenterBoundsHalfHeight-cy),this.#matrix?.translateSelf(tx,ty),this.#setTransform(this.#matrix)}#fitImage(cropBounds,imageSize){const{width,height}=cropBounds;if(0===width||0===height)return;const{naturalWidth,naturalHeight}=imageSize;if(0===naturalWidth||0===naturalHeight)return;const x=(width-naturalWidth)/2,y=(height-naturalHeight)/2;this.#matrix=new DOMMatrix([this.#minScale(),0,0,this.#minScale(),x,y]),this.#setTransform(this.#matrix)}#setTransform(matrix){matrix&&(this.#elementRef.nativeElement.style.transform=matrix.toString())}#clamp(value,min,max){return Math.min(max,Math.max(min,value))}static#_=this.propDecorators={loadHandler:[{type:core.HostListener,args:["load"]}]}};NgxAvatarEditorImageDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"img[ngxAvatarEditorImage]",standalone:!0})],NgxAvatarEditorImageDirective);var avatar_editor_componentngResource=__webpack_require__("./packages/basic-avatar-editor/src/lib/avatar-editor.component.scss?ngResource"),avatar_editor_componentngResource_default=__webpack_require__.n(avatar_editor_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),fromEventPattern=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js"),share=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js");class Pointer{constructor(event){this.initial=this.previous=this.current=event}update(event){this.previous=this.current,this.current=event}}class PointerTracker{#pointers=new Map;get pointers(){return this.#pointers}constructor(target){this.start=(0,fromEventPattern.R)((handler=>target.addEventListener("pointerdown",handler)),(handler=>target.removeEventListener("pointerdown",handler))).pipe((0,tap.b)((event=>event.preventDefault())),(0,tap.b)((event=>{this.#pointers.set(event.pointerId,new Pointer(event))})),(0,share.B)()),this.move=(0,fromEventPattern.R)((handler=>target.addEventListener("pointermove",handler)),(handler=>target.removeEventListener("pointermove",handler))).pipe((0,tap.b)((event=>{const pointer=this.#pointers.get(event.pointerId);pointer&&pointer.update(event)})),(0,share.B)()),this.end=(0,fromEventPattern.R)((handler=>{target.addEventListener("pointerup",handler),target.addEventListener("pointercancel",handler)}),(handler=>{target.removeEventListener("pointerup",handler),target.removeEventListener("pointercancel",handler)})).pipe((0,tap.b)((event=>{this.#pointers.delete(event.pointerId)})),(0,filter.h)((()=>0===this.#pointers.size)),(0,share.B)())}}let PointerTrackerFactory=class PointerTrackerFactory{#elementTrackerMap=new WeakMap;attach(target){if(this.#elementTrackerMap.has(target))return this.#elementTrackerMap.get(target);const tracker=new PointerTracker(target);return this.#elementTrackerMap.set(target,tracker),tracker}detach(target){this.#elementTrackerMap.has(target)&&this.#elementTrackerMap.delete(target)}};PointerTrackerFactory=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],PointerTrackerFactory);var fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");let NgxAvatarEditorComponent=class NgxAvatarEditorComponent{constructor(){this.#destroyRef=(0,core.inject)(core.DestroyRef),this.#elementRef=(0,core.inject)(core.ElementRef),this.#pointerTrackerFactory=(0,core.inject)(PointerTrackerFactory),this._tabIndex=0}#destroyRef;#elementRef;#pointerTrackerFactory;ngAfterViewInit(){const element=this.#elementRef.nativeElement;this._image._setCropBounds(element.getBoundingClientRect()),(0,fromEvent.R)(element,"wheel",{passive:!1,capture:!0}).pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,tap.b)((event=>event.preventDefault())),(0,map.U)((event=>({step:-1*Math.sign(event.deltaY)*(event.ctrlKey?.1*.1:.1),origin:new DOMPointReadOnly(event.clientX,event.clientY)})))).subscribe((({step,origin})=>this._image._scaleBy(step,origin)));const pointerTracker=this.#pointerTrackerFactory.attach(element);pointerTracker.start.pipe((0,rxjs_interop.sL)(this.#destroyRef),(0,filter.h)((()=>1===pointerTracker.pointers.size)),(0,switchMap.w)((()=>pointerTracker.move.pipe((0,takeUntil.R)(pointerTracker.end),(0,tap.b)((event=>element.setPointerCapture(event.pointerId))),(0,map.U)((()=>Array.from(pointerTracker.pointers.values()))))))).subscribe((pointers=>{const deltaX=pointers[0].current.x-pointers[0].previous.x,deltaY=pointers[0].current.y-pointers[0].previous.y;this._image._translateBy(deltaX,deltaY)}))}static#_=this.propDecorators={_tabIndex:[{type:core.HostBinding,args:["attr.tabIndex"]}],_image:[{type:core.ContentChild,args:[NgxAvatarEditorImageDirective]}]}};NgxAvatarEditorComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ngx-avatar-editor",standalone:!0,imports:[common.CommonModule],template:'<ng-content select="[ngxAvatarEditorImage]" />\n<div id="shade"></div>\n<div id="focus-indicator"></div>\n',encapsulation:core.ViewEncapsulation.ShadowDom,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[avatar_editor_componentngResource_default()]})],NgxAvatarEditorComponent);const avatar_editor_component_stories={component:NgxAvatarEditorComponent,title:"Components/BasicAvatarEditor",decorators:[(0,dist.moduleMetadata)({imports:[NgxAvatarEditorImageDirective]})],parameters:{layout:"centered"}},Primary={render:args=>({props:args,template:'<ngx-avatar-editor style="width: 256px; height: 256px;"><img ngxAvatarEditorImage [src]="src"/></ngx-avatar-editor>'}),args:{src:"grace-hilty-uvAhJHLul_Q-unsplash.jpg"}}},"./packages/basic-avatar-editor/src/lib/avatar-editor.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: block;\n  position: relative;\n  box-sizing: border-box;\n  outline: 0;\n  overflow: hidden;\n}\n\nimg[ngxAvatarEditorImage] {\n  position: absolute;\n}\n\n#shade {\n  box-sizing: border-box;\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  outline: max(100vw, 100vh) solid rgba(255, 255, 255, 0.4);\n  pointer-events: none;\n}\n\n#focus-indicator {\n  box-sizing: border-box;\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n:host(:focus-visible) #focus-indicator {\n  outline: 2px solid;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);