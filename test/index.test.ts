import maker from '../src/main';

test('PDFMK', () => {
    expect(async () => {
        maker({
            url: `https://pdfmk.com/api`,
            token: `test-test-test-test`,
        });
    }).not.toThrowError();

    expect(async () => {
        const url = maker({
            url: `https://pdfmk.com/api`,
            token: `test-test-test-test`,
        })
            .open({
                url: `https://www.pavolhejny.com/`,
            })
            //.wait({})
            .toPdf({
                scale: 1,
                margin: {
                    top: '1cm'
                }
            })
            .getUnsecurePublicUrlSync()
            .toString();

        console.log(url);
    }).not.toThrowError();

    // TODO:
});
