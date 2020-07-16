const fetch = require('node-fetch');
const defaultPages = require('./data.json');

class Cpisn {
  constructor(pages, useDefaultPages = true, fetchOptions = {}) {
    this._pages = useDefaultPages ? defaultPages : [];
    this._fetchOptions = fetchOptions;

    if (pages) {
      this.addPages(pages);
    }
  }

  /**
   * Set pages
   * @param {Array} pages
   */
  setPages(pages) {
    this._pages = this._copyArray(pages);
  }

  /**
   * Add more pages
   * @param {Array} pages
   * @param {Object} options
   * @param {boolean} [options.isCustomFetch]
   */
  addPages(pages, options= {}) {
    const keys = {};
    const additionalPages = options.isCustomFetch ? pages : this._copyArray(pages)
    this._pages = [...additionalPages, ...this._pages]
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
    return this._copyArray(this._pages);
  }

  /**
   * G
   * @param {string} nickname
   * @returns {{result: Promise, page: Object, url: string}[]}
   */
  getQueries(nickname) {
    return this._pages.map(page => {
      let url = page.url.replace('{}', nickname);

      return {
        page,
        url,
        result: ((page.customFetch && page.customFetch(url)) || fetch(url, this._fetchOptions))
          .then(async res => {
            const result = {
              pageIsFound: false,
              res,
              body: '',
            };

            // status code
            if (res.status && (res.status === 404 || res.status === 0)) {
              return result;
            }

            const body = res.customBody || await res.text();
            result.body = body;

            if (this.checkCustomErrors(page, body)) {
              return result;
            }

            if (page.customError && page.customError(body)){
              return result;
            }

            result.pageIsFound = true;
            return result;
          }),
      };
    });
  }

  /**
   * Check custom errors
   * @param page {Object}
   * @param body {string}
   * @returns {*|boolean}
   */
  checkCustomErrors(page, body) {
    if (!page.error) {
      return false;
    }

    return (page.error.body && body.trim() === page.error.body)
      || (page.error.body_includes && body.includes(page.error.body_includes))
      || (page.error.body_does_not_includes && !body.includes(page.error.body_does_not_includes))
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

module.exports = Cpisn;
