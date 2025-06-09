import { crawlPage } from './crawl.js';

const main = async () => {
    if (process.argv.length < 3) {
        console.log('no website provided');
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log('too many command line arguments');
        process.exit(1);
    }

    const baseUrl = process.argv[2];
    console.log(`starting crawl of ${baseUrl}`);
    await crawlPage(baseUrl)
};

main();
