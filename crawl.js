import { JSDOM } from 'jsdom';

export const crawlPage = async (currentUrl) => {
    console.log(`actively crawling: ${currentUrl}`);

    try {
        const res = await fetch(currentUrl);
        if (res.status > 399) {
            console.log(`error in fetch with status code: ${res.status}, on page: ${currentUrl}`);
            return;
        }
        const contentType = res.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content-type: ${contentType}, on page: ${currentUrl}`);
        }
        console.log('🚀 ~ crawlPage ~ res:', await res.text());
    } catch (error) {
        console.log(`error in fetch: ${error.message}, on page: ${currentUrl}`);
    }
};

export const getUrlFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        //relative
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(removeTrailingSlash(urlObj.href));
            } catch (error) {
                console.log(`error with relative url: ${error.message} `);
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(removeTrailingSlash(urlObj.href));
            } catch (error) {
                console.log(`error with absolute url: ${error.message} `);
            }
        }
    }
    return urls;
};

const removeTrailingSlash = (str) => {
    return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const normalizeUrl = (urlString) => {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};
