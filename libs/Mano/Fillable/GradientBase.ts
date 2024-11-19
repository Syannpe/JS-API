import {ColorBase} from "./ColorBase.js";

class GradientBase {
    colorStops: { offset: number, color: ColorBase }[] = [];

    public addColorStop(offset: number, color: ColorBase): void {
        this.colorStops.push({offset, color})
    }

    public deleteColorStop(offset: number, color: ColorBase): void {
        let index = -1;
        for (let i = 0; i < this.colorStops.length; i++) {
            if (this.colorStops[i].offset === offset &&
                this.colorStops[i].color === color) {
                index = i;
            }
        }
        if (index !== -1) this.colorStops.splice(index, 1);
    }

    public updateColorStop(oldOffset: number, oldColor: ColorBase,
                           newOffset: number, newColor: ColorBase): void {
        let index = -1;
        for (let i = 0; i < this.colorStops.length; i++) {
            if (this.colorStops[i].offset === oldOffset &&
                this.colorStops[i].color === oldColor) {
                index = i;
            }
        }
        if (index !== -1) {
            this.colorStops[index].offset = newOffset;
            this.colorStops[index].color = newColor;
        }
    }
}

export {GradientBase}
