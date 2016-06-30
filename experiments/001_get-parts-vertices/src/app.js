
import clm from 'exports?clm!clmtrackr/clmtrackr';
import defaultModel from 'exports?pModel!clmtrackr/models/model_pca_20_svm';
import FaceTracker from './Facetracker'
class App {
    constructor() {
        this.update();
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
        console.log(this.tracker.normalize(this.tracker.positions))
    }
    onMouseMove(e) {
        e.preventDefault();
        let x =  e.clientX - Config.RENDER_WIDTH/2;
        let y =  e.clientY - Config.RENDER_HEIGHT/2;
        this.mouse.x = x;
        this.mouse.y = y;


        //this.update();
    }
    onResize() {
        //this.camera.aspect = window.innerWidth / window.innerHeight;
        //this.camera.updateProjectionMatrix();
        //this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

new App();
