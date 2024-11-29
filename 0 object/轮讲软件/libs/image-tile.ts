interface TileInfo {
    x: number;      // 磁贴指针的X坐标
    y: number;      // 磁贴指针的Y坐标
    tileX: number;  // 磁贴的X坐标
    tileY: number;  // 磁贴的Y坐标
    content: string;// 磁贴的内容
}

class ImageTile extends HTMLElement {
    public tileContent: HTMLElement;
    public tiles: TileInfo[];
    public svgCanvas: SVGElement;


    public initSVGCanvas() {
        /*生成一个SVG画布，宽度为屏幕宽度，高度为tileContent高度，并添加到当前元素的影子节点*/
        const svgNS = "http://www.w3.org/2000/svg";
        this.svgCanvas = document.createElementNS(svgNS, "svg");
        this.svgCanvas.setAttribute("width", `${window.innerWidth}`);

        const that: this = this;

        this.svgCanvas.classList.add("svg");
        this.appendChild(this.svgCanvas);

        const child = that.tileContent.children[0];

        if (this.getAttribute("height")) {
            that.svgCanvas.setAttribute("height", `${this.getAttribute("height")}px`);
            return;
        }

        if (child instanceof HTMLImageElement) {
            child.style.height = "100%";
            child.style.width = "100%";

            const ratio = child.height / child.width;
            const totalY = ratio * window.innerWidth;

            that.svgCanvas.setAttribute("height", `${totalY}px`);
        } else {
            that.svgCanvas.setAttribute("height", `400px`);
        }
    }

    public initTileContent() {
        this.tileContent.classList.add("tile-content");
    }

    /**
     * 获取调整后的磁贴位置，以避免重叠和超出边界
     * @param x 磁贴的初始x坐标
     * @param y 磁贴的初始y坐标
     * @param radius 磁贴半径，用于计算位置
     * @param svgWidth SVG的宽度，用于边界检查
     * @param svgHeight SVG的高度，用于边界检查
     * @param existingTiles 已存在的磁贴数组，包含它们的坐标，用于避免重叠
     * @param paddingX 横向边界内边距，防止磁贴贴近SVG边界
     * @param paddingY 纵向边界内边距，防止磁贴贴近SVG边界
     * @param angle 当前磁贴和中心点所呈现的夹角
     * @returns 返回调整后的磁贴位置对象，包含endX和endY坐标
     */
    public getAdjustedPosition(
        x: number,
        y: number,
        radius: number,
        svgWidth: number,
        svgHeight: number,
        existingTiles: Array<{ x: number; y: number }>,
        paddingX: number,
        paddingY: number,
        angle: number
    ): { endX: number; endY: number } {
        // 中心点到磁贴的角度
        /*       const deltaX = x - svgWidth / 2;
               const deltaY = y - svgHeight / 2;
               let angle = Math.atan2(deltaY, deltaX);*/

        // 计算初始位置
        let endX = x + radius * Math.cos(angle);
        let endY = y + radius * Math.sin(angle);

        // 边界检查
        if (endX < 0 || endX > svgWidth || endY < 0 || endY > svgHeight) {
            // 调整策略：找到 SVG 中最近的空闲位置
            // const padding = 20; // 防止贴近边界
            if (endX < 0) endX = paddingX;
            if (endX > svgWidth) endX = svgWidth - paddingX;
            if (endY < 0) endY = paddingY;
            if (endY > svgHeight) endY = svgHeight - paddingY;
        }

        // 防止重叠
        const minDistance = 50; // 磁贴之间的最小距离
        for (let i = 0; i < existingTiles.length; i++) {
            const other = existingTiles[i];
            const dist = Math.sqrt(
                Math.pow(endX - other.x, 2) + Math.pow(endY - other.y, 2)
            );
            if (dist < minDistance) {
                // 如果发生重叠，调整角度并重新计算位置
                angle += Math.PI / 8; // 旋转 22.5 度
                endX = x + radius * Math.cos(angle);
                endY = y + radius * Math.sin(angle);

                // 边界检查（再次确认新位置是否超出边界）
                if (endX < 0) endX = paddingX;
                if (endX > svgWidth) endX = svgWidth - paddingX;
                if (endY < 0) endY = paddingY;
                if (endY > svgHeight) endY = svgHeight - paddingY;

                // 重新检查新位置是否仍然重叠
                i = -1; // 重置检查，重新遍历所有磁贴
            }
        }

        return {endX, endY};
    }

