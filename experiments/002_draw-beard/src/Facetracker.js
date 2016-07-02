import clm from 'exports?clm!clmtrackr/clmtrackr';
import defaultModel from 'exports?pModel!clmtrackr/models/model_pca_20_svm';

export default class FaceTracker{
    
    constructor(){
        this.threshold = 300;
        this.faceIndeces = new FaceIndeces();
        this.faceParts = new FaceParts();

        this.vertices = [];
        this.tracker = new clm.tracker({useWebGL: true,stopOnConvergence:true});
        this.model = defaultModel;
        this.tracker.init(this.model);
        this.positions = undefined;
        document.addEventListener('clmtrackrNotFound', this.onTrackrNotFound.bind(this));
        document.addEventListener('clmtrackrLost', this.onTrackrLost.bind(this));
        document.addEventListener('clmtrackrConverged',this.onTrackConverged.bind(this));
        this.edge = [];
    }
    
    init(){
    } 

    start(target){

        this.tracker.start(target);
    }



    destroy(){
        this.positions = undefined;
        this.vertices = undefined;
    }


    update(){
        if(!this.tracker){
            return;
        }
        this.positions = this.tracker.getCurrentPosition();
        this.mapParts();
    }

    //@see https://github.com/dot-by-dot-inc/KAMRA-Deja-Vu/blob/master/experiments/04%20-%20Face%20Deformation/src/facetracker.js
    normalize(points){
        let center = points[62];
        let min = [Number.MAX_VALUE, Number.MAX_VALUE];
        let max = [Number.MIN_VALUE, Number.MIN_VALUE];
        let size = Math.abs(points[13][0] - points[1][0]) * 0.5;
        return points.map((p) => {
          let q = [(p[0] - center[0]) / size, (p[1] - center[1]) / size];
          if (q[0] < min[0]) min[0] = q[0];
          if (q[0] > max[0]) max[0] = q[0];
          if (q[1] < min[1]) min[1] = q[1];
          if (q[1] > max[1]) max[1] = q[1];
          return q;
        });
    }

    draw(canvas){
        this.tracker.draw(canvas);
    }

    drawPoints(canvas){
        let cc = canvas.getContext("2d");
        cc.fillStyle = "rgb(192, 80, 77)"

        this._drawPartsPoints(cc,this.faceParts.edge);
        this._drawPartsPoints(cc,this.faceParts.upperLip);
        this._drawPartsPoints(cc,this.faceParts.lowerLip);
        this._drawPartsPoints(cc,this.faceParts.rightEyebrows);
        this._drawPartsPoints(cc,this.faceParts.leftEyebrows);
        this._drawPartsPoints(cc,this.faceParts.leftPupil);
        this._drawPartsPoints(cc,this.faceParts.rightPupil);
        this._drawPartsPoints(cc,this.faceParts.leftEye);
        this._drawPartsPoints(cc,this.faceParts.rightEye);
        this._drawPartsPoints(cc,this.faceParts.noseLine);
        this._drawPartsPoints(cc,this.faceParts.noseEdge);
        

        cc.fillStyle = "rgb(0, 80, 77)"
        this._drawPartsPoints(cc,this.faceParts.leftBeard);
        this._drawPartsPoints(cc,this.faceParts.rightBeard);
        this._drawPartsPoints(cc,this.faceParts.lowerBeard);
        this._drawPartsPoints(cc,this.faceParts.upperBeard);        

    }

    _drawPartsPoints(cc,partsPoints){
        if(!partsPoints) return;
        partsPoints.map((p)=>{
            if(!p) return
            cc.fillRect(p[0],p[1],6,6);
        })
    }

