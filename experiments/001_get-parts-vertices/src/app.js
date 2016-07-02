
import clm from 'exports?clm!clmtrackr/clmtrackr';
import defaultModel from 'exports?pModel!clmtrackr/models/model_pca_20_svm';
import FaceTracker from './Facetracker'
class App {
    constructor() {
        this.tracker = new FaceTracker();
        this.target = document.getElementById('inputImage');
        
        this.canvasInput = document.getElementById('drawCanvas');
        this.cc = this.canvasInput.getContext('2d');

        this.canvasInput.width = this.target.width;
        this.canvasInput.height = this.target.height;
        
        var imageCanvas = this.createImageCanvas(this.target);
        
        // this.update();

        window.addEventListener('mousedown',this.onMouseDown.bind(this));
        document.addEventListener("converged",this.onConverged.bind(this));
        this.tracker.start(imageCanvas);
        
    }
    
    createImageCanvas(image){
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var cc = canvas.getContext('2d');
        cc.drawImage(image,0,0);
        return canvas;
        //document.querySelector("body").appendChild(canvas);
    }
    onConverged(){
        this.isStop = true;
        this.tracker.update();
        this.tracker.drawPoints(this.canvasInput);
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
