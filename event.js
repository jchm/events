var days        = ['thursday','friday','saturday'];
var dates       = [];
var parties     = [];

$(document).ready(function () {

    var token = 'CAACEdEose0cBAI4WZBr4oGTHilYIHjUJat2ZAILlikpxYJaK4u0u4rZB9alrMBKpq0eKbKS2KYaKimQeIEJTEzRl9n69uGdsVYYr7XdrbFMI9eZCG5vaZBZBCybqA8Oj3uOZAlc0shFzpbDyBNhnVTEFOrK5mWQbYPvP3e4N61iqIXOyX9XVb45ZAmgwgWIlgsCzK9y91TvTpHyh9xnxXdj7';


    $.ajaxSetup({ cache:true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {

        FB.init({
            appId: '1652860188281842',
            version: 'v2.3'
         });

         var events          = [];
         var events_params   = {
            fields: 'name,start_time',
            access_token: token,
            since: '2015-06-22',
            until: '2015-06-29'
         };

         events = FB.api('/205096312852338/events', events_params, function (response) {
            console.log(response);
            setDates();
            filterEvents(response.data);

            console.log(parties);
         });
    });
 });

 function setDates() {

    days.map( function( day ) {
        dates.push( moment().day(day) );
    });

 };

function filterEvents(events) {
    events.map( function( event ) {

         days.map( function( day ) {

            if ( parties[day] === undefined ) {

                parties[day] = [];

            };

            if ( checkEvent( event, day ) ) {
                parties[day].push( event );
            };

         });

    });

    console.log( parties );
 };


 function checkEvent(event, day) {
        var friday      = moment().day( day ).hour(22).minute(59).second(59);

        var is_on_day   = moment(event.start_time).isSame( friday , 'day');
        var is_at_night = moment(event.start_time).isAfter( friday );

        if ( is_on_day && is_at_night ) {
            console.log(event);
            return event;
        };


 };
