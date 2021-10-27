import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt,faTimes } from "@fortawesome/free-solid-svg-icons";

export function DatePickerIcon(){
    return(
        <FontAwesomeIcon icon={faCalendarAlt} className={"DateIcon"}  />
    )
  }

export function CloseCross(){
    return(
        <FontAwesomeIcon icon={faTimes} className={"CloseCross"}  />
    )
  }

