import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { PostBlogComponent } from './components/user/dashboard/post-blog/post-blog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClient,HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientInterceptor } from './components/http-client-interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostComponent } from './components/post/post.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/dashboard/profile/profile.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { DragDirective } from './drag.directive';
import {MatGridListModule} from '@angular/material/grid-list';
import { MyPostComponent } from './components/user/dashboard/my-post/my-post.component';
import { WelcomeComponent } from './components/user/dashboard/welcome/welcome.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignInComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    PostBlogComponent,
    PageNotFoundComponent,
    PostComponent,
    AboutUsComponent,
    ContactUsComponent,
    ImageCarouselComponent,
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    PostListComponent,
    DragDirective,
    MyPostComponent,
    WelcomeComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgxWebstorageModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    Ng2SearchPipeModule,
    ShareButtonsModule.withConfig({debug:true}),
    ShareIconsModule,
    FontAwesomeModule
    

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
