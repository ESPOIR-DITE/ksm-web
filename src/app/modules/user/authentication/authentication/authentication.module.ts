import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule, NbSpinnerModule,
    NbTabsetModule
} from "@nebular/theme";
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from "@nebular/auth";
import {RouterModule} from "@angular/router";
import {BASE_URL} from "../../../../shared/util";
import {ProfileComponent} from "./view/profile/profile.component";
import {LogoutComponent} from "./view/logout/logout.component";
import { RegistretionComponent } from './view/registretion/registretion.component';
import { UserFormComponent } from './view/profile/user-form/user-form.component';
import { UserAccountFormComponent } from './view/profile/user-account-form/user-account-form.component';

const formSetting: any = {
  redirectDelay: 500,
  strategy: 'email',
  showMessages: {
    success: true,
    error: true
  }
};

@NgModule({
  declarations: [ProfileComponent,LogoutComponent, RegistretionComponent, UserFormComponent, UserAccountFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        AuthenticationRoutingModule,

        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token'
                    },
                    baseEndpoint: BASE_URL,
                    login: {
                        alwaysFail: false,
                        endpoint: 'user-account/login',
                        method: 'get',
                        requireValidToken: true,
                        defaultErrors: ['Login failed.'],
                        defaultMessages: ['Login successful'],
                        redirect: {
                            success: '/index/',
                            failure: null
                        }
                    },
                    register: {
                        alwaysFail: false,
                        endpoint: 'user/register',
                        method: 'post',
                        requireValidToken: false,
                        defaultErrors: ['Register failed.'],
                        defaultMessages: ['Register successful'],
                        redirect: {
                            success: '/auth/',
                            failure: null
                        }
                    },
                    logout: {
                        alwaysFail: false,
                        endpoint: 'user/logout',
                        method: 'post',
                        requireValidToken: false,
                        defaultErrors: ['Register failed.'],
                        defaultMessages: ['Register successful'],
                        redirect: {
                            success: '/auth/',
                            failure: null
                        }
                    },
                    requestPass: {
                        endpoint: '/auth/request-pass',
                        method: 'post',
                    },
                    resetPass: {
                        endpoint: '/auth/reset-pass',
                        method: 'post',
                    },
                }),
            ],
            forms: {
                login: formSetting,
                register: formSetting,
                requestPassword: formSetting,
                resetPassword: formSetting,
                logout: {
                    redirectDelay: 0,
                },
            },
        }),
        ReactiveFormsModule,
        NbCardModule,
        NbTabsetModule,
        NbSpinnerModule
    ]
})
export class AuthenticationModule { }
