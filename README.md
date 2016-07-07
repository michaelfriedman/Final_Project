# Final_Project
Final_Project

## User Stories
- As a user I want to be able to input titles of movies or television series using a simple and intuitive interface. Each search should return the various streaming services that offer the title being searched for.
- As a user I want to add my searches to a list that keeps track of which movies and shows I've watched and where they are available for streaming. 
- As a user I want to be able to login to the search service, while having a watched-list and playlist that remains between browsing sessions. 
- As a user I want to be able to rate and comment on the movies in my watched-list without the review being published publicly. 
- As a user I want to know a little about the developers that made this application, so that I can have confidence in using the service.
- As a user I want to be able to use the service without having to create an account or sign-in.

- As a developer I want to create a simple search engine that reads through a list of movie objects and displays streaming service support services for the titles in the database.
- As a developer I want to track a user's session information in Local Storage so that their data is conserved between browsing sessions.
- As developers we want to build a navigation bar for traversing the site we've built. The search page, user profile page,  and a page about the makers of the application will be included in the site.
- As a developer I want to incorporate logo icons for the appropriate streaming services that offer the titles, which our users have searched for. 
- As a developer I want to be able to create a dynamic interface that allows the user to add, delete or move movie objects to custom lists that are displayed on their profile page.
- As a developer I want build a form that accepts user input and displays it as a comment for each movie in the user's watch list.  
- As a developer I want to provide a share bar to utilize social networks for sharing user reviews and watched movies.

## MVP
- Create an array of approximately 60 self constructed movie objects for the site to reference until an appropriate API is selected and implemented. 
- Build a simple search engine for displaying streaming service providers that are available for each movie in our database. 
- Create a submit input element for the user to trigger the movie database search.
- Display results upon the event trigger, directly underneath the search bar.
- Capture search results and display them on the user profile. 
- Upon page load check Local Storage to see if the user has made a profile. 
- Create a form element to accept the user input. Store said input into Local Storage and create the appropriate user profile, allowing them access to their newly created profile page.
- Create a profile page that offers customized play/watched-lists, incorporating the movies/shows that the user has searched for and selected to place on their page. 
- Provide checkboxes next to each object in the watch list that can be selected for indicating that the movie has been watched and should be moved to the watched-list.
- Provide button for listening to a click event that triggers the movement of selected watchlist movies to the watch list.
- Create an 'about us' page for all of the contributing developers.
- Create three major JavaScript objects to represent the relational components of our site, including one for each movie in our database, one for each user profile created, and one tracker object that tracks user activity.

## Stretch Goals
1. Implement Netflix and/or any additional API's.
2. Offer appropriate thumbnail images for each movie in the users watch list.
3. Adding the ability to push the profile page comments to the public movie page.
4. Build a page for searching by filters.

## Git Flow
- Nobody works on the same branch.
- Nobody approves their own merge request.
- Once a waffle issue is accomplished, the code is pushed up and everyone pulls to their master for the appropriate file. 
- Send a slack message to the group informing everone before starting on a new waffle issue.
