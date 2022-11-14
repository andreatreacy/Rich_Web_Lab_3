window.onload = setUp();

// function to set up the background images
function setUp() {
	//array of background images
	let backgroundImages = [
		"https://wallpaperaccess.com/full/3117916.jpg",
		"https://images7.alphacoders.com/995/995499.jpg",
		"https://wallpaperaccess.com/full/3118138.jpg",
		"https://s3.envato.com/files/45991498/Seamless_red_and_black.jpg"
	];

	// variable to hold the position in the backgroundImages array
	let bPos = 0;
	
	// set the background to the first image in the array
	document.body.style.backgroundImage = "url('"+backgroundImages[bPos]+"')";
	
	// start the timer
	timer();

	// function to make the background image change every 5 seconds
	function timer() {
		setInterval(changeBackground, 5000);
	}

	// function to change the background image to the next image in the backgroundImages array
	function changeBackground() { 
		document.body.style.backgroundImage = "url('"+backgroundImages[bPos]+"')";
		bPos++;
			
		// if the array position is at the end, start at 0 again
		if(bPos == 4)
		{
			bPos = 0;
		}
	}
}



//array of explosion images
let explosionImages = [
    "https://media.tenor.com/4MOc_udzsRQAAAAd/explosion.gif",
	"https://www.gifcen.com/wp-content/uploads/2022/02/explosion-gif-6.gif",
    "https://i.pinimg.com/originals/9e/13/8d/9e138d71b5f8f83bc9d191babaff0397.gif",
    "https://www.gifcen.com/wp-content/uploads/2022/02/explosion-gif-8.gif",
    "https://media.tenor.com/2-MpRS4tcE8AAAAM/run-explosions.gif"
];


// swap all image elements with a random image from the explosionImages array
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * explosionImages.length);
    imgs[i].src = explosionImages[randomImg];
	
	// when the mouse hovers over an image, turn it upside down
	imgs[i].addEventListener("mouseover", function() {
	imgs[i].style.transform = 'rotate(180deg)';
	});
	
	// when the mouse stops hovering over an image, turn it back the right way
	imgs[i].addEventListener("mouseout", function() {
	imgs[i].style.transform = 'rotate(360deg)';
	});
}




// change the h1 elemants
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "This Site Has Been Destroyed";
	headers[i].style.backgroundColor = "white";
	
	// when the mouse hovers over the h1, fade the colour of the text
	headers[i].addEventListener("mouseover", function() {
	headers[i].style.color = "pink";
	});
	
	// when the mouse stops hovering over the h1, change the colour of the text back
	headers[i].addEventListener("mouseout", function() {
	headers[i].style.color = "red";
	});
}


// change the h2 elemants
const headers2 = document.getElementsByTagName("h2");
for (let i = 0; i < headers2.length; i++){
    headers2[i].innerText = "You Can't Read This";
	headers2[i].style.backgroundColor = "white";
	headers2[i].style.color = "black";
	
	// when the mouse hovers over the h2 change the font family of the text
	headers2[i].addEventListener("mouseover", function() {
	headers2[i].style.fontFamily = "fantasy";
	});
	
	// when the mouse stops hovering over the h2 change the font family back
	headers2[i].addEventListener("mouseout", function() {
	headers2[i].style.fontFamily = "serif";
	});
}


// change the p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
	// replace the p text with Lorem ipsum
	p[i].innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tempus arcu, vel elementum augue. Aliquam erat volutpat. Maecenas a tortor lacinia, tristique diam eget, tempus enim. Etiam non nulla consectetur, pharetra enim ac, porttitor elit. Mauris consequat pretium enim vel tincidunt. Donec eget urna erat. Vestibulum libero ante, pharetra posuere faucibus ac, feugiat ut massa. Duis auctor eget justo id ornare. Nam molestie egestas eros eget pellentesque. Sed varius nibh quis tortor laoreet gravida. Nam et lacinia enim. Etiam consectetur finibus justo, eget lacinia nisl commodo id. Nam bibendum erat quis placerat tincidunt.";
	p[i].style.backgroundColor = 'white';
	
	// when the p is clicked change the backf=ground colour
	p[i].addEventListener('click', function onClick(event) {
	// generate a random colour for the text background
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	p[i].style.backgroundColor = "#" + randomColor;
	});
}


// change the a elements
const a = document.getElementsByTagName("a");
for (let i = 0; i < a.length; i++){
	// when an a element is clicked, redirect to a jurassic park gif
	a[i].addEventListener('click', function onClick(event) {
	a[i].setAttribute('href', 'https://media.tenor.com/Vyg73kR334sAAAAM/jurassic-park-ah.gif');
	});
}


// create an iframe for a youtube video
const iframe = document.createElement('iframe');
iframe.src = "https://www.youtube.com/embed/eAoR4h6SQGg";
iframe.height = "240";
iframe.width = "320";

// add the iframe to the end of body
document.body.appendChild(iframe);

