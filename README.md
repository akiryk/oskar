#Welcome to (codename) Oskar
***Description***
An angular app running with Firebase.

###To run the app locally
In the console window:

    cd path/to/dir/oskar
    grunt serve

This will run node and will watch for changes. 

###File Structure
    oskar
      app
        This is where files for the client-side app belong. 
        This includes (in the *scripts* directory) angular controllers, views, directives, etc.
        This also includes (in the *views* directory) html templates. 

###What you can do so far
+ Authentication and login works at a basic level
+ Roles are supported. 
+ A logged in user with role of 'admin' can edit the supported languages
+ A user can create and modify their account details
+ A user can select a language that they speak and whether they want to teach it.
+ A user can find speakers who want to teach a given language.
+ Presence works using Firebase presence. 
+ A user can see whether teachers of a given language are currently online.

###Some next steps
+ Start working on WebRTC.
+ Enable a user to join a video conversation with a teacher who is currently online (complex, but see https://delicious.com/akiryk)
+ Testing (complicated)
+ Enable require.js (this will be complicated I believe).
