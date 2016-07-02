
import clm from 'exports?clm!clmtrackr/clmtrackr';
import defaultModel from 'exports?pModel!clmtrackr/models/model_pca_20_svm';
import FaceTracker from './Facetracker'
class App {
    constructor() {
        this.tracker = new FaceTracker();
      
        this.target = document.getElementById('inputVideo');
        this.target.loop = true;
        this.tracker.start(this.target);
        this.canvasInput = document.getElementById('drawCanvas');
        this.cc = this.canvasInput.getContext('2d');
        this.update();
        window.addEventListener('mousedown',this.onMouseDown.bind(this));
      
    }
 
    update(){
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
