import {Component} from 'angular2/core';

@Component({
    selector: 'app-navbar',
    template: `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#"><img src="img/main-logo.png" class="img-responsive" alt="Instadrink"></a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                    <li *ngFor="#menuContent of menuContents" [class.dropdown]="menuContent.children">
                        <a [href]="menuContent.url"  [attr.data-toggle]="menuContent.children ? 'dropdown' : none"  role="button">{{menuContent.name}}
                            <span *ngIf="menuContent.children" class="caret"></span>
                        </a>
                        <ul *ngIf="menuContent.children" class="dropdown-menu" role="menu">
                            <li *ngFor="#child of menuContent.children"><a [href]="child.url">{{child.name}}</a></li>
                        </ul>
                    </li>
                    <li><a href="#"><span class="glyphicon glyphicon-search"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-shopping-cart"></span></a></li>
                  </ul>
                </div>
            </div>
        </nav>
    `
})


export class AppNavbarComponent {
   menuContents = [
        {name: "Cervezas", url:"/cervezas"},
        {name: "Vinos/Cavas", url:"/vinos-y-cavas"},
        {name: "Licores", url:"#", children: [
            {name:"Ron", url:"/ron"},
            {name:"Wiskey", url:"/wiskey"},
            {name:"Vodka", url:"/vodka"},
            {name:"Ginebra", url:"/ginebra"},
            {name:"Coñac", url:"/coñac"},
            {name:"Tequila", url:"/tequila"}
        ]},
        {name: "Refrescos", url:"/refrescos"},
        {name: "Otros", url:"#", children:[
            {name:"Aperitivos", url:"/aperitivos"},
            {name:"Hielos", url:"/hielos"},
            {name:"Vasos", url:"/vasos"}
        ]}
   ];
}
