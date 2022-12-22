import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostBlogComponent } from './components/user/dashboard/post-blog/post-blog.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/dashboard/profile/profile.component';
import { MyPostComponent } from './components/user/dashboard/my-post/my-post.component';
import { WelcomeComponent } from './components/user/dashboard/welcome/welcome.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path:'landing-page',component:LandingPageComponent},
  {path:'post/:id',component:PostComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'post-list',component:PostListComponent},
  {path:'profile',component:ProfileComponent , canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],children:[{path:'',component:MyPostComponent},{path:'post-blog',component:PostBlogComponent},{path:'my-post',component:MyPostComponent}]},
  {path:'contact-us',component:ContactUsComponent},
  {path:'sign-up', component:SignupComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:"**", component:PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
