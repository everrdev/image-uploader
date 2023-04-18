import React, { useState } from "react";
import Button from "./Button";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TextOutputCopyable({ text, buttonText }) {
    const [textElementRef, setЕextElementRef] = useState(React.createRef())

    function onCopy(event) {
        select()

        document.execCommand('copy');
        toast.success('Copied link to clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    function select() {
        textElementRef.current.focus()
        textElementRef.current.select()
        textElementRef.current.setSelectionRange(0, 99999)
    }

    return (
        <div className="textoutput-container">
            <input className="textoutput-display" onMouseDown={e => e.preventDefault()} ref={textElementRef} value={text} readOnly/>
            <Button onClick={onCopy} text={buttonText} />
        </div>
    );
}