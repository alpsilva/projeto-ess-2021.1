import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Teaching Assistant';

  isOnRoot(): boolean {
    var curURL: string = document.location.href;
    if (curURL == "http://localhost:4200/") {
      return true;
    } else {
      return false;
    }
  }
}
