/*
I started by watching videos that talked about what 
React and API's and Node and JSON and Callbacks
and a few things actually are so I could understand what I'm
getting into

I watched a beginners introduction and tutorial to understand 
the basics of react better and after a couple of minutes made 
it my own so I could begin experimeting

i wrote it in code pen so I still need to figure out how to do it in vscode
*/


// from the tutorial
/* 
  extremly basic one line create a react DOM object
  //   ReactDOM.render (a: what to render  b: where to render
  // react.CeateElement (a: elementType b: properties (props) c: content / children
  ReactDOM.render(React.createElement('h1', null, 'Amazing header'), document.querySelector("#app"));
*/ 

//

// the tutorial said that a function can be made to display instead of long lines
// so from there I began experimenting to learn more

/* Make a custom react component that can render what we want */

// the place to render
let myApp = document.querySelector('#app');
let items = [];

function contentContainer() {
  ReactDOM.render(items, myApp);
}

function newHeading(text) {
  // add the heading to a list of items to rendered 
  items.push(React.createElement('h1', null, text));
}

function newParagraph(text) {
  
  items.push(React.createElement('p', null, text));
}

// the things to render
let myHeading = newHeading('This is the besttttttt!!');
let myParagraph = newParagraph('And this is the second best ;)');
// container contains those elements because they are in a list
let myContainer = contentContainer();

/*
console.log(myApp);
console.log(myHeading);
console.log(myParagraph)
*/

/* if there is only one element to render you can call this otherwise it 
// will only show the last one
ReactDOM.render(myHeading, myApp);
ReactDOM.render(myParagraph, myApp);
*/




// second tutorial helps me see what JSX is and I did some research on it
// to make sense of it
// also learning about npm and how and where to find API's and packages etc

// Write JSX code 

function simpleApp() {
  // this return is equvilent to a big long react.createElement and uses JSX which is 
  // JS and HTML and made in REACT
  return (
    <>
      <h1>Great header</h1>
      <p>Great paragraph</p>
      <small>Copyright footer text</small>
    </>
  )
}

let simpleAppElement = document.querySelector("#simpleApp");
ReactDOM.render(<simpleApp />, simpleAppElement);