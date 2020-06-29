import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LexerComponent } from './lexer/lexer.component';
import { ContactComponent } from './contact/contact.component';
import { CommandsComponent } from './commands/commands.component';
import { ImprintComponent } from './imprint/imprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { GamingComponent } from './gaming/gaming.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { LetsCodeComponent } from './lets-code/lets-code.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'lets-code', component: LetsCodeComponent },
  { path: 'coden', component: LetsCodeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projekte', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'lexer', component: LexerComponent },
  { path: 'commands', component: CommandsComponent },
  { path: 'gaming', component: GamingComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'dokumentation', component: DocumentationComponent },
  { path: 'dokumentation/:level1', component: DocumentationComponent },
  { path: 'dokumentation/:level1/:level2', component: DocumentationComponent },
  { path: 'dokumentation/:level1/:level2/:level3', component: DocumentationComponent },
  { path: 'dokumentation/:level1/:level2/:level3/:level4', component: DocumentationComponent },
  { path: 'anmelden', component: LoginComponent },
  { path: 'registrieren', component: RegisterComponent },
  { path: 'coding', component: LetsCodeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'nutzungsbedingungen', component: TermsOfUseComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'haftungsausschluss', component: DisclaimerComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
