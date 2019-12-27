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


const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'lexer', component: LexerComponent },
  { path: 'commands', component: CommandsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
