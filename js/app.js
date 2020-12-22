/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */

/**
 * End Global Variables
 */

/**
 * Start Helper Functions
 * modLinker variable for link the model and the view
 */
const modLinker = {
    init: () => { mainView.init(); },
    getNavbarHeight: () => '60px',
}
/**
 * End Helper Functions
 */

/**
 * Begin Main Functions
 * mainView constant variable for handling the DOM and and get the data from the model via the model
 */
const mainView = {
    init: function () {
        this.initNavBar('#navbar__list');
        this.mainContentScrollHandlers(250);
        this.toggleActiveState();
    },
    //////////////////////////////////////////////////////////////
    // check if the element founded is in active viewport
    isOnScreen: (element, buffer) => {
        // retrive the position of the element in the viewport
        const boundingClient = element.getBoundingClientRect();
        // Check if element is in the viewport
        if (boundingClient.top >= buffer && boundingClient.left >= buffer &&
            boundingClient.right <= ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
            boundingClient.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - buffer))
            {
                return true
            }
        else
            {
                return false;
            }
    },
    //////////////////////////////////////////////////////////////
    // Build menu and the navbar
    // Dynamic Menu: adding new item automaticly in the menu if new section add in the HTML
    initNavBar: (navbarElement) => {
        const navMenuElement = document.querySelector(navbarElement);
        const sections = document.querySelectorAll('section');
        let firstMenuLink = true;
        for (let section of sections)
            {
                const newMenuLink = document.createElement('li');
                newMenuLink.innerHTML =
                    `<a href="#${section.id}" class="menu__link ${firstMenuLink ? "link__active" : ""}" data-link="${section.dataset.nav}">
                        ${section.dataset.nav} </a>`
                navMenuElement.appendChild(newMenuLink);
                firstMenuLink = false;
            }
    },
    //////////////////////////////////////////////////////////////
    mainContentScrollHandlers: (buffer) => {
        // Define function variables
        const sections = document.getElementsByTagName('section');
        const activeEvent = new Event('active');
        const navMenuElement = document.getElementsByClassName('page__header')[0];
        let beginScroll = true;
        let prePos = window.scrollY;
        // Handle the hide and show the navigation menu while scroll
        window.onscroll = function () {
            // Show the menu when scroll the page up
            const curPos = window.scrollY;
            const scroller = document.getElementById('scrollMeUp');
            if (curPos>buffer || curPos>250)
                {
                    scroller.classList.remove('display__none');
                }
            else
                {
                    scroller.classList.add('display__none');
                }
            // Hide and show the navbar
            if (beginScroll)
                {
                    if (curPos - prePos > 50)
                            {
                                navMenuElement.style.top = '-' + modLinker.getNavbarHeight();
                                prePos = curPos;
                                beginScroll = false;
                            }
                        else if (prePos - curPos > 50)
                            {
                                prePos = curPos;
                            }
                }
                else
                    {
                    if (prePos < curPos)
                        {
                            prePos = curPos;
                        }
                    else
                        {
                            if (prePos - curPos > 50)
                                {
                                    navMenuElement.style.top = '0';
                                    beginScroll = true;
                                    prePos = curPos;
                                }
                        }
            }
            // Dispatch event to show the active state for the sections
            setTimeout(function () {
                for (let section of sections)
                    {
                        section.dispatchEvent(activeEvent);
                    }
            });
        }
    },
    //////////////////////////////////////////////////////////////
    // toggleActiveState for retrieve the on screen section during the scrolling and toggle the active one and its menu link
    // and deactivate the anther sections out the screen and deactivate its links in the menu.
    toggleActiveState: () => {
        const sections = document.getElementsByTagName('section');
        // using for each to loop for all retrieved sections on the page.
        for (let section of sections)
        {
            section.addEventListener('active', function () {
                const inViewport = mainView.isOnScreen(this, -250);
                const navMenuLink = document.querySelectorAll(`[data-link="${this.dataset.nav}"]`)[0];
                if (inViewport)
                {
                    this.classList.add('activeclass');
                    navMenuLink.classList.add('link__active');
                }
                else
                {
                    this.classList.remove('activeclass');
                    navMenuLink.classList.remove('link__active');
                }
            })
        }
    }
    //////////////////////////////////////////////////////////////
}
/**
 * Start for the logic
 */
modLinker.init();
