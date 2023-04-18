import { useEffect } from "react";
import useAnimation from "../lib/useAnimation";

function lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export default function ProgressBar({ fill, onAnimationCompleted = function() {} }) {
    const [anim, playAnim] = useAnimation(400, x => 1 - Math.pow(1 - x, 4))

    useEffect(() => {
        if (fill >= 0.95 && anim == 0) {
            playAnim()
        }
    }, [fill])

    useEffect(() => {
        if (anim == 1)
            onAnimationCompleted()
    }, [anim])

    return (
        <div className="progressbar">
            <div className="progressbar-filler" style={{
                width: `${ fill * 340 }px`,
                backgroundColor: lerpColor("#2F80ED", "#61d800", anim),
            }}>
            </div>
        </div>
    );
}