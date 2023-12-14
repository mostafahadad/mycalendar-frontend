import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment';
import './Calendar.css'

const Calendar = ( {events} ) => {
    return (
        <div className='container'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          dayMaxEventRows={true}
          firstDay={1}
          height='500px'
          slotLabelFormat={{ hour: 'numeric', minute: 'numeric', hour12: false }}
          slotMinTime="08:00:00"  // Set the start time to 8 AM
        />
        </div>
      );
}

export default Calendar;