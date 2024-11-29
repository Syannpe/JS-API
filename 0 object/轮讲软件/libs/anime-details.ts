class AnimeDetails extends HTMLDetailsElement {
    constructor() {
        super();
        /*
        * 把details元素展开和收回的尺寸进行测量并记录
        * 赋值给CSS属性用于CSS样式
        * */
        const that:this = this;
        setTimeout(function () {
            that.style.setProperty("--close-height", getComputedStyle(that).height);
            that.open = true;
            that.style.setProperty("--open-height", that.getBoundingClientRect().height + "px");
            that.open = false;
            that.classList.add("anime");
        }, 0);


    }
}

customElements.define("anime-details", AnimeDetails, {extends: 'details'})

export {AnimeDetails}