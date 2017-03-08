import { NgModule, ApplicationRef,OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

//导入拦截器服务
import { provideInterceptorService } from 'ng2-interceptors';
import {ServerURLInterceptor} from "./ServerURLInterceptor";
//import {InterceptorService} from "ng2-interceptors/index";
//import {HttpInterceptorBackend} from './interceptor/http-interceptor-backend'
//import {HttpInterceptor} from './interceptor/http-interceptor';
//import {httpFactory} from './interceptor/http-factory';

//export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions){
//  let service = new InterceptorService(xhrBackend, requestOptions);
//  // Add interceptors here with service.addInterceptor(interceptor)
//  service.addInterceptor(ServerURLInterceptor);
//  return service;
//}

//导入核心服务
import {CoreModule} from './services/coreService/core.module';


/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { OaModule } from './theme/oa-them/oa.module';
import { PagesModule } from './pages/pages.module';
import {MessageService} from "./services/coreService/messageComponent.service";


// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    PagesModule,
    routing,
    CoreModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    //{
    //  provide: InterceptorService,
    //  useFactory: interceptorFactory,
    //  deps: [XHRBackend, RequestOptions]
    //}
    provideInterceptorService([
      new ServerURLInterceptor()
    ])
    //HttpInterceptorBackend,HttpInterceptor,
    //{
    //  provide: InterceptorService,
    //  useFactory: httpFactory,
    //  deps: [HttpInterceptorBackend,RequestOptions]
    //}
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
