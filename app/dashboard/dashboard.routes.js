"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_component_1 = require("./home/home.component");
const user_component_1 = require("./user/user.component");
const icons_component_1 = require("./icons/icons.component");
const table_component_1 = require("./table/table.component");
const notifications_component_1 = require("./notifications/notifications.component");
const typography_component_1 = require("./typography/typography.component");
const maps_component_1 = require("./maps/maps.component");
const upgrade_component_1 = require("./upgrade/upgrade.component");
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'table', component: table_component_1.TableComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    { path: 'typography', component: typography_component_1.TypographyComponent },
    { path: 'maps', component: maps_component_1.MapsComponent },
    { path: 'upgrade', component: upgrade_component_1.UpgradeComponent }
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    user_component_1.UserComponent,
    table_component_1.TableComponent,
    icons_component_1.IconsComponent,
    notifications_component_1.NotificationsComponent,
    typography_component_1.TypographyComponent,
    maps_component_1.MapsComponent,
    upgrade_component_1.UpgradeComponent
];
//# sourceMappingURL=dashboard.routes.js.map