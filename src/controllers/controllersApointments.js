
const path = require('path');
const fs = require('fs');
const  {google}  = require('googleapis')
const {OAuth2}  = google.auth




module.exports = {
  index : async  (req,res) => {
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'));
  },
  addEvent : async  (req,res) => {
    // Create a new instance of oAuth and set our Client ID & Client Secret.
  


    const oAuth2Client = new OAuth2(
      '973393698786-drcpg3obm2sq7ekimt575use5ckpp51n.apps.googleusercontent.com',
      'QbmP9eFhq2pCSeLITnw05xDf'
    )
    
    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
      refresh_token: '1//048YWO6hqOXO9CgYIARAAGAQSNwF-L9Ir88KiMOZ9elpEhqgzzFKTYUJFKKRp0ICJ5Wopt7qd0HlXUyPhjXY1PByDelrkNeJ4FpM',
    })
    
    
    
    // Create a new calender instance.
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    
    // Create a new event start date instance for temp uses in our calendar.
    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getDay() + 2)
   
    
    // Create a new event end date instance for temp uses in our calendar.
    const eventEndTime = new Date()
     eventEndTime.setDate(eventEndTime.getDay() + 4)
     eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

    
    // Create a dummy event for temp uses in our calendar
    const event = {
      summary:req.body.name,
      location: `3595 California St, San Francisco, CA 94118`,
      description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
      colorId: 1,
      start: {
        dateTime: req.body.startDate,
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: req.body.endDate,
        timeZone: 'America/Denver',
      },
    }
    
    // Check if we a busy and have an event on our calendar for the same time.
    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          timeZone: 'America/Denver',
          items: [{ id: 'primary' }],
        },
      },
      (err, res) => {
        // Check for errors in our query and log them if they exist.
        if (err) return console.error('Free Busy Query Error: ', err)
    
        // Create an array of all events on our calendar during that time.
        const eventArr = res.data.calendars.primary.busy
    
        // Check if event array is empty which means we are not busy
        if (eventArr.length === 0)
          // If we are not busy create a new calendar event.
          return calendar.events.insert(
            { calendarId: 'primary', resource: event },
            err => {
              // Check for errors and log them if they exist.
              if (err) return console.error('Error Creating Calender Event:', err)
              // Else log that the event was created.
              return console.log('Calendar event successfully created.')
            }
          )
    
        // If event array is not empty log that we are busy.
        return console.log(`Sorry I'm busy...`)
      }
    
    )
      
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'));
  },

}
