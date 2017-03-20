"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sidebar_routes_config_1 = require("../.././sidebar/sidebar-routes.config");
const sidebar_metadata_1 = require("../.././sidebar/sidebar.metadata");
const common_1 = require("@angular/common");
let NavbarComponent = class NavbarComponent {
    constructor(location) {
        this.location = location;
    }
    ngOnInit() {
        this.listTitles = sidebar_routes_config_1.ROUTES.filter(listTitle => listTitle.menuType !== sidebar_metadata_1.MenuType.BRAND);
    }
    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
};
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navbar-cmp',
        templateUrl: 'navbar.component.html'
    }),
    __metadata("design:paramtypes", [common_1.Location])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map