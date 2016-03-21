import {Component} from 'angular2/core';

import {AppNavbarComponent} from './app-navbar.component';
import {AppFooterComponent} from './app-footer.component';

@Component({
    selector: 'main-app',
    directives: [AppNavbarComponent, AppFooterComponent],
    template: `
        <header id="header">
            <app-navbar></app-navbar>
        </header>
        <main id="content">
            <div class="container">
                <div class="row">
                    <h1>Hello, {{name}}!</h1>
                    <div class="form-group">
                        <label for="inputEmail" class="col-lg-2 control-label">Say hello to:</label>
                        <div class="col-lg-10">
                            <input class="form-control" [value]="name" (input)="name = $event.target.value">
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer id="footer">
            <app-footer></app-footer>
        </footer>
    `
})
export class AppComponent {
    name: string = 'World';
}

