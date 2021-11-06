

class ChartComponent extends HTMLElement {
    /** @protected @type {ShadowRoot} */
    _shadow = null;

    /**@protected @type {DataItem[][]} */
    _data = [];

    /** @public @type {HTMLElement} */
    root = null;

    /** @public @type {HTMLCanvasElement} */
    canvas = null;

    /** @public @type {CanvasRenderingContext2D} */
    context = null;

    /** @public @type {DataItem} */
    closestDataItem = null;

    /** @public @type {string[]} */
    colors = [
        "#3751FF",
        "#8797ff",
        "#596fff",
        "#bac3ff"
    ];

    /** @protected @type {boolean} */
    _showData = false;

    constructor() {
        super();
    }

    /** @public @returns {void} */
    resizeCanvasDrawing() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    /** @public @returns {DataItem[][]} */
    getData() {
        return this._data;
    }

    /** @public @param {DataItem[][]} newData @returns {void} */
    setData(newData) {
        this._data = newData;
        this._data.forEach(line => { // Setting MAXs and MINs
            line.forEach(dataItem => {
                if (this.minX == null || dataItem.x < this.minX) this.minX = dataItem.x;
                if (this.minY == null || dataItem.y < this.minY) this.minY = dataItem.y;
                if (this.maxX == null || dataItem.x > this.maxX) this.maxX = dataItem.x;
                if (this.maxY == null || dataItem.y > this.maxY) this.maxY = dataItem.y;
            })
        });
        if (this.maxY == this.minY) {
        }
        this.maxY *= 1.1
        if (this.minY != 0) {
            this.minY -= this.maxY * 0.1;
        }
        this.draw();
    }

    /** @public @param {boolean} value @returns {void} */
    setShowData(value) {
        this._showData = value;
        this.draw();
    }

    /** 
     * Draw chart data into the canvas
     * @public @returns {void}
     *  */
     draw() {
        this.resizeCanvasDrawing();
        if (this._data && this._data.length > 0) {
            this._drawXSegments();
            this._drawYSegments();
            if (this._showData) {
                this._drawData();
                this._drawTipBox();
            }
        }
    }


