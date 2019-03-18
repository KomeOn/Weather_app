$(document).ready(()=> {
	let loc = $('#loc');
	let btn = $('#go');
	let result = $('.body');
	
	btn.hover(function(){
		loc.css({"display": "inline-block"});
		$('#searchbox').css("transform", "translate(-50%, 0%)");
	}, function(){
		loc.css("display", "none");
	});
	loc.hover(function(){
		loc.css({"display": "inline-block",});
	});
	loc.keypress(function(event) {
	if(event.keyCode == 13) {
		search();
	}});
	btn.click(function() {
		search();
		});
	
	function search(){
		$('#start').css("display","none");
		$("#spinner").css("display", "block");
		let val = loc.val();
		clean();
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=6ca8f1ac6cf1007ff6ec3ffbcd420d06`,
			method: 'GET',
			success: function(data) {
				$("#spinner").css("display", "none");
				$('.bx1').css("visibility","visible");
				$('.bx2').css("visibility","visible");
				$('.bx3').css("visibility","visible");
				$('.bx4').css("visibility","visible");
				$('.bx5').css("visibility","visible");
				$('#searchbox').css({"border-radius": "50px", "background-color": "white", "padding": "30px", "position": "relative", "margin-top": "30px"}).appendTo("body");
				let weatherdata = JSON.parse(JSON.stringify(data));
                console.log(weatherdata);
				
				//for weather icons
				var desc = data.weather[0].id;
				
				//for location name and coordinates
				$('#locN').append("Location : ",data.name);
				$('#latt-logN').append("Coordinates : ",data.coord.lat," , ",data.coord.lon);
				$('.bx1').hover(function(){
					$(this).addClass('pulse');
				}, function(){
					$(this).removeClass('pulse');
				});
				$('.bx2').hover(function(){
					$(this).addClass('pulse');
				}, function(){
					$(this).removeClass('pulse');
				});
				$('.bx3').hover(function(){
					$(this).addClass('pulse');
				}, function(){
					$(this).removeClass('pulse');
				});
				$('.bx4').hover(function(){
					$(this).addClass('pulse');
				}, function(){
					$(this).removeClass('pulse');
				});
				$('.bx1').hover(function(){
					$(this).addClass('pulse');
				}, function(){
					$(this).removeClass('pulse');
				});
				
				//for weather information
				$('#weath').append("Weather : ",data.weather[0].main);
				$('#descrip').append("Description Weather  : ",data.weather[0].description);
				
				//for temperature
				$('#temp').append("Temperature : ",data.main.temp," Celsius");  
				$('#humid').append("Humidity : ",data.main.humidity," hPa");  
				$('#press').append("Pressure : ",data.main.pressure," %");  
				
				//for wind speed and info
				$('#w-speed').append("Wind Speed : ",data.wind.speed," m/s");
				$('#cloud').append("Cloudiness : ",data.clouds.all," %");
				
				//other info
				var timestampInMilliSeconds = data.sys.sunrise*1000; //as JavaScript uses milliseconds; convert the UNIX timestamp(which is in seconds) to milliseconds.
				var date = new Date(timestampInMilliSeconds);
				var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate(); //adding leading 0 if date less than 10 for the required dd format
				var month = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1); //adding leading 0 if month less than 10 for mm format. Used less than 9 because javascriptmonths are 0 based.
				var year = date.getUTCFullYear(); //full year in yyyy format

				var hours = ((date.getUTCHours() % 12 || 12) < 10 ? '0' : '') + (date.getUTCHours() % 12 || 12); //converting 24h to 12h and using 12 instead of 0. also appending 0 if hour less than 10 for the required hh format
				var minutes = (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes(); //adding 0 if minute less than 10 for the required mm format
				var meridiem = (date.getUTCHours() >= 12) ? 'pm' : 'am'; //setting meridiem if hours24 greater than 12

				var formattedDateSun = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;
				$('#sunriseT').append("Sunrise : ",formattedDateSun);
				
				var timestampInMilliSeconds = data.sys.sunset*1000; //as JavaScript uses milliseconds; convert the UNIX timestamp(which is in seconds) to milliseconds.
				var date = new Date(timestampInMilliSeconds);
				var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate(); //adding leading 0 if date less than 10 for the required dd format
				var month = (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1); //adding leading 0 if month less than 10 for mm format. Used less than 9 because javascriptmonths are 0 based.
				var year = date.getUTCFullYear(); //full year in yyyy format

				var hours = ((date.getUTCHours() % 12 || 12) < 10 ? '0' : '') + (date.getUTCHours() % 12 || 12); //converting 24h to 12h and using 12 instead of 0. also appending 0 if hour less than 10 for the required hh format
				var minutes = (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes(); //adding 0 if minute less than 10 for the required mm format
				var meridiem = (date.getUTCHours() >= 12) ? 'pm' : 'am'; //setting meridiem if hours24 greater than 12

				var formattedDateSet = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;
				$('#sunsetT').append("Sunset : ",formattedDateSet);
				
				//for weather display icons
				//Thunderstorm
				if(desc == 200 || desc == 201 || desc == 202|| desc == 210 || desc == 211 || desc == 212 || desc == 221|| desc == 230 || desc == 231|| desc == 232)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/11d.png");
						$(img).appendTo('.ico');
					}
				//Drizzle
				else if(desc == 300 || desc == 301 || desc == 302 || desc == 310 || desc == 311 || desc == 312 || desc == 313 || desc == 314 || desc == 321 || desc == 520 || desc == 521 || desc == 522 || desc == 531)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/09d.png");
						$(img).appendTo('.ico');
					}
				//Rain pt-1
				else if(desc == 500 || desc == 501|| desc == 502 || desc == 503 || desc == 504)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/10d.png");
						$(img).appendTo('.ico');
					}
				//Rain-pt2
				else if(desc == 511) 
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/13d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 600 || desc == 601|| desc == 602 || desc == 611 || desc == 612 || desc == 615 || desc == 616 || desc == 620 || desc == 621 || desc == 622)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/10d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 701 || desc == 711|| desc == 721 || desc == 731 || desc == 741 || desc == 751 || desc == 761 || desc == 762 || desc == 771 || desc == 781)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/50d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 800)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/01d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 801)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/02d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 802)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/03d.png");
						$(img).appendTo('.ico');
					}
				else if(desc == 803 || desc == 804)
					{
						var img = $('<img></img>').attr("src", "http://openweathermap.org/img/w/04d.png");
						$(img).appendTo('.ico');
					}
				
				}
			})
		}
	function clean(){
		$('#locN').text('');
		$('#latt-logN').text('');
		$('#latt-logN').text('');
		$('.ico').text('');
		$('#weath').text('');
		$('#descrip').text('');
		$('#temp').text('');
		$('#humid').text('');
		$('#press').text('');
		$('#w-speed').text('');
		$('#cloud').text('');
		$('#sunriseT').text('');
		$('#sunsetT').text('');
		
	}
 })
