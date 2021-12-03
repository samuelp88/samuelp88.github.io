class EnigneJS {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.screenObjects = [];
        this.toRender = [];
        this.toUpdate = [];
        this.running = false;
        this.framerate = 1;
    }

    static MousePosition = class {
        static x = 0;
        static y = 0;
        static click = false;
    }

    engineStart() {
        canvas.addEventListener("mousemove", (e) => {
            EnigneJS.MousePosition.x = e.offsetX;
            EnigneJS.MousePosition.y = e.offsetY;
        })
        canvas.addEventListener("click", (e) => {
            EnigneJS.MousePosition.x = e.offsetX;
            EnigneJS.MousePosition.y = e.offsetY;
        })
    }

    engineUpdate() {

    }

    addScreenObject(ScreenObject) {
        this.screenObjects.push(ScreenObject);
        this.toUpdate.push(ScreenObject);
        this.toRender.push(ScreenObject);
    }

    getScreenObjectAtPosition(x, y) {
        for (const screenObject of this.screenObjects) {
            if (screenObject.isOverlapingPosition(x, y)) {
                return screenObject;
            }
        }
    }

    render() {
        for (const screenObject of this.toRender) {
            screenObject.render(this.ctx);
        }
    }

    update() {
        for (const screenObject of this.toUpdate) {
            screenObject.update();
        }
    }

    start() {
        this.engineStart();
        for (const screenObject of this.screenObjects) {
            screenObject.start(this.canvas);
        }
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.engineUpdate();
            this.render();
            this.update();
        }, this.framerate)
    }
}

class ScreenObject {
    constructor(x, y, z) {
        let position = { x: x || 0, y: y || 0, z: z || 0 };
        let scale = { width: 50, height: 50 }
        this.transform = { position, scale };
        this.fixedTransform = null;
        this.glow = false;
        this.drag = false;
        this.genericColor = "green";
        this.animation = null;
        this.flag = false;
    }

    doFixedTransform() {
        if(!this.fixedTransform) {
            let scale = { width: this.transform.scale.width, height: this.transform.scale.height }
            let position = {
                x: this.transform.position.x - (this.transform.scale.width / 2),
                y: this.transform.position.y - (this.transform.scale.height / 2)
            }
            this.fixedTransform = {scale, position}
        } else {
            this.fixedTransform.position = {
                x: this.transform.position.x - (this.transform.scale.width / 2),
                y: this.transform.position.y - (this.transform.scale.height / 2)
            }
        }
    }

    setGenericColor(colorName) {
        this.genericColor = colorName;
        return this;
    }

    isOverlapingPosition(x, y) {
        let startingX = this.transform.position.x - (this.transform.scale.width / 2);
        let endingX = this.transform.position.x + (this.transform.scale.width / 2);

        let startingY = this.transform.position.y - (this.transform.scale.height / 2);
        let endingY = this.transform.position.y + (this.transform.scale.height / 2);

        if (x >= startingX && x <= endingX && y >= startingY && y <= endingY)
            return true;
        else return false;
    }

    render(ctx) {
        if (this.glow) {
            RenderUtils.borderCircle(ctx, this.transform.position, 40);
        }
        ctx.fillStyle = this.genericColor;
        this.doFixedTransform();
        ctx.fillRect(
            this.fixedTransform.position.x,
            this.fixedTransform.position.y,
            this.transform.scale.width,
            this.transform.scale.height
        );
    }

    start(canvas) {

    }

    update() {
        if (this.isOverlapingPosition(EnigneJS.MousePosition.x, EnigneJS.MousePosition.y)) {
            this.glow = true;
        }
        else this.glow = false;

        if (this.drag) {
            this.transform.position.x = EnigneJS.MousePosition.x;
            this.transform.position.y = EnigneJS.MousePosition.y;
        } else {
        }
    }
}

class RenderUtils {
    constructor() {
        throw new Error("RendererUtils should not be instantiated!");
    }

    static borderCircle(ctx, position, radius) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, Math.PI * 2, false);
        ctx.stroke();
    }
}

class AnimationRec {
    constructor(screenObject) {
        this.screenObject = screenObject;
        this.playingStateIndex = 0;
        this.states = [];
    }
    static State = class {
        constructor(transform) {
            let position = { x: transform.position.x, y: transform.position.y };
            let scale = { width: transform.scale.width, height: transform.scale.height };
            this.transform = { position, scale };
        }
    }

    recState() {
        this.states.push(new AnimationRec.State(this.screenObject.transform));
    }

    playState() {
        if (this.playingStateIndex > this.states.length-1) this.playingStateIndex = 0;
        const currentState = this.states[this.playingStateIndex];
        if (currentState) {
            this.screenObject.transform.position = { ...currentState.transform.position };
            this.screenObject.transform.scale = { ...currentState.transform.scale };
            this.playingStateIndex++;
        }
    }
}

class ScreenButton extends ScreenObject {
    constructor(x, y, z) {
        super(x, y, z);
        this.transform.scale.width = 100;
    }

    render(ctx) {
        super.render(ctx);
        if(this.glow) {
            RenderUtils.borderCircle(ctx, this.transform.position, this.transform.scale.width / 1.5);
        }
    } 
}