	
/*---Selectable calendar---*/
$(document).ready(function() {
	$('#calendar1').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2020-5-12',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar1').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar1').fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'Total Events',
          start: '2020-5-01'
        },
        {
          title: 'Long Weekend',
          start: '2020-5-07',
          end: '2020-5-5'
        },
        {
          id: 999,
          title: 'Meeting',
          start: '2020-5-09T16:00:00'
        },
        {
          id: 999,
          title: 'Birthday Party',
          start: '2020-5-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2020-5-11',
          end: '2020-5-13'
        },
        {
          title: 'Meeting',
          start: '2020-5-12T5:30:00',
          end: '2020-5-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2020-5-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2020-5-12T14:30:00'
        },
        {
          title: 'Celebrations',
          start: '2020-5-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2020-5-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2020-5-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-5-28'
        }
      ]
    });

  });
  
  // list type
  $(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,listWeek,month'
      },

      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' }
      },

      defaultView: 'listWeek',
      defaultDate: '2020-5-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'Total Events',
          start: '2020-5-01'
        },
        {
          title: 'Long Weekend',
          start: '2020-5-07',
          end: '2020-5-5'
        },
        {
          id: 999,
          title: 'Meeting',
          start: '2020-5-09T16:00:00'
        },
        {
          id: 999,
          title: 'Birthday Party',
          start: '2020-5-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2020-5-11',
          end: '2020-5-13'
        },
        {
          title: 'Meeting',
          start: '2020-5-12T5:30:00',
          end: '2020-5-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2020-5-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2020-5-12T14:30:00'
        },
        {
          title: 'Celebrations',
          start: '2020-5-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2020-5-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2020-5-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-5-28'
        }
      ]
    });

  });