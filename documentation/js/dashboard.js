var type = ['','info','success','warning','danger'];

$(document).ready(function(){
	$('[data-toggle="checkbox"]').each(function () {
		if($(this).data('toggle') == 'switch') return;

		var $checkbox = $(this);
		$checkbox.checkbox();
	});
	  ds.initChartist();
	//   ds.showNotification();
})
ds ={
	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

            $.notify({
                icon: "pe-7s-gift",
                message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
            },{
                type: type[color],
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                }
            })
	},
    initChartist: function(){

        
    }
}