    /** @protected @virtual @returns {void} */
    _drawData() {}
    /** @protected @virtual @returns {void} */
    _drawTipBox() {
        if (this.closestDataItem != null) {
            let value = this.closestDataItem.yLabel ? this.closestDataItem.yLabel : this.closestDataItem.y.toFixed(2);
            let r = 5;
            let w = 40 + (value.length * 5);
            let h = 38;
            let spacing = 25;
            let itemX = this._getXPositioningByXValue(this.closestDataItem.x).absolute;
            let itemY = this._getYPositioningByYValue(this.closestDataItem.y).absolute;
            let x = itemX - (w/2);
            let y = itemY - (h/2) - spacing;

            let prex = x;
            let prey = y;

            this.context.beginPath();
            this.context.strokeStyle = "#3751FF90"
            this.context.arc(itemX, itemY, 13, 0 , 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
            this.context.beginPath();
            this.context.fillStyle = "#3751FF"
            this.context.arc(itemX, itemY, 10, 0 , 2 * Math.PI);
            this.context.fill();
            this.context.closePath();
            this.context.beginPath();
            this.context.fillStyle = "#ffffff"
            this.context.arc(itemX, itemY, 4, 0 , 2 * Math.PI);
            this.context.fill();
            this.context.closePath();

            
            let clippingOnTop = itemY - h - spacing < 0;
            let clippingOnLeft = itemX - (w/2) < 0;
            let boxY = clippingOnTop ? itemY + spacing  : itemY - spacing - h;
            let boxX = clippingOnLeft ? 10 : x;

            this.context.fillStyle = "#ffffff";
            this.context.strokeStyle = "#DFE0EB";
            this.context.beginPath();
            this.context.moveTo(boxX+r, boxY);
            if (clippingOnTop) {
                this.context.lineTo(boxX+(w/2)-10, boxY,   boxX+w, boxY+h, r);
                this.context.lineTo(boxX+(w/2), boxY-8,   boxX+w, boxY+h, r);
                this.context.lineTo(boxX+(w/2)+10, boxY,   boxX+w, boxY+h, r);
            }
            this.context.arcTo(boxX+w, boxY,   boxX+w, boxY+h, r);
            this.context.arcTo(boxX+w, boxY+h, boxX,   boxY+h, r);

            if (!clippingOnTop && prex > 0) {
                this.context.lineTo(boxX+(w/2)+10,   boxY+h, boxX,   boxY,   r);
                this.context.lineTo(boxX+(w/2),   boxY+h+8, boxX,   boxY,   r);
                this.context.lineTo(boxX+(w/2)-10,   boxY+h, boxX,   boxY,   r);
            }

            this.context.arcTo(boxX,   boxY+h, boxX,   boxY,   r);
            this.context.arcTo(boxX,   boxY,   boxX+w, boxY,   r);
            this.context.shadowColor = "#00000050";
            this.context.shadowBlur = 6;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.fillStyle = "#ffffff";
            this.context.stroke();
            this.context.fill();
            this.context.closePath();
            this.context.shadowColor = "transparent";

            
            this.context.font = "bold 14px Arial";
            this.context.fillStyle = "#252733";
            this.context.textAlign = "left";
            this.context.fillText(value, boxX+(w/2)-(value.length*7/2), boxY+(h/2)+5);

            
            

        }
    }


    /** @protected @returns {void} */
    _createRoot() {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("component-root", "");
        this._shadow.appendChild(canvas);
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    /** @protected @returns {void} */
    _createStyle() {
        const style = document.createElement("style");
        style.textContent = `
            canvas[component-root] {
                width: 100%;
                height: 100%;
            }
        `;
        this._shadow.appendChild(style);
    }

    /** @protected @returns {void} */
    _setListeners() {
        window.addEventListener("resize", () => this.draw());
        this.canvas.addEventListener("mousemove", (event) => this._onMouseMove(event))
        this.canvas.addEventListener("mouseleave", (event) => this._onMouseLeave(event))
        this.canvas.addEventListener("click", (event) => this._onClick(event));
    }

    /** @protected @virtual @param {Event} event @returns {void} */
    _setChartEvent(event) {
        event.chartEvent = {
            element: this,
            hoveringItem: this.closestDataItem,
            canvas: this.canvas,
            context: this.context,
        }
    }

    /** @protected @virtual @param {Event} event @returns {void} */
    _onClick(event) {
        this._setChartEvent(event);
    }

    /** @protected @virtual @param {Event} event @returns {void} */
    _onMouseMove(event) {
        this._setChartEvent(event);
        let x = event.x - this.canvas.getBoundingClientRect().x;
        let y = event.y - this.canvas.getBoundingClientRect().y;
        this.closestDataItem = null;
        this._data.forEach(lines => {
            lines.forEach(dataItem => {
                let itemDistanceX = Math.abs(this._getXPositioningByXValue(dataItem.x).absolute - x);
                let itemDistanceY = Math.abs(this._getYPositioningByYValue(dataItem.y).absolute - y);
                if (itemDistanceX < 60 && itemDistanceY < 60) {
                    if (!this.closestDataItem) this.closestDataItem = dataItem;
                    else {
                        let closestDistanceX = Math.abs(this._getXPositioningByXValue(this.closestDataItem.x).absolute - x);
                        let closestDistanceY = Math.abs(this._getYPositioningByYValue(this.closestDataItem.y).absolute - y);
        
                        if (itemDistanceX < closestDistanceX) {
                            this.closestDataItem = dataItem;
                        } else if (itemDistanceX == closestDistanceX) {
                            if (itemDistanceY < closestDistanceY) {
                                this.closestDataItem = dataItem;
                            }
                        }
                    }
                }
            });
        });
        this.draw();
    }

    /** @protected @virtual @param {Event} event @returns {void} */
    _onMouseLeave(event) {
        this._setChartEvent(event);
        if (!this.closestDataItem) {
            this.closestDataItem = null;
            this.draw();
        }
    }


    

    /** @protected @returns {void} */
    _drawXSegments() {
        let yPos = this.canvas.height - 10;
        this.context.font = "10px Arial";
        this.context.fillStyle = "#9FA2B4";
        this.context.textAlign = "center";

        let xList = this._data[0].map(dataItem => {
            return {value: dataItem.x, label: dataItem.xLabel};
        });


        xList.forEach(x => {
            let xPos = this._getXPositioningByXValue(x.value).absolute;
            this.context.fillText(Math.round(x.value), xPos, yPos);
        });
    }

    /** @protected @returns {void} */
    _drawYSegments() {
        let maxSegments = 5;
        let segmentsAdder = (this.maxY - this.minY) / maxSegments;
        let xPos = this.canvas.width - 12.5;
        this.context.font = "10px Arial";
        this.context.fillStyle = "#9FA2B4";
        this.context.textAlign = "center";

    

        for (let i = this.minY; i < this.maxY+1; i+= segmentsAdder) {
            let yPos = this._getYPositioningByYValue(i).absolute;
            this.context.strokeStyle = "#EBEDF0";   
            this.context.moveTo(0, yPos + 5);
            this.context.lineTo(this.canvas.width, yPos + 5);
            this.context.stroke();
            this.context.fillText(i.toFixed(2), xPos, yPos);
        }
    }

    /** @protected @param {number} value @returns {{relative: number, absolute: number}} */
    _getXPositioningByXValue(value) {
        let canvasWidth = this.canvas.width;
        let relative = (value - this.minX) / (this.maxX - this.minX);
        return {
            relative: relative,
            absolute: (relative * (canvasWidth- 70 )) + 10
        }
    }

    /** @protected @param {number} value @returns {{relative: number, absolute: number}} */
    _getYPositioningByYValue(value) {
        let canvasHeight = this.canvas.height;
        let relative = (((value - this.minY) / (this.maxY - this.minY)) - 1) * -1;
        return {
            relative: relative,
            absolute: (relative * (canvasHeight - 60)) + 10    
        }
    }

    
}