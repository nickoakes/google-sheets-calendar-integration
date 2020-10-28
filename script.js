//script is triggered whenever any kind of change is made to the events calendar

function calendarChange() {

    //open the events calendar
  
    var calendar = CalendarApp.getCalendarById('GOOGLE_CALENDAR_ID_HERE');

    //date today
    
    var dateNow = new Date();

    //date one year from today
    
    var dateNextYear = new Date();
    
    dateNextYear.setFullYear(dateNow.getFullYear() + 1);

    //get all events between now and this time next year
    
    var events = calendar.getEvents(dateNow, dateNextYear);

    //open the events spreadsheet
    
    var spreadsheet = SpreadsheetApp.openById("GOOGLE_SHEET_ID_HERE");
    
    var sheet = spreadsheet.getActiveSheet();

    //delete everything
    
    sheet.clear();

    //append headers as the first row
    
    var headers = ["Timestamp", "Full Name", "Event Type", "Date"];
    
    sheet.appendRow(headers);

    //loop through all events, extract the full name and event type from each and create a new row in the sheet
    
    for(var i = 0; i < events.length; i++){
      
      var fullName;
      
      var eventType;

      var descArr;
      
      var description = events[i].getTitle();
      
      if(description.includes(" - ")){
         
         descArr = description.split(" - ");
      
         fullName = descArr[0];
      
         eventType = descArr[1];
      
    } else if(description.includes("'s ")){
      
         descArr = description.split("'s ");
      
         fullName = descArr[0];
      
         eventType = descArr[1];
    } else{
      
      fullName = description;
      
      eventType = "Other";
    }
      
      var rowContents = [events[i].getDateCreated(), fullName, eventType, events[i].getAllDayStartDate()];
          
      sheet.appendRow(rowContents);
    }  
  }
  