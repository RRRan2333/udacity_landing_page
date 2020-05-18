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

/*
 * Define Global Variables
*/
//for continuous checking of currentSection()
const sections = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
// for isOnScreen()


/**
 * End Global Variables
 * Start Helper Functions
*/

//a boolean function checking if given element is on screen with given buffers
function isOnScreen(element, buffer) {
    buffer = typeof buffer === 'undefined' ? 0 : buffer;
    // Get element's position in the viewport
    const bounding = element.getBoundingClientRect();
    // Check if element is in the viewport 
    if (bounding.top >= buffer && bounding.left >= buffer &&
        bounding.right <=
        ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
        bounding.bottom <=
        ((window.innerHeight || document.documentElement.clientHeight) - buffer)) 
        {
        return true
    } else {
        return false;
    }
}

// boolean function, return true if on top of page. 
function isTopOfPage() {
    return !(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
}

//move page all the way to top when button is clicked. 
function buttonToTop(){
    window.scrollTo(0, 0);
}

//helper function to currentSection() that sets corresponding navbar item to active
function activateNavLinks(elemID) {
    //remove .nav__active class from previously active element
    const oldListItem = document.querySelector('.nav__active');
    //if called 1st time, no element is set to .nav__active, therefore need to check for null
    if (oldListItem != null){
        oldListItem.classList.remove('nav__active');
    }
    //set matching navbar item to active. 
    const newListItem = document.querySelector(`li[data-nav=${elemID}]`);
    newListItem.classList.add('nav__active');
}

/*
Step One, build the navigation bar dynamically. 
*/

// builds the nav bar at start of the program.
function buildNav() {
    for (const section of sections) {
        //create <li> element with appropriate texts
        const entry = document.createElement('li');
        entry.textContent = section.dataset.nav;
        entry.dataset.nav = section.id;
        navbarList.appendChild(entry);//append to parent element <ul>
    }
}

/*
Step Two, the three functions wrapped into myOnScroll.
All functions/features needed when scrolling included here. 
*/

//The wrapper function that triggers 3 separate functions when scrolling.
function myOnScroll() {
    currentSection();//toggle section (and nav list) as active
    hideShowNavbar();//Hide or show navbar
    returnTopButton();//show 'return back to top' button
}

// Check current section in viewpoint when scroolling
function currentSection() {
    for (const section of sections) {
        //remove previously active section.
        if (section.classList.contains('your-active-class')) {
            section.classList.remove('your-active-class');
        }
        //set current section in viewpoint active.
        if (isOnScreen(section.children.item(0),0)) {
            activateNavLinks(section.id);//helper function for matching navbar
            if (!section.classList.contains('your-active-class')) {
                section.classList.add('your-active-class');
            }
        }
    }
}

//show navbar only when on top of screen, or when hover. 
function hideShowNavbar (){
    const navbarMenuBlock = document.querySelector('.navbar__menu')
    if(isTopOfPage()) {
        //show navbar regardless of hover. 
        navbarMenuBlock.style.transform = 'translateY(0)';
    }else{ 
        //remove  inline style added above which "must show navbar" when on top. 
        navbarMenuBlock.style.removeProperty('transform');
    }
}

//show return to top button when left top of page. 
function returnTopButton() {
    //check and display "back to top" button during scroll
    const button = document.querySelector('#return__button');
    if (isTopOfPage()) {
        button.style.display = "none";
    } else {button.style.display = "block";
    button.addEventListener('click', buttonToTop);
    }
}

/*
Step Three, scroll to appropriate section whenever navbar link clicked. 
*/

// Scroll to anchor ID using scrollTO event
function clickScroll () {
    const listEntries = document.querySelectorAll('li[data-nav]');
    for (const listEntry of listEntries) {
        const targetSec = document.querySelector(`#${listEntry.dataset.nav}`);
        listEntry.addEventListener('click', function (){
            targetSec.scrollIntoView({
                behavior: "smooth"
            }); //works thanks to closure
        });
    }
}





/**
 * End Helper Functions
 * Begin Main Functions
*/




// Build menu 
buildNav();
// Show navbar after built. 
hideShowNavbar();
// Check current section whenever scroolling haappened. 
document.addEventListener('scroll',  myOnScroll);
// Scroll to section on link click & Set sections as active
clickScroll();




