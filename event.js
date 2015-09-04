var days            = ['thursday','friday','saturday'];
var dates           = [];
var parties         = [];
var eventsFiltered  = [];

var dateFormat      = 'dddd';

var FbToken = '1652860188281842|4lwtG-syhTXK-mYt9-DwvWXUnNw';

(function(Event) {

    Event.init = function () {
        Event.setDates();
        Event.setParties(dates);

        Event.callFb();
    };

    Event.getResult = function () {
        Event.init();
        return parties;
    };

    Event.callFb = function () {
        $.ajaxSetup({ cache:true });
        $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {

             FB.init({
                appId: '1652860188281842',
                version: 'v2.3'
             });

             var events_params   = {
                fields: 'name,start_time',
                access_token: FbToken,
                since: '2015-09-03',
                until: '2015-09-06'
             };

             FB.api('/205096312852338/events', events_params, function (response) {
                Event.filterEvents(response.data);
             });

             FB.api('/725935350828151/events', events_params, function (response) {
                Event.filterEvents(response.data);
             });
        });
    };

    Event.setDates = function () {

        days.map( function( day ) {
            dates.push( moment().day(day) );
        });

    };

    Event.setParties = function (days) {
        days.map( function ( day ) {
            if ( parties[day] === undefined ) {
                parties[day.format(dateFormat)] = [];
            };
        });
    }

    Event.filterEvents = function (events) {
        events.map( function( event ) {

           var isParty = Event.checkEventTime(event);

           if (isParty){
                parties[moment(event.start_date).format(dateFormat)].push(event);
            };

        });
     };


     Event.checkEventTime = function (event) {

        var isAtNight =  moment(event.start_time).isAfter(moment().hour(22),'hour');

        if (!isAtNight) {
            return false;
        }

        return true;
     };

})(window.Event = window.Event || {});

