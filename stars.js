var StarDrawer = /** @class */ (function () {
    function StarDrawer() {
        this.stars = [];
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
    StarDrawer.prototype.drawStars = function () {
        var _this = this;
        this.stars.forEach(function (star) {
            star.draw(_this.ctx);
        });
    };
    StarDrawer.prototype.resize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        this.generateStars();
        this.drawStars();
    };
    StarDrawer.prototype.updateColor = function (color) {
        this.starsColor = color;
        this.stars.forEach(function (star) {
            star.updateColor(color);
        });
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStars();
    };
    StarDrawer.prototype.updateStarDensity = function (density) {
        this.starDensity = density;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        this.generateStars();
        this.drawStars();
    };
    StarDrawer.prototype.generateStars = function () {
        for (var i = 0; i < this.canvas.height * this.canvas.width * this.starDensity / 1000; i++) {
            this.stars.push(new Star(this.starsColor));
        }
    };
    return StarDrawer;
}());
var Star = /** @class */ (function () {
    function Star(color) {
        // generate star
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1;
        this.color = color;
    }
    Star.prototype.updateColor = function (color) {
        this.color = color;
    };
    Star.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    return Star;
}());
var starDrawer = new StarDrawer();
var width = window.innerWidth;
window.onload = function () {
    starDrawer.resize();
};
var dialingTimer;
var doneDialingInterval = 300;
// Wall paper engine properties
// @ts-ignore
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.stars_color) {
            var color = properties.stars_color.value.split(' '); // ["1.0", "0.4", "0.2"]
            color = color.map(function (c) {
                return Math.ceil(c * 255);
            });
            starDrawer.updateColor('rgb(' + color + ')');
        }
        if (properties.background_color) {
            var color = properties.background_color.value.split(' '); // ["1.0", "0.4", "0.2"]
            color = color.map(function (c) {
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
var density = 1;
var updateDensity = function () {
    starDrawer.updateStarDensity(density);
};
//# sourceMappingURL=stars.js.map