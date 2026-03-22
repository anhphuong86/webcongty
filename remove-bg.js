const Jimp = require('jimp');

Jimp.read('public/logo.jpg')
    .then(image => {
        const targetColor = { r: 255, g: 255, b: 255 };
        const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            const distance = colorDistance({ r: red, g: green, b: blue }, targetColor);

            // Nếu pixel màu trắng (hoặc xám rất nhạt), đánh thủng Alpha (độ mờ) = 0
            if (distance < 50) {
                this.bitmap.data[idx + 3] = 0;
            }
        });

        // Xuất ra file PNG nền trong suốt
        image.write('public/logo.png', () => {
            console.log("SUCESS: Background fully removed and saved to logo.png!");
        });
    })
    .catch(err => {
        console.error("ERROR Processing Image:", err);
    });
