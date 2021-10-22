

/**
 * @typedef {object} DataItem
 * @property {Number} x
 * @property {Number} y
 * @property {string} xLabel
 * @property {string} yLabel
 */

class LineChart extends ChartComponent {

    /** @public */
    constructor() {
        super();
        this._shadow = this.attachShadow({mode: "open"});
        this._createRoot();
        this._createStyle();
        this.draw();
        this._setListeners();
    }

    /** @override @private @returns {void} */
    _drawData() {
        this.context.lineWidth = 3;
        this._data.forEach((line, index) => {
            this.context.strokeStyle = this.colors[index] || this.colors[0];
            this.context.beginPath();
            let x = 0;
            let y = 0;
            line.forEach((dataItem, index) => {
                x = this._getXPositioningByXValue(dataItem.x).absolute;
                y = this._getYPositioningByYValue(dataItem.y).absolute + 5;
                if (index === 0) {
                    this.context.moveTo(x, y);
                } else {
                    this.context.lineTo(x, y);
                }
            });
            this.context.stroke();
            let grdY = this._getYPositioningByYValue(this.minY).absolute + 5;
            this.context.lineTo(x, grdY);
            this.context.lineTo(this._getXPositioningByXValue(line[0].x).absolute, grdY);
            var grd = this.context.createLinearGradient(0, this._getYPositioningByYValue(this.maxY).absolute, 0, this.canvas.height);
            grd.addColorStop(0, ((this.colors[index] || this.colors[0]) + "50"));
            grd.addColorStop(1, ((this.colors[index] || this.colors[0]) + "00"));
            this.context.fillStyle = grd;
            this.context.fill();
            this.context.closePath();
        })
    }

    
}

customElements.define('line-chart', LineChart);