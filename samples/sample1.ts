import maker from "../src/main";

const url = maker({
    url: `https://pdfmk.com/api`,
    token: `test-test-test-test`,
})
    .open({
        url: `https://www.pavolhejny.com/`,
    })
    .load({ waitUntil: 'domcontentloaded', renderOnCallback:'renderMe' })
    .load({ waitUntil: 'domcontentloaded', renderOnCallback:'renderMe' })
    .toPdf({
        scale: 1,
        margin: {
            top: '1cm',
        },
    })
    .getUnsecurePublicUrlSync()
    .toString();

    
console.log(url);