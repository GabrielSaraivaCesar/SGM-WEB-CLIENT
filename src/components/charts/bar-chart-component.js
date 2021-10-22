

/**
 * @typedef {object} DataItem
 * @property {Number} x
 * @property {Number} y
 * @property {string} xLabel
 * @property {string} yLabel
 */


 class BarChart extends ChartComponent {

    /** @public */
    constructor() {
        super();
        this._shadow = this.attachShadow({mode: "open"});
        this._createRoot();
        this._createStyle();
        this.draw();
        this._setListeners();
    }

    /** @private @returns {void} */
    _drawData() {
        if (this._data.length === 0) return;
        let barWidth = this.canvas.width / this._data[0].length  - 10;
        this._data[0].forEach((_, index) => {

            let dataItems = [];
            this._data.forEach((bar, barIndex) => {
                bar[index].color = this.colors[barIndex] || this.colors[0];
                dataItems.push(bar[index]);
            });

            dataItems = dataItems.sort((a, b) => {
                if (a.y === b.y) return 0;
                else if (a.y < b.y) return -1;
                else return 1;
            }).reverse();

            dataItems.forEach(dataItem => {
                this.context.fillStyle = dataItem.color;
                this.context.beginPath();
                
                let x = this._getXPositioningByXValue(dataItem.x).absolute;
                let y = this._getYPositioningByYValue(dataItem.y).absolute + 5;
                this.context.rect(x-(barWidth/2), y-5, barWidth, this.canvas.height - y + 5 -  45);
                this.context.fill();
            });

            
          
            this.context.closePath();
        })
    }

    
}

customElements.define('bar-chart', BarChart);