import maker from "../src/main";

const url = maker({
    url: `https://pdfmk.com/api`,
    token: `test-test-test-test`,
})
    .open({
        url: `https://www.pavolhejny.com/`,
    })
    .load({ waitUntil: 'domcontentloaded', renderOnCallback:'renderMe' })
    /*.toPdf({
        scale: 1,
        margin: {
            top: '1cm',
        },
    })*/
    .toJpeg({
        width: 1920,
        height: 1200,
        quality: 70,
        fullPage: true
    })
    .cacheLocal({
        cacheDir: '../cache'
        // ttl: 86400 
    })
    .getFile()

    
console.log(url);