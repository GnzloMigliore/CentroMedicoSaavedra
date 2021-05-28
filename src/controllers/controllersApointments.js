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
   const titulo = req.body.name;

   const end =   new Date(req.body.endDate);
   

   const start = new Date(req.body.startDate);
 



    const oAuth2Client = new OAuth2(
      '973393698786-drcpg3obm2sq7ekimt575use5ckpp51n.apps.googleusercontent.com',
      'QbmP9eFhq2pCSeLITnw05xDf',
      'https://localhost:3000'
    )
    // generate a url that asks permissions for Blogger and Google Calendar scopes





    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
      refresh_token: '1//04Hw9gg63FYEcCgYIARAAGAQSNwF-L9IruL6Wk3LeXR6fm_G7dm3wJy3Jjg4GGJfG7v4cNliSxreYBeDhE2x058e1yGaGSo-EE_k',
    })



  
    // Create a new calender instance.
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    



    // Create a new event start date instance for temp uses in our calendar.

   
    
    // Create a new event end date instance for temp uses in our calendar.
    const eventEndTime = new Date()
     eventEndTime.setDate(eventEndTime.getDay() + 6)
     eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

    
    // Create a dummy event for temp uses in our calendar
    const event = {
      summary: titulo,
      location: `Ruiz Huidobro`,
      description: `Paciente turno con xxx`,
      colorId: 1,
      start: {
        dateTime:start,
        timeZone: 'America/Argentina/Buenos_Aires',
      },
      end: {
        dateTime:end,
        timeZone: 'America/Argentina/Buenos_Aires',
      },
    }
    
    // Check if we a busy and have an event on our calendar for the same time.
    calendar.freebusy.query(
      {
        resource: {
          timeMin: start,
          timeMax: end,
          timeZone: 'America/Argentina/Buenos_Aires',
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