import {NgModule, ApplicationRef, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';

//导入拦截器服务
import {Router} from '@angular/router';
import {HttpInterceptorService} from "./services/interceptor";
import {MessageService} from "./services/core/messageComponent.service";
import {PreloaderService} from "./services/core/preloaderComponent.service";

export function interceptorFactory(backend:XHRBackend,
                                   defaultOptions:RequestOptions,
                                   router:Router,
                                   messageService:MessageService,
                                   preloaderservice:PreloaderService) {
  return new HttpInterceptorService(backend, defaultOptions, router, messageService, preloaderservice)
};

//import { provideInterceptorService } from 'ng2-interceptors';
//import {ServerURLInterceptor} from "./ServerURLInterceptor";

//导入核心服务
import {CoreModule} from "./services/core/core.module";


/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {routing} from './app.routing';

// App is our top level component
import {App} from './app.component';
import {AppState, InternalStateType} from './app.service';
import {GlobalState} from './global.state';
import {NgaModule} from './theme/nga.module';
import {OaModule} from './theme/oa-them/oa.module';
import {PagesModule} from './pages/pages.module';

export function interceptorFactory(backend: XHRBackend,
    defaultOptions: RequestOptions,
    router: Router,
    messageService: MessageService,
    preloaderservice: PreloaderService) {
    return new HttpInterceptorService(backend, defaultOptions, router, messageService, preloaderservice)
};

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
    MessageService,
    { provide: HttpInterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions,Router,MessageService,PreloaderService]
    }
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
