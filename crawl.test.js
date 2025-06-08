import { normalizeUrl } from './crawl.js';
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
