const fs = require('fs');
const puppeteer = require('puppeteer');

const urls = [
    "https://github.com/alex/nyt-2020-election-scraper/commits/master/results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+34&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+69&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+104&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+139&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+174&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+209&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+244&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+279&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+314&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+349&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+384&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+419&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+454&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+489&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+524&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+559&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+594&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+629&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+664&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+699&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+734&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+769&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+804&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+839&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+874&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+909&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+944&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+979&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1014&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1049&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1084&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1119&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1154&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1189&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1224&branch=master&path%5B%5D=results.json",
    // "https://github.com/alex/nyt-2020-election-scraper/commits/master?after=bac635c7ac479d8d1ca3d63d53602a594c311ee6+1259&branch=master&path%5B%5D=results.json",
]; 
 
(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    urls.forEach(url => {
        console.log(url);
    });

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

        // const pagination = Array.from(document.querySelectorAll('div.paginate-container'));
        // console.log(pagination);
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
