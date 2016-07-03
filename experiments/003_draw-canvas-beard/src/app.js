
import CanvasBuffer from "./CanvasBuffer"

class App {
    constructor() {
        this.target = document.getElementById('target');
        this.targetCtx = this.target.getContext('2d');

        this.canvasInput = document.getElementById('drawCanvas');
        this.cc = this.canvasInput.getContext('2d');

        this.cc.fillStyle = "rgba(0, 0, 0, 1.0)"
        this.cc.fillRect(0,0,400,300);

        this.canvasBuffer = new CanvasBuffer(this.canvasInput);
        this.canvasBuffer.init();
        this.canvasBuffer.shuffle();
        
        window.addEventListener('mousedown',this.onMouseDown.bind(this));
        this.update();
        
    }

    drawPixel(){
        var pixels = this.canvasBuffer.pixels;
        for(var i = 0;i < pixels.length; i++){
            var randColor = Math.floor(Math.random()*255);
            this.targetCtx.fillStyle = "rgba("+randColor+","+randColor+","+randColor+","+1.0+")"
            this.targetCtx.fillRect(pixels[i].x,pixels[i].y,1,1);
        }
    }
    

    update(){
        requestAnimationFrame(this.update.bind(this));
        var pixel = this.canvasBuffer.getNextPixel();
        var randColor = Math.floor(Math.random()*255);
        this.targetCtx.fillStyle = "rgba("+0+","+0+","+0+","+0.4+")"
        this.targetCtx.fillRect(pixel.x,pixel.y,1,3);
    }

    onMouseUp(e) {
        e.preventDefault();
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(e) {

        e.preventDefault();

    }
    onMouseMove(e) {

    }
    onResize() {

    }
}

new App();
