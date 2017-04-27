/*!

 =========================================================
 * Light Bootstrap Dashboard Free Angular CLI - v1.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard-angular2
 * Copyright 2016 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

$(document).ready(function(){
  window_width = $(window).width();
  $('#menuresize a').click(function(){
    var href = $(this).attr('href');
    $('html,body').animate({
      'scrollTop': $($(this).attr('href')).offset().top - 100
    }, 200);
  });

  //  Activate the tooltips
  $('[rel="tooltip"]').tooltip();

  //      Activate the switches with icons
  if($('.switch').length != 0){
    $('.switch')['bootstrapSwitch']();
  }

  //      Activate regular switches
  if($("[data-toggle='switch']").length != 0){
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
  }

  $('.form-control').on("focus", function(){
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function(){
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // Fixes sub-nav not working as expected on IOS
  $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
});
