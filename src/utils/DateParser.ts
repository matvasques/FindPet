import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'

class DateParser{
    date(){
        try{
            const date = new Date();
            const timeZone = 'America/Sao_Paulo'
            const zonedDate =  utcToZonedTime(date, timeZone)
            const dateParsed = format(zonedDate, 'yyyy-MM-dd HH:mm:ss')

            return dateParsed;
        }
        catch(error){
            console.log("ERROR: " + error);
        }
    } 
}

export default DateParser;


