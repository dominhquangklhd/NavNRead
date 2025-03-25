import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import "./MicButton.css";

export default function MicButton({ buttonRef, isListening, startListening }) {
    return (
        <button 
            ref={buttonRef}
            onClick={startListening} 
            className={`mic-button ${isListening ? "active" : ""}`}
        >
            <FontAwesomeIcon icon={faMicrophone} className="mic-icon" />
        </button>
    );
}