    mapParts(){
        this.faceParts.edge = [];
        this.faceIndeces.edge.map((idx)=>{
            this.faceParts.edge.push(this.positions[idx]);
        });

        this.faceParts.upperLip = [];
        this.faceIndeces.upperLip.map((idx)=>{
            this.faceParts.upperLip.push(this.positions[idx]);
        
        });

        this.faceParts.lowerLip = [];
        this.faceIndeces.lowerLip.map((idx)=>{
            this.faceParts.lowerLip.push(this.positions[idx]);
        
        });

        this.faceParts.leftEyebrows = [];
        this.faceIndeces.leftEyebrows.map((idx)=>{
            this.faceParts.leftEyebrows.push(this.positions[idx]);
        
        });

        this.faceParts.rightEyebrows = [];
        this.faceIndeces.rightEyebrows.map((idx)=>{
            this.faceParts.rightEyebrows.push(this.positions[idx]);
        
        });

        this.faceParts.leftPupil = [];
        this.faceIndeces.leftPupil.map((idx)=>{
            this.faceParts.leftPupil.push(this.positions[idx]);
        
        });

        this.faceParts.rightPupil = [];
        this.faceIndeces.rightPupil.map((idx)=>{
            this.faceParts.rightPupil.push(this.positions[idx]);
        
        });

        this.faceParts.leftEye = [];
        this.faceIndeces.leftEye.map((idx)=>{
            this.faceParts.leftEye.push(this.positions[idx]);
        
        });
        this.faceParts.rightEye = [];
        this.faceIndeces.rightEye.map((idx)=>{
            this.faceParts.rightEye.push(this.positions[idx]);
        
        });

        this.faceParts.noseLine = [];
        this.faceIndeces.noseLine.map((idx)=>{
            this.faceParts.noseLine.push(this.positions[idx]);
        
        });

        this.faceParts.noseEdge = [];
        this.faceIndeces.noseEdge.map((idx)=>{
            this.faceParts.noseEdge.push(this.positions[idx]);
        
        });

        this.faceParts.leftBeard = [];
        this.faceIndeces.leftBeard.map((idx)=>{
            this.faceParts.leftBeard.push(this.positions[idx]);
        
        });

        this.faceParts.rightBeard = [];
        this.faceIndeces.rightBeard.map((idx)=>{
            this.faceParts.rightBeard.push(this.positions[idx]);
        
        });

        this.faceParts.lowerBeard = [];
        this.faceIndeces.lowerBeard.map((idx)=>{
            this.faceParts.lowerBeard.push(this.positions[idx]);
        
        });

        this.faceParts.uppperBeard = [];
        this.faceIndeces.uppperBeard.map((idx)=>{
            this.faceParts.uppperBeard.push(this.positions[idx]);
        
        });
    }

    onTrackrNotFound() {
        console.log("notfound")
    }

    onTrackrLost() {
        console.log("onTrackrLost")
    }

    onTrackConverged() {
        var evt = document.createEvent("Event");
        evt.initEvent("converged", true, true);
        document.dispatchEvent(evt)
    }
}   


class FaceParts{
    constructor(){
        this.edge = [];
        this.leftEyebrows = [];
        this.rightEyebrows = [];
        this.rightEye = [];
        this.rightPupil = [];
        this.leftEye = [];
        this.leftPupil = [];
        this.noseLine = [];
        this.noseEdge = [];
        this.lowerLip = [];
        this.upperLip = [];
        this.leftBeard = [];
        this.rightBeard = [];
        this.lowerBeard = [];
        this.uppperBeard = [];
    }

    update(){

    }

    draw(){

    }
}


class FaceIndeces{
    constructor(){
        this.edge = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        this.leftEyebrows = [15,16,17,18];
        this.rightEyebrows = [19,20,21,22];
        this.rightEye = [23,66,26,65,25,64,24,63];
        this.rightPupil = [27];
        this.leftEye = [30,69,31,70,28,67,29,68];
        this.leftPupil = [32];
        this.noseLine = [33,41,62];
        this.noseEdge = [34,35,36,42,37,43,38,39,40]
        this.lowerLip = [44,55,54,53,52,51,50,58,57,56];
        this.upperLip = [44,61,60,59,50,49,48,47,46,45];

        this.leftBeard = [1,2,3,4,5,44,35];
        this.rightBeard = [39,50,9,10,11,12,13];
        this.lowerBeard = [44,5,6,7,8,9,50,51,52,53,54,55];
        this.uppperBeard = [36,44,45,46,47,48,49,50,38,43,37,42];
    }
}