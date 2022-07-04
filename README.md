  # Umbrella 

Project Application: Interactive Address Book

Project Members: Andrea Bell, Wendy Marcela Mejia Ortiz, Alex Perry, Dan Smith, Sabrina Williams

## Project deployment: 
💡 See live version here: https://alexander-perry.github.io/Umbrella/

Github repository: https://github.com/Alexander-Perry/Umbrella

Presentation: https://github.com/Alexander-Perry/Umbrella/blob/main/Project%20Presentation%20Umbrella.pdf

## User Story:
* AS A person wanting to socialise
* I WANT an application to be able to look up my friends in an address book, see their address on a map, and what the weather is like where they are
* SO THAT I can plan a visit to them and know whether I need to take an umbrella or not

## Scope: 
To create an interactive application where:
* A user has an addressbook, where they can save contact information including name, address, phone number and email address
* Saved information persists across browser sessions
* Clicking a contact displays current weather, the contact information and the address on a map at the contact's location. 
* Has the ability to add/remove contacts
* Project utilises a CSS framework
* is Interactive (responds to user input)
* Uses at least 2 server-side APIs
* Uses modal boxes only, and no alerts or prompts. 
* Is responsive and displays correctly on both desktop and mobile
* UI is polished - Correct alignment, display is neat and logical
* Repository Data is clean, structured and well documented
* Readme file is properly documented, including Unique name, description, technologies used, screenshot and link to deployed application

## Acceptance Criteria

* It's done when I am presented with a landing page where I can enter the address of my friend and save as a contact.
* When I click on that contact, I am taken to a map displaying their location and the prevailing weather conditions of that location.

## Technologies used: 
* HTML
* CSS
* JavaScript
* JQuery
* Bootstrap
* WeatherAPI
* Google Maps API
* FontAwesome

## Wireframe

![](./UmbrellaWireFrame.gif)

## HTML and Javascript

### Google Maps API:

The Google Maps API integration has two main components that are broken down into individual functions.
The 'renderMap' function and the 'addressToMap' function.
The main issue we experienced when working on the logic that would display the map of the contact's location and the details about the weather was that the renderMap function and the checkWeather function both took longitude and latitude values as variables to render the data. Because we do not expect users to enter their friend's longitude and latitude in their address book we needed a way to convert their address entries to the data type we needed (longitude and latitude). Luckily, we discovered within the Google Maps API there is a geocoding functionality. We used this to create the addressToMap function which parses through an address. Utilizing the Google Maps API, this address is searched for and the longitude and latitude values are a part of the data response. At the end of the function it then calls the checkWeather and renderMap functions using the longitude an latitude values as variables. This way the buttons can be programmed to call the addressToMap function, parsing through the relevant address and the app will render all the information needed.


### Weather API:
The WeatherAPI function calls the weatherAPI, which returns a JSON object with weather data. 
The checkWeather function requires two arguments; Latitude and Longitude which is called in the query.
From the returned data, we collect the current Temperature in celsius and the current weather icon URL.
A check is performed on the condition attribute if this text contains the word "rain" and then flags Rain as true or false. 

A series of conditional statements is run to assign an image based off temperature:
* below 16 degrees C, uses a snowflake image
* Between 16 degrees and 24 degrees a jacket image
* Between 24 degrees and 32 degrees a t-shirt image
* Greater than 32 degrees a flame image. 

A further conditional statement checks if 'Rain' is true, and will also append an Umbrella Icon. 

A string is created combining the above information, as Temperature, an icon for the general condition, the image representing the temperature conditional and then the umbrella Icon is displayed if required. 

On the index.html page, the element (div) with id 'weather' is then assigned the html from the created string  which will display the data collected above.

### Contact list:

The contact list is rendered by a function that creates a list, saves this information in the local storage and it is available any time the user wants to find any of their contacts.

Diverse buttons are displayed on the screen to help the user to navigate in the app. These ones are: "+" (create a new contact), "save", "X" (delete contact), "current contact" (displayed with the first name and last name). 

To create a contact the user press the "+" button, where a modal is displayed with 5 inputs: first name, last name, phone number, email and address. When the user presses the "save" button this information is sent to the local storage and it is displayed on the list as a contact button with the first name and last name of the recently saved contact. This is also a button that when pressed the contact information is displayed on the top right corner of the screen and also the map is updated with the contact's current location.

### Bootstrap
Page design and styling handled via Bootstrap with slight CSS for colours and id styling. 
Bootstrap handles responsive design of the page and configuration ensures the application displays well on both desktop and mobile views. 

![alexander-perry github io_Umbrella_](https://user-images.githubusercontent.com/102524579/177142619-efedfa85-b973-4b66-bd02-90b2fe6a5b94.png)

![alexander-perry github io_Umbrella_ (1)](https://user-images.githubusercontent.com/102524579/177142635-ee81c03e-6d34-494f-be82-11aa7a76860a.png)


