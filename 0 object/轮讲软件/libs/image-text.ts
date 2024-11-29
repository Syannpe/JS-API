enum TextMode {
    ver,
    hor
}

class ImageText extends HTMLElement {
    public image: HTMLImageElement;
    public tags: IText[] = [];

    public fullscreen(e: MouseEvent) {
        if (document.fullscreenElement === this) {
            document.exitFullscreen();
            return;
        }
        // 申请全屏
        this.requestFullscreen();

    }

    public resize() {
        // console.log("resize invoked")

        const that: ImageText = this;
        this.tags.forEach(function (tag) {
            tag.containerSize = [that.image.width, that.image.height];
            tag.resetPos();
        })
    };

    /*
    * 用于生成一个和图片完全反色的图片，
    * 这个反色图片用于给文字上色
    * */
    public initInvertImage() {
        const img: HTMLImageElement = this.image;
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData: ImageData = ctx.getImageData(0, 0, img.width, img.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            // 获取当前像素点的RGB值
            const r: number = imageData.data[i];
            const g: number = imageData.data[i + 1];
            const b: number = imageData.data[i + 2];

            // 计算反色值
            const r1: number = 255 - r;
            const g1: number = 255 - g;
            const b1: number = 255 - b;

            // 将反色值赋值给当前像素点
            imageData.data[i] = r1;
            imageData.data[i + 1] = g1;
            imageData.data[i + 2] = b1;
        }
        ctx.putImageData(imageData, 0, 0);
        this.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }

    private isStickyed = false

    public imageSticky() {
        this.classList.toggle("sticky");
        if(this.isStickyed){
            const that = this;
            const cb = function (){
                that.tags.forEach(tag => {
                    tag.style.display = "block"
                })

                that.removeEventListener("transitionend",cb)
                that.isStickyed = false;
            }
            this.addEventListener("transitionend",cb)
        }else{
            this.tags.forEach(tag => {
                tag.style.display = "none"
            })
            this.isStickyed = false;

            this.isStickyed = true;

        }
    }

    public initStickyBtn() {
        const button = document.createElement("button");
        button.classList.add("sticky");
        button.innerText = "sticky"
        button.addEventListener("click", this.imageSticky.bind(this));
        this.appendChild(button);
    }

    constructor() {
        super();
        this.image = this.querySelector("img");
        this.tags = Array.from(this.querySelectorAll("i-text"));

        const imageSize = this.image.getBoundingClientRect();
        this.tags.forEach(text => {
            text.containerSize = [imageSize.width, imageSize.height];
            if (text.mode === TextMode.ver) {
                text.classList.add("vertical")
            }
            text.resetPos();
        });

        this.initInvertImage();
        this.initStickyBtn();
        this.addEventListener("dblclick", this.fullscreen);
        window.addEventListener("resize", this.resize.bind(this));
    }
}

class IText extends HTMLElement {
    public containerSize: [number, number];
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public mode: TextMode;
    public content: string;

    public setRect(x: number = null, y: number = null, width: number = null, height: number = null) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.width = width || this.width;
        this.height = height || this.height;

        this.resetPos();
    }

    public resetPos() {
        const x = this.x > 1 ? this.x : this.x * this.containerSize[0];
        const y = this.y > 1 ? this.y : this.y * this.containerSize[1];
        const width = this.width > 1 ? this.width : this.width * this.containerSize[0];
        const height = this.height > 1 ? this.height : this.height * this.containerSize[1];

        /*const transformObj = TransformParser.parseTransform(this.style.transform);
        transformObj.translate = [x + "px", y + "px"];
        this.style.transform = TransformParser.stringifyTransform(transformObj);*/
        this.style.transform = `translate(${x}px, ${y}px)`;

        this.style.width = width + "px";
        this.style.height = height + "px";
        this.style.backgroundPositionX = "-" + x + "px";
        this.style.backgroundPositionY = "-" + y + "px";
    }

    isClicked = false;

    public clickCB() {
        this.classList.toggle("actived");

        if (this.isClicked) {
            this.style.overflowX = "hidden";
            this.style.overflowY = "hidden";
            this.resetPos();
            this.isClicked = false;
            return;
        }
        // this.style.width = Number.parseInt(this.style.width) * 1.3 + "px";
        // this.style.height = Number.parseInt(this.style.height) * 1.3 + "px";

        if (this.mode === TextMode.hor)
            this.style.overflowY = "scroll";
        else if (this.mode === TextMode.ver)
            this.style.overflowX = "scroll";

        this.isClicked = true;

    }

    constructor() {
        super();
        const rectArr: number[] = this.getAttribute("rect").split(" ").map(n => Number.parseFloat(n));

        this.x = rectArr[0];
        this.y = rectArr[1];
        this.width = rectArr[2];
        this.height = rectArr[3];
        this.mode = this.getAttribute("mode") === "hor" ? TextMode.hor : TextMode.ver;
        this.content = this.innerHTML;
        this.classList.add("scroll-container");

        this.addEventListener("click", this.clickCB.bind(this))
    }
}

customElements.define("i-text", IText);
customElements.define("image-text", ImageText);
export {ImageText, IText}