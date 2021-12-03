let canvas = undefined;

window.addEventListener('resize', () => {
    if(!canvas) canvas = document.getElementById("screen");
    resizeCanvas(canvas);
})

window.addEventListener('load', () => {
    if(!canvas) canvas = document.getElementById("screen");
    resizeCanvas(canvas);
    main(canvas);
})

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

async function main(canvas) {
    const ctx = canvas.getContext('2d');
    const screenObject = new ScreenObject(0, 0, 0);

    const engine = new EnigneJS(canvas, ctx);

    canvas.addEventListener('click', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        const obj = engine.getScreenObjectAtPosition(x, y);
        if(obj) {
            obj.drag = !obj.drag
        }
    })
    engine.start();
    engine.addScreenObject(screenObject);
    engine.addScreenObject(new ScreenObject(50, 450).setGenericColor("blue"));
    engine.addScreenObject(new ScreenButton(500, 500).setGenericColor("red"));
}