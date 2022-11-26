# CA 3 Answers

## 1. Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modelling and when might you use them in Rich Web development?
A stream is considered to be an abstract concept. When comparing a stream to an array, we know how big the array is and what is in it, but a stream is an abstraction of data that could be there now or might be there in the future.
The observer pattern is event orientated. In the observer pattern objects subscribe to a subject and are informed if there is a change in the subject. To do this the subject keeps a list of its observers and automatically notifies them when a change happens. These changes come in the form of streams which could be events, data, requests etc.
Streams can be used for modelling any kind of data such as user input or events. In Rich Web development streams are probably best used for handling asynchronous events.

## 2. Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?
In RxJS you can use an observable to watch for responses from the API requests, and use subscribe to call a function or perform some action when the response is obtained.
Streams are better for dealing with data sources that can provide multiple values while promises only deal with one value. 
The downside to streams is that you don't know how much data you will need to deal with. Overloading can become a problem if there are no measures in place to prevent this. 

## 3. Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?
If three tasks are using the global state, it could be changed by one task and this could cause problems for the other tasks. A solution could be to only let one task use the global state at a time. Async-lock can be used in JavaScript to achieve this. This will lock the global state when one asynchronous task begins and release it for the next asynchronous task in the queue when the first task is finished.