    public initTile() {
        /*这是磁贴，用于解释磁贴内容元素，以辐射状均匀分布于SVG画布周围*/
        const svgCentralPoint = [this.svgCanvas.clientWidth / 2, this.svgCanvas.clientHeight / 2];

        this.tiles.forEach((tile) => {
            // 创建磁贴外框
            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

            // 磁贴的位置
            const x = tile.x * this.svgCanvas.clientWidth;
            const y = tile.y * this.svgCanvas.clientHeight;

            //计算直线的方向和角度
            const deltaX = x - svgCentralPoint[0];
            const deltaY = y - svgCentralPoint[1];


            // 弧度转换角度
            const radiusToDeg = function (angle: number): number {
                return angle * 180 / Math.PI;
            }

            const converseTo2PI = function (theta: number): number {
                while (theta < 0) {
                    theta += 2 * Math.PI;
                }
                return theta % (2 * Math.PI)

            }
            /*
            * 用于将一个角度向最左端和最右端靠拢，避免角度过于倾向于中间*/
            const angularDistribution = function (theta) {
                // 靠拢系数
                const k = 2 / 3
                if (theta > 1 / 2 * Math.PI && theta < 3 / 2 * Math.PI) return Math.PI - (Math.PI - theta) * k;
                else if (theta >= 3 / 2 * Math.PI && theta <= 2 * Math.PI) return 2 * Math.PI - (2 * Math.PI - theta) * k;
                else if (theta <= 1 / 2 * Math.PI && theta >= 0) return theta * k;

            }

            //当前标注点和中心点所构成直线和水平线的夹角
            let currentAngle = converseTo2PI(Math.atan2(deltaY, deltaX));

            currentAngle = angularDistribution(currentAngle)


            //容器宽高，用于计算
            const w = this.svgCanvas.clientWidth;
            const h = this.svgCanvas.clientHeight;

            //容器正负对角线和水平线的夹角
            const angle = Math.atan2(w, h);
            const angle2 = Math.PI - angle;

            //根据角度获取中心点和边界的距离
            const getC2E = function (theta: number): number {
                //当角度指向最右侧边框时的距离
                if ((theta <= Math.PI * 2 && theta >= angle2 + Math.PI) ||
                    theta >= 0 && theta <= angle) return 1 / 2 * w / Math.cos(theta);
                //当角度指向上边边框时的距离
                if (theta >= angle && theta <= angle2) return 1 / 2 * h / Math.sin(theta);
                //当角度指向最左侧边框时的距离
                if (theta >= angle2 && theta <= angle + Math.PI) return -1 / 2 * w / Math.cos(theta);
                //当角度指向下边边框时的距离
                if (theta >= angle + Math.PI && theta <= angle2 + Math.PI) return -1 / 2 * h / Math.sin(theta);
            }
            const c2e = getC2E(currentAngle);
            //衰减因子，可以调整
            const k = 20;

            //根据距离计算半径，用了一个拟合函数
            const getRadius = function (dis: number): number {
                return c2e * (1 - Math.pow(Math.E, -1 * k * dis / c2e)) - 0.3 * c2e;
            }
            let radius = getRadius(Math.hypot(deltaX, deltaY));

            let startX = x;
            let startY = y;
            let endX;
            let endY;

            // 这一行计算了每一行的文字数量，公式为：文字总数的平方根乘以1.3，再和10取最大值，就是每行最少不少于10个字符。
            const letterInALine = Math.max(Math.sqrt(tile.content.length) * 1.3, 10);
            const contentArr = [];

            for (let pointer = 0; pointer < tile.content.length; pointer += letterInALine) {
                contentArr.push(tile.content.slice(pointer, pointer + letterInALine))
            }
            const rectHeight = (contentArr.length + 1) * 1.2;
            const rectWidth = letterInALine * 1.2;
            rect.setAttribute("height", rectHeight + "em");
            rect.setAttribute("width", rectWidth + "em")


            if (tile.tileX && tile.tileY) {
                endX = tile.tileX * this.svgCanvas.clientWidth;
                endY = tile.tileY * this.svgCanvas.clientHeight;
            } else {
                ({
                    endX,
                    endY
                } = this.getAdjustedPosition(startX, startY, radius, this.svgCanvas.clientWidth, this.svgCanvas.clientHeight, this.tiles.map(tile => {
                    return {x: tile.tileX, y: tile.tileY}
                }), rectWidth * 10, rectHeight * 10, currentAngle))
            }


            // 配置矩形样式
            rect.setAttribute("x", `${endX - rectWidth * 8}`);
            rect.setAttribute("y", `${endY - rectHeight}`);
            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");
            rect.style.fill = "#6392";
            rect.style.stroke = "#639";
            rect.style.strokeWidth = "1";

            // 配置文字样式
            text.setAttribute("x", `${endX}`);
            text.setAttribute("y", `${endY}`);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.style.fill = "#639";
            text.style.fontSize = "14px";


            contentArr.forEach((line) => {
                const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                tspan.setAttribute("x", `${endX}`);
                tspan.setAttribute("dy", `${1.2}em`);
                tspan.textContent = line;
                text.appendChild(tspan);
            })


            //配置指示直线样式
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", `${startX}`);
            line.setAttribute("y1", `${startY}`);
            line.setAttribute("x2", `${endX > svgCentralPoint[0] ? endX - rectWidth * 4 : endX + rectWidth * 4}`);
            line.setAttribute("y2", `${endY > svgCentralPoint[1] ? endY - rectHeight : endY + rectHeight}`);
            line.style.stroke = "#639";
            line.style.strokeWidth = "2";
            group.appendChild(line);

            // 添加到组并附加到 SVG
            group.appendChild(rect);
            group.appendChild(text);
            this.svgCanvas.appendChild(group);
        });
    }

    public resizeCB(){
        this.svgCanvas.innerHTML = "";

        this.initTile();
    }

    constructor() {
        super();
        const tiles = Array.from(this.querySelectorAll("span"));

        //先初始化变量
        this.tileContent = this.querySelector(".tile-content");
        this.tiles = tiles.map(tile => {
            //补全磁贴指针位置
            let x, y;
            if (tile.getAttribute("pos")) {
                [x, y] = tile.getAttribute("pos").split(" ").map(Number.parseFloat);
                if (!y || Number.isNaN(y)) y = 0.5;
                if (!x || Number.isNaN(x)) x = 0.5;
            } else
                [x, y] = [0.5, 0.5];

            //补全磁贴位置
            let tileX, tileY;
            tileX = tileY = null;
            if (tile.getAttribute("tar")) {
                [tileX, tileY] = tile.getAttribute("tar").split(" ").map(Number.parseFloat);
            }

            tile.remove();

            return {x, y, content: tile.innerText, tileX, tileY}
        });

        this.initSVGCanvas();
        this.initTileContent();
        this.initTile();
        window.addEventListener("resize", this.resizeCB.bind(this));
    }
}

customElements.define("image-tile", ImageTile)
export {ImageTile}