import { Component, OnInit } from '@angular/core';
import { CommandsBasicsService } from 'bbscript/src/services/commands/basics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  testfield$: Observable<number>;

  constructor(private basics: CommandsBasicsService) {
    this.testfield$ = this.basics.sqr(81);
  }

  ngOnInit() {
  }

}
