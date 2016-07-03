export default class CanvasBuffer{
    
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pixels = undefined;
        this.currentPixelIndex = 0;
    }
    
    init(){
        const imgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);

        this.pixels = [];

        for (var x = 0; x < imgData.width; x++) {
            for(var y = 0; y < imgData.height; y++){
                let pixel = getPixelXY(imgData,x,y);
                if(pixel[3] > 0){
                    this.pixels.push({x:x,y:y});
                }
            }
        };

        function getPixel(imgData, index) {
          var i = index*4, d = imgData.data;
          return [d[i],d[i+1],d[i+2],d[i+3]] // returns array [R,G,B,A]
        }
        function getPixelXY(imgData, x, y) {
          return getPixel(imgData, y*imgData.width+x);
        }
    }

    shuffle(){
        var array = this.pixels;
        var n = array.length, t, i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }

    getNextPixel(){
        var pixel = this.pixels[this.currentPixelIndex];
        this.currentPixelIndex++;
        if(this.currentPixelIndex >= this.pixels.length){
            this.currentPixelIndex = 0;
        }
        return pixel;
    
    }
    
}   