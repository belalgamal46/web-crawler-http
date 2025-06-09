import { normalizeUrl, getUrlFromHTML } from './crawl.js';
import { expect, test } from '@jest/globals';

test('normalize url strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalize url strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalize url capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalize url strip http', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getUrlFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev'];
    expect(actual).toEqual(expected);
});

test('getUrlFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path'];
    expect(actual).toEqual(expected);
});

test('getUrlFromHTML both relative and absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path">
                Boot.dev Blog
            </a>
            <a href="https://blog.boot.dev/path_2">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path', 'https://blog.boot.dev/path_2'];
    expect(actual).toEqual(expected);
});

test('getUrlFromHTML invalid url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});
