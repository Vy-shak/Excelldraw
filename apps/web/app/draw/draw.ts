import { Rect } from "fabric"

function Drawrect({ canvas }) {
    if (canvas) {
        const rect = new Rect({
            top: 100,
            left: 50,
            width: 100,
            height: 60,
            fill: '#E03131'


        });
        canvas.add(rect)
    }
}

export { Drawrect }