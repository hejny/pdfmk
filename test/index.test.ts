import maker from '../src/main';

test('PDFMK', () => {
    expect(async () => {
        maker({
            apiUrl: `https://pdfmk.com/api`,
            token: `test-test-test-test`,
        });
    }).not.toThrowError();

    expect(async () => {
        const url = maker({
            apiUrl: `test-test-test-test`,
            url: `https://pdfmk.com/api`,
        })
            .open({
                url: `https://www.pavolhejny.com/`,
            })
            .load({ waitUntil: 'domcontentloaded' })
            .toPdf({
                margin: {
                    top: '1cm',
                },
                scale: 1,
            });
        // .getUnsecurePublicUrlSync()
        // .toString();

        console.log(url);
    }).not.toThrowError();

    // TODO:
});
