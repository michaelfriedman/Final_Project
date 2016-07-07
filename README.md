# Final_Project
Final_Project

## User Stories
- As a user I want to be able to input titles of movies and/or television series using a simple and intuitive interface. Each search returns the various streaming services that offer the matching title.
- As a user I want to add my movie searches to a list to keep track of which ones I've watched and where they are supported. 
- As a user I want to be able to login to the search service while having my watch list remain updated with previous session data. 
- As a user I want to be able to remove movies as I watch them and have the option to move the watched titles to their own list as they are marked watched.  
- As a user I want to be able to rate and comment on the movies in my watched-list without review being made viewable by the public. 
- As a user I want to know a little about the developers that made this application so that I can have confidence in using the service.
- As a user I want to be able to use the service without having to create and account or sign in.

- As a developer I want to create a simple search engine that reads through a list movie objects and displays streaming service support services for the titles in the database.
- As a developer I want to track user's session information through local storage so that their data is conserved between browsing sessions.
- As developers we want to build a navigation bar for traversing the three pages we've built: the search page, user profile page,  and a page about the makers of the application.
- As a developer I want to incorporate logo icons for the appropriate streaming services that offer the titles that our users have searched for. 
- As a developer I want to be able to create a dynamic interface that allows the user to add and delete or move movie objects to custom lists that are displayed in their profile.
- As a developer I want build a form that accepts user input and displays it as a comment for each movie in the user's watch list.  
- As a developer I want to provide a share bar to utilize social networks for sharing user reviews and watched movies.

## MVP
- Create an array of approximately 80 self constructed movie objects for the site to reference until an appropriate API is selected and implemented. 
- Build a simple search engine for displaying service provider properties of each movie object. 
- Create a submit input element for the user to trigger the movie database search.
- Display results upon the event trigger, directly underneath the search bar.
- Capture search results and display them on the user profile. 
- Upon page load check local storage to see if the user has made a profile. 
- Create a form element to accept the user input. Store said input into local storage and create the appropriate user profile, allowing them access to their newly created profile page.
- Create the profile page that offers a watch list incorporating the objects that the user has searched for and selected to place in their watch list. 
- Provide radio boxes next to each object in the watch list that can be selected for indicating that the movie has been watched and should be moved to the watch list.
- Provide button for listening to click event which triggers the movement of selected watchlist movies to the watch list.
- Create an 'about us' page for all of the contributing developers.
- Create three major JavaScript objects to represent the relational components of our site, including one for each movie in our database, one for each user profile created, and one tracker object that tracks user activity.

## Stretch Goals
1. Implement Netflix and/or any additional API's.
2. Offer appropriate thumbnail images for each movie in the users watch list.
3. Adding the ability to push the profile page comments to the public movie page.
4. Build a page for searching by filter.

## Git Flow
- Nobody works on the same branch.
- Nobody approves their own merge request.
- Once a waffle issue is accomplished, the code is pushed up and everyone pulls to their master for the appropriate file. 
- Send a slack message to the group informing everone before starting on a waffle issue.
