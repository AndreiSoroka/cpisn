import fetch from 'node-fetch';
import dafaultPages from './data.json';

export default class Cpisn {
    #pages = [];

    constructor(pages, useDefaultPages = true) {
        if (useDefaultPages) {
            this.#pages = dafaultPages;
        }

        if (pages) {
            this.addPages(pages);
        }
    }

    /**
     * Set pages
     * @param {Array} pages
     */
    setPages(pages) {
        this.#pages = this._copyArray(pages);
    }

    /**
     * Add more pages
     * @param {Array} pages
     */
    addPages(pages) {
        const keys = {};
        this.#pages = [...this._copyArray(pages), ...this.#pages]
            .filter(page => {
                if (keys[page.name]) {
                    return false;
                }
                keys[page.name] = true;
                return true;
            });
    }

    /**
     * Get list of pages
     * @returns {Array}
     */
    getPages() {
        return this._copyArray(this.#pages);
    }

    /**
     * G
     * @param {string} nickname
     * @returns {{result: Promise, page: Object, url: string}[]}
     */
    getQueries(nickname) {
        return this.#pages.map(page => {
            let url = page.url.replace('{}', nickname);

            return {
                page,
                url,
                result: fetch(url)
                    .then(async res => {
                        const result = { pageIsFound: false, res };

                        // status code
                        if (res.status === 404) {
                            return result;
                        }

                        // customs error
                        if (page.error) {
                            const body = await res.text();

                            if (page.error.body && body.trim() === page.error.body) {
                                return result;
                            }
                            if (page.error.body_includes && body.includes(page.error.body_includes)) {
                                return result;
                            }
                        }

                        result.pageIsFound = true;
                        return result;
                    }),
            };
        });
    }

    /**
     * Just deep copy arr
     * @param arr
     * @returns {Array}
     * @private
     */
    _copyArray(arr) {
        try {
            return JSON.parse(JSON.stringify(arr));
        } catch (e) {
            return [];
        }
    }

}
