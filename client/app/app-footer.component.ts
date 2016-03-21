import {Component} from 'angular2/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-unstyled">
                        <li class="pull-right"><a href="#top">Back to top</a></li>
                        <li><a href="#">API</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">More links</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-12 text-center white-text">
                2016&copy; - Instadrink
            </div>
        </div>
    `
})


export class AppFooterComponent {
}
