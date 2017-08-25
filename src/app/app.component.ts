import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

declare const $: any;
declare let _gaq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    background_image: boolean = true;
    location: Location;
    private currentRoute:string;

    constructor(_router:Router,
                _location:Location) {
        this.location = _location;
        _router.events.subscribe((event:any) => {
            // Send GA tracking on NavigationEnd event. You may wish to add other
            // logic here too or change which event to work with
            if (event instanceof NavigationEnd) {
                // When the route is '/', location.path actually returns ''.
                let newRoute = _location.path() || '/';
                // If the route has changed, send the new route to analytics.
                if (this.currentRoute != newRoute) {
                    _gaq('send', 'pageview', newRoute);
                    this.currentRoute = newRoute;
                }
            }
        });
    }

    ngOnInit(){
        let $sidebar = $('.sidebar');
        let $sidebar_img_container = $sidebar.find('.sidebar-background');

        let $sidebar_responsive = $('body > .navbar-collapse');
        let window_width = $(window).width();

        let background_image;
        if(window_width > 767){
            if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
                $('.fixed-plugin .dropdown').addClass('open');
            }
        }

        $('.fixed-plugin a').click(function(event){
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if($(this).hasClass('switch-trigger')){
                if(event.stopPropagation){
                    event.stopPropagation();
                }
                else if(window.event){
                   window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function(){

            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            $sidebar.attr('data-color',new_color);

            if($sidebar_responsive.length != 0){
                $sidebar_responsive.attr('data-color',new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function(){

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            var new_image = $(this).find("img").attr('src');

            $sidebar_img_container.fadeOut('fast', function(){
               $sidebar_img_container.css('background-image','url("' + new_image + '")');
               $sidebar_img_container.fadeIn('fast');
            });

            if($sidebar_responsive.length != 0){
                $sidebar_responsive.css('background-image','url("' + new_image + '")');
            }
        });

        $('.switch input').change(function(){
            let $input = $(this);

            if($input.is(':checked')){
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image','#')
                background_image = true;
            } else {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
                background_image = false;
            }
        });

        $('#twitter').sharrre({
          share: {
            twitter: true
          },
          enableHover: false,
          enableTracking: false,
          buttons: { twitter: {via: 'CreativeTim'}},
          click: function(api, options){
            api.simulateClick();
            api.openPopup('twitter');
          },
          template: '<i class="fa fa-twitter"></i> &middot; 256',
          url: 'http://demos.creative-tim.com/light-bootstrap-dashboard'
        });

        $('#facebook').sharrre({
          share: {
            facebook: true
          },
          enableHover: false,
          enableTracking: false,
          click: function(api, options){
            api.simulateClick();
            api.openPopup('facebook');
          },
          template: '<i class="fa fa-facebook-square"></i> &middot; 426',
          url: 'http://demos.creative-tim.com/light-bootstrap-dashboard'
        });
    }
    onChange($event){
        var $sidebar = $('.sidebar');
        var $sidebar_img_container = $sidebar.find('.sidebar-background');

        var $full_page = $('.full-page');
        var $full_page_background = $('.full-page-background');
        var $sidebar_responsive = $('body > .navbar-collapse');
        if ($event.currentValue) {
            if($sidebar_img_container.length != 0){
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image','#');
            }

            if($full_page_background.length != 0){
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image','#');
            }

            this.background_image = true;
        }else{
            if($sidebar_img_container.length != 0){
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }

            if($full_page_background.length != 0){
                $full_page.removeAttr('data-image','#');
                $full_page_background.fadeOut('fast');
            }

            this.background_image = false;
        }
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
}
