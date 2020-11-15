const fs = require('fs');
const puppeteer = require('puppeteer');


(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let pageNumber = 1;
    let pageUrl = "https://github.com/alex/nyt-2020-election-scraper/commits/master/results.json";
    let morePages = true;

    while (morePages) {
        console.log('page ', pageNumber);
        await page.goto(pageUrl, {waitUntil: 'load'});
        
        const data = await page.evaluate(() => {
            const timestamps = Array.from(document.querySelectorAll('li.Box-row > div > p.mb-1'))
            const links = Array.from(document.querySelectorAll('li.Box-row > div > p.mb-1 > a'))
            return timestamps.map((timestamp, index) => {
                let ts = timestamp.innerText.replace('Latest data: ', '');
                let link = links[index].href;
                return ts + ', ' + link;
            });
        });

        //data-test-selector="pagination"
        // div class="repository-content"
        // div.paginate-container > div > a

        const preHashURL = 'https://raw.githubusercontent.com/alex/nyt-2020-election-scraper/';
        const postHashURL = '/results.json'

        const hashValues = await page.evaluate(() => {
            const clipboardElem = Array.from(document.querySelectorAll('div.BtnGroup > clipboard-copy'));
            return clipboardElem.map(elm => {
                var value = elm.value;
                return value.trim();
            });
        });

        const csv = data.map((timestamp, index) => {
            return timestamp + ', ' + preHashURL + hashValues[index] + postHashURL;
        });

        //write to file
        fs.appendFile('nyt-commits.csv', csv.join('\n') + '\n', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        const pagination = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('div.paginate-container > div.BtnGroup > a'));
            return links.map(link => {
                var value = link.href;
                return value;
            });
        });
        if (pageNumber == 1 && pagination.length == 1) {
            pageUrl = pagination[0]
            pageNumber++;
        } else if (pagination.length == 2) {
            pageUrl = pagination[1]
            pageNumber++;
        } else {
            morePages = false;
        }
    }

    browser.close();
})();
