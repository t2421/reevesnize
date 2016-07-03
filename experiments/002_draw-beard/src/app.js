
import clm from 'exports?clm!clmtrackr/clmtrackr';
import defaultModel from 'exports?pModel!clmtrackr/models/model_pca_20_svm';
import FaceTracker from './Facetracker'
import CanvasBuffer from "./CanvasBuffer"
class App {
    constructor() {
        this.tracker = new FaceTracker();
        this.target = document.getElementById('inputImage');
        var image = new Image();
        image.src = this.target.src;
        image.onload = ()=>{
            var imageCanvas = this.createImageCanvas(this.target);

            this.tracker.start(imageCanvas);
        }
        this.canvasInput = document.getElementById('drawCanvas');
        this.cc = this.canvasInput.getContext('2d');

        this.canvasInput.width = this.target.width;
        this.canvasInput.height = this.target.height;
        
        
        this.beardCanvas = document.getElementById('beardCanvas');
        this.beardCanvas.width = this.target.width;
        this.beardCanvas.height = this.target.height;
        // this.update();

        window.addEventListener('mousedown',this.onMouseDown.bind(this));
        document.addEventListener("converged",this.onConverged.bind(this));
        
    }
    
    createImageCanvas(image){
        const threshold = 200;
        if(image.width > threshold){
            this.scale = threshold / image.width;
            var width = image.width *this.scale;
            var height = image.height *this.scale;
        }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var cc = canvas.getContext('2d');
        cc.drawImage(image,0,0,width,height);
        document.querySelector("body").appendChild(canvas);
        return canvas;
        
    }
    onConverged(){

        this.isStop = true;
        this.tracker.update();
        //this.tracker.drawPoints(this.canvasInput);
        const leftBeard = this.tracker.faceParts.leftBeard;
        const rightBeard = this.tracker.faceParts.rightBeard;
        const lowerBeard = this.tracker.faceParts.lowerBeard;
        const uppperBeard = this.tracker.faceParts.uppperBeard;

        this.drawBeard(leftBeard);
        this.drawBeard(rightBeard);
        this.drawBeard(lowerBeard);
        this.drawBeard(uppperBeard);
    }

    drawBeard(beardParts){

        this.cc.fillStyle = "rgba(0,0,0,0.2)";
        this.cc.beginPath();
        this.cc.moveTo(beardParts[0][0]/this.scale,beardParts[0][1]/this.scale);
        for (var i = 1; i < beardParts.length; i++) {
            this.cc.lineTo(beardParts[i][0]/this.scale,beardParts[i][1]/this.scale);
        };

        this.cc.closePath();
        this.cc.fill();

        this.canvasBuffer = new CanvasBuffer(this.canvasInput);
        this.canvasBuffer.init();
        this.canvasBuffer.shuffle();
        this.updateBeard();

    }

    update(){
        if(this.isStop)
        requestAnimationFrame(this.update.bind(this));
        if(!this.tracker){
            return;
        }
        this.cc.clearRect(0, 0, this.canvasInput.width, this.canvasInput.height);
        this.tracker.update();
        this.tracker.drawPoints(this.canvasInput);
    }

    updateBeard(){
        var ctx = this.beardCanvas.getContext('2d');
        requestAnimationFrame(this.updateBeard.bind(this));
        var pixel = this.canvasBuffer.getNextPixel();
        ctx.fillStyle = "rgba("+0+","+0+","+0+","+0.1+")"
        ctx.fillRect(pixel.x,pixel.y,1,3);
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
