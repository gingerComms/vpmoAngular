import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
// import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginModule } from './login-2/login.module';
import { SignUpComponent } from './signUp/sign-up.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from '../_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './profile/userProfile.component';
import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { TeamCardComponent } from './dashboard/team-card.component';

const UserRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            // { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: UserProfileComponent }
            // { path: '', component: AdminMenuComponent, canActivate: [UserService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(UserRoutes),
        HttpClientModule,
        LoginModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,

    ],
    exports: [
        SignUpComponent,
        DashboardComponent,
        UserProfileComponent,
    ],
    declarations: [
        UserComponent,
        SignUpComponent,
        DashboardComponent,
        UserProfileComponent,
        TeamCardComponent,

    ],
    providers: [
        UserService,
        
        AuthGuard,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})

export class UserModule {}
