(self.webpackChunkangular_avatar_editors=self.webpackChunkangular_avatar_editors||[]).push([[179],{"./testing/storybook-host/.storybook/preview.ts":()=>{},"./storybook-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_CHANNELS_=__webpack_require__("@storybook/channels"),asyncToGenerator=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");const pipeline=x=>x(),importers=[function(){var _ref=(0,asyncToGenerator.Z)((function*(path){if(!/^\.[\\/](?:packages(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx|mdx))$/.exec(path))return;const pathRemainder=path.substring(11);return __webpack_require__("./packages lazy recursive ^\\.\\/.*$ include: (?:\\/packages(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$")("./"+pathRemainder)}));return function(_x){return _ref.apply(this,arguments)}}()];function _importFn(){return(_importFn=(0,asyncToGenerator.Z)((function*(path){for(let i=0;i<importers.length;i++){const moduleExports=yield pipeline((()=>importers[i](path)));if(moduleExports)return moduleExports}}))).apply(this,arguments)}const channel=(0,external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({page:"preview"});external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),"DEVELOPMENT"===external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE&&(window.__STORYBOOK_SERVER_CHANNEL__=channel);const preview=new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb;window.__STORYBOOK_PREVIEW__=preview,window.__STORYBOOK_STORY_STORE__=preview.storyStore,window.__STORYBOOK_ADDONS_CHANNEL__=channel,window.__STORYBOOK_CLIENT_API__=new external_STORYBOOK_MODULE_PREVIEW_API_.ClientApi({storyStore:preview.storyStore}),preview.initialize({importFn:function importFn(_x2){return _importFn.apply(this,arguments)},getProjectAnnotations:()=>(0,external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)([__webpack_require__("./node_modules/@storybook/angular/dist/client/preview-prod.js"),__webpack_require__("./node_modules/@storybook/angular/dist/client/docs/config.js"),__webpack_require__("./node_modules/@storybook/angular/dist/client/config.js"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/docs/preview.mjs"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs"),__webpack_require__("./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs"),__webpack_require__("./testing/storybook-host/.storybook/preview.ts")])})},"./packages lazy recursive ^\\.\\/.*$ include: (?:\\/packages(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./basic-avatar-editor/src/lib/avatar-editor.component.stories":["./packages/basic-avatar-editor/src/lib/avatar-editor.component.stories.ts",873],"./basic-avatar-editor/src/lib/avatar-editor.component.stories.ts":["./packages/basic-avatar-editor/src/lib/avatar-editor.component.stories.ts",873]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return __webpack_require__.e(ids[1]).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./packages lazy recursive ^\\.\\/.*$ include: (?:\\/packages(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx%7Cmdx))$",module.exports=webpackAsyncContext},"@storybook/channels":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CHANNELS__},"@storybook/client-logger":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CLIENT_LOGGER__},"@storybook/core-events":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS__},"@storybook/global":module=>{"use strict";module.exports=__STORYBOOK_MODULE_GLOBAL__},"@storybook/preview-api":module=>{"use strict";module.exports=__STORYBOOK_MODULE_PREVIEW_API__}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[897],(()=>(__webpack_exec__("./storybook-config-entry.js"),__webpack_exec__("./node_modules/@angular/compiler/fesm2022/compiler.mjs"))));__webpack_require__.O()}]);