const path = require('path');
const fs = require('fs');
const {patients,users,apointments} = require ('../database/models');
const  {google}  = require('googleapis')
const {OAuth2}  = google.auth


module.exports = {
  turnos : async  (req,res) => {
    const pacientes = await patients.findAll()
    const usuarios = await users.findAll({where: {puesto: "medico"}})

    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'),{usuarios,pacientes});
  },
  filtroTurnos : async  (req,res) => {
    const usuarios = await users.findAll({where: {puesto: "medico"}})
    const pacientes = await patients.findAll()
    const turnos = await apointments.findAll()
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'filtrarApointments'),{turnos,usuarios,pacientes});
  },
  filtrarTurnos : async  (req,res) => {
    const usuarios = await users.findAll({where: {puesto: "medico"}})
    const turnos = await apointments.findAll({where: {doctor: req.body.medico}})

    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'filtrarApointments'),{turnos,usuarios});
  },
  addEvent : async  (req,res) => {

    const usuarios = await users.findAll({where: {puesto: "medico"}})
 
     let turno={
     name: req.body.name,
     description : req.body.descripcion,
     doctor : req.body.medico,
     start_date: req.body.startDate,
     end_date: req.body.endDate,      

};    
     apointments.create(turno)



    // Create a new instance of oAuth and set our Client ID & Client Secret.
   const titulo = req.body.name;
   const end =   new Date(req.body.endDate);
   const start = new Date(req.body.startDate);
   const description = req.body.descripcion;

    const oAuth2Client = new OAuth2(
      "973393698786-o5ns69f3img0ostov5ojv9g6jg5avhsp.apps.googleusercontent.com","3tuGxS4_tRETUB7ItEqF6w6A",
      
    )
    // generate a url that asks permissions for Blogger and Google Calendar scopes
      console.log(process.env.CLIENT_ID);
    console.log(process.env.CLIENT_SECRET);
    console.log(process.env.REFRESH_TOKEN);




    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
      refresh_token: "1//04Vbon2WKnJbNCgYIARAAGAQSNwF-L9IrypYIyRfbHEPCLtvi7HTkSmmp8pYfyfM65LuCwijg-5SacFqinc7k1199X7CvL_z0agg",
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
      description: description,
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
      
    res.render(path.resolve(__dirname, '..', 'views', 'apointments', 'apointments'),{usuarios});
  },

}