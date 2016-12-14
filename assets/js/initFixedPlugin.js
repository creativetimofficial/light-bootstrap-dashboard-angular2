if ('undefined' !== typeof module) {

    background_image = true;

    module.exports = function initFixedPlugin(){
        $sidebar = $('.sidebar');
        $sidebar_img_container = $sidebar.find('.sidebar-background');

        $sidebar_responsive = $('body > .navbar-collapse');

        window_width = $(window).width();

        if(window_width > 767){
            if(window.location.pathname == '/dashboard'){
                if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
                    $('.fixed-plugin .dropdown').addClass('open');
                }
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
            $input = $(this);

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
            url: 'http://demos.creative-tim.com/light-bootstrap-dashboard-angular2'
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
            url: 'http://demos.creative-tim.com/light-bootstrap-dashboard-angular2'
        });
    }
}
