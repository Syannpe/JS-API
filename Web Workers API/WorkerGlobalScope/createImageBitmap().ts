(async function () {
    const imageData = new ImageData(100, 100);

    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 255;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 0;
        imageData.data[i + 3] = 255;
    }

    const imageBitmap: ImageBitmap = await createImageBitmap(imageData, 0, 0, 100, 100);

    console.log(imageBitmap)
})();
