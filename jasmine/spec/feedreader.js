/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    const doc = window.document;
    const body = doc.body;

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed in list has a URL defined and that the URL is not empty', () => {
          allFeeds.forEach((feed) => {
            expect(feed.url).toBeDefined();
            expect(typeof feed.url).toBe('string');
            expect(feed.url.length).toBeGreaterThan(0);
            expect(feed.url).toContain('http://');
          });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined and that the name is not empty', () => {
          allFeeds.forEach((feed) => {
            expect(feed.name).toBeDefined();
            expect(typeof feed.name).toBe('string');
            expect(feed.name.length).toBeGreaterThan(0);
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
      const menuIcon = doc.querySelector('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', () => {
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should be toggled to show/hide when the menu icon is clicked', () => {
          menuIcon.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
          menuIcon.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        const feedCtnr = doc.querySelector('.feed');
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should contain at least a single .entry element within the .feed container', (done) => {
          loadFeed(1, () => {
            const entryElem = doc.querySelector('.entry');

            expect(feedCtnr.contains(entryElem)).toBe(true);
            done();
          })
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        const feedCtnr = doc.querySelector('.feed');

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should be empty by default & be changed after new feed is loaded', (done) => {
          loadFeed(1, () => {
            expect(feedCtnr.hasChildNodes()).toBe(true);
            const firstFeed = feedCtnr.firstChild;
            loadFeed(1, () => {
              expect(feedCtnr.firstChild.isSameNode(firstFeed)).toBe(false);
              done();
            });
          });
        });
    });
}());
