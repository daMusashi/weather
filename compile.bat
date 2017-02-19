@echo off

set source=E:\Dropbox\Arbete\htdocs\webbapps\weatherapi\source\

echo source satt till %source%

node C:\Users\Martin\AppData\Roaming\npm\node_modules\uglify-js\bin\uglifyjs^
	%source%config.js^
 	%source%eventhandler.js^
 	%source%date.js^
 	%source%ui.factory.js^
 	%source%google.place.api.js^
 	%source%google.place.data.js^
 	%source%google.map.api.js^
 	%source%google.map.ui.js^
 	%source%google.place.manager.js^
 	%source%smhi.radar.ui.js^
 	%source%smhi.radar.api.js^
 	%source%canvas.sprite.js^
 	%source%ui.header.js^
 	%source%ui.footer.js^
 	%source%ui.weather.icon.js^
 	%source%forecast.manager.js^
 	%source%provider.api.smhi.js^
 	%source%provider.dataadapter.smhi.js^
 	%source%forecast.dataitem.js^
 	%source%forecast.data.day.js^
 	%source%smhi.forecast.ui.js^
 	%source%ui.panel.js^
 	%source%smhi.forecast.ui.day.js^
 	%source%ui.forecast.dataitem.js^
 	%source%smhi.forecast.ui.item.hero.js^
 	%source%ui.forecast.rightnow.js^
 	%source%ui.dialogs.js^
 	%source%ui.js^
 	%source%ui.windarrow.js^
 	%source%app.js^
 -m^
 -c^
 -r apiloaded^
 -o weather.min.js

pause