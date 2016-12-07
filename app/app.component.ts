import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import initFixedPlugin = require('../assets/js/demo.js');

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit{
    ngOnInit(){
        $.getScript('../assets/js/light-bootstrap-dashboard.js');
        initFixedPlugin();

    }
    public isMaps(path){
        if(path == window.location.pathname){
            return false;
        }
        else {
            return true;
        }
    }
}
