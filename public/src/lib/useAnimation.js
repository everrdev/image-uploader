import { useEffect, useState } from "react"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default function useAnimation(duration, func) {
    const [progress, setProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [startDate, setStartDate] = useState(Date.now())

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (!isPlaying) return;

            let sinceStart = Date.now() - startDate;
            let timeProgress = sinceStart / duration;

            timeProgress = clamp(timeProgress, 0, 1)
            setProgress( clamp( func( timeProgress ), 0, 1 ) )

            if (func(timeProgress) === NaN || timeProgress === NaN) {
                console.log("NaN with t:" + timeProgress + " and p: " + func(timeProgress))
            }

            if (timeProgress === 1) {
                setIsPlaying(false)
            }
        }, 10);

        return () => { clearInterval(intervalId) }
    });

    function playAnimation() {
        setIsPlaying(true)
        setStartDate(Date.now())
    }

    return [progress, playAnimation]
}