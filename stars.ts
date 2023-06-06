
class StarDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private stars: Star[] = [];
    private starDensity: number;
    private starsColor: string;

    constructor() { 
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.canvas.style.position = "absolute";
        this.canvas.style.zIndex = "-1";

        this.starDensity = 1;
        this.starsColor = "#ffffff";
    }

    public drawStars() {
        this.stars.forEach(star => {
            star.draw(this.ctx);
        });
    }

    public resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        this.generateStars();
        this.drawStars();
    }

    public updateColor(color: string) {
        this.starsColor = color;
        this.stars.forEach(star => {
            star.updateColor(color);
        });
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStars();
    }

    public updateStarDensity(density: number) {
        this.starDensity = density;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        this.generateStars();
        this.drawStars();
    }

    private generateStars() {
        for (let i = 0; i < this.canvas.height * this.canvas.width * this.starDensity/1000; i++) {
            this.stars.push(new Star(this.starsColor));
        }
    }
    
}

class Star {
    private x: number;
    private y: number;
    private size: number;
    private color: string;
    constructor(color: string) {
        // generate star
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1;
        this.color = color;
    }

    public updateColor(color: string) {
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

}

const starDrawer = new StarDrawer();
let width = window.innerWidth;

window.onload = () => {
    starDrawer.resize();
}

let dialingTimer;  
let doneDialingInterval = 300; 

// Wall paper engine properties
 // @ts-ignore
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.stars_color) {
            var color = properties.stars_color.value.split(' '); // ["1.0", "0.4", "0.2"]
            color = color.map(function(c) {
                return Math.ceil(c * 255);
            });
            starDrawer.updateColor('rgb(' + color + ')');
        }
        if (properties.background_color) {
            var color = properties.background_color.value.split(' '); // ["1.0", "0.4", "0.2"]
            color = color.map(function(c) {
                return Math.ceil(c * 255);
            });
            document.body.style.backgroundColor = 'rgb(' + color + ')';
        }
        if (properties.star_density) {
            clearTimeout(dialingTimer);
            density = properties.star_density.value;
            dialingTimer = setTimeout(updateDensity, doneDialingInterval);
        }
    },
};

let density = 1;
const updateDensity = () => {
    starDrawer.updateStarDensity(density);
}
