<div align="center">
❗️<strong>Important Notice</strong>❗
  
This school project has been created for the purpose of learning technologies and streaming techniques.  
***Our team strongly opposes piracy and any illegal activities***.  
Therefore, we kindly request that you refrain from downloading and using the content of this repository.  
It is meant to be open to the public solely for showcasing the results of our project.  
Thank you for your understanding.
</div>  

# Hypertube
![Landing](https://user-images.githubusercontent.com/40247953/222903589-6c013960-4051-4d4c-876c-23c3e561e9d0.gif)

1. [Stack](#stack)
2. [Restrictions and rules of the assignment ](#restrictions-and-rules-of-the-assignment)
3. [How to run locally](#how-to-run-locally)
4. [Content](#content)

## Short description  
A team project, implemented as a part of the Hive Helsinki coding school web-branch.  

The streaming web application allows users to search for, watch, and comment on videos. Users can sort and filter search results by various criteria and genres. The player is integrated into the site, and movies are downloaded using the efficient **BitTorrent** protocol to ensure seamless streaming once enough data has been downloaded.  
  
The application is also multilingual, with all pages and messages translated into English, Swedish, and Russian. Additionally, movie subtitles are downloaded for each language (if available), and the default subtitle track language is set based on the user's selected language. The app aims to provide a user-friendly and accessible experience.
  
Team members: [Aleksei](https://github.com/alex2011576), [Ilona](https://github.com/fglsn) & [Cong](https://github.com/KaomN)
  
## Stack  

Backend:
- TypeScript
- Node.Js (Express)
- PostgreSQL
- Jest

Frontend:
- TypeScript
- React
- Material UI  

## Restrictions and rules of the assignment  
- Application should support multiple language selection
- No security breaches allowed 
- Code cannot produce any errors, warnings or notices either from the server or the client side in the web console.
- Libraries that are used to create a video stream from a torrent, thus limiting the educational purpose of the project are forbidden. (ex. webtorrent, pulsar and peerflix)
- Compatibility at least with Firefox (>= 41) and Chrome (>= 46)
- Responsive layout
- All the forms must have correct validations.

## How to run locally
### Go to the server directory:  
&emsp; `cd server`  
### Prepare database:  
&emsp; `docker-compose up -d`    

### To run backend:
1. Install dependencies:  
&emsp; `npm install`  
2. Insert .env file (we wont provide its content here)  
3. Migrate
&emsp; `npm run migrate-up`
4. Start the server:  
&emsp; `npm run dev`  

### To run frontend:  
1. Go to the client directory:  
&emsp; `cd ../client`  
2. Install dependencies:  
&emsp; `npm install`  
3. Start the client with:  
&emsp; `npm start`  
  
### Tests:
&emsp; `npm run test`  

## Content
### Registration and Signing-in: 
  
Users can register and activate their account through email, and reset their password by requesting a reset link via email.  
Two **OAuth** strategies (42 and GitHub) are available for easy registration and login.  
Users can choose their preferred language during registration, which will serve as the default language for their account.  
They can change their language preference and other user information, including email, password and profile picture, on the profile settings page.

https://user-images.githubusercontent.com/40247953/222681910-86d061ca-271c-4b79-9081-dba637006cde.mov

### Movie library

The movie list is initially sorted by popularity, based on download count.  
Users can search for a specific movie by entering a query term in the search field and pressing enter.  
Additionally, users can filter the list by genre and sort it by title, rating, production year, or download count, and even reverse the order.
  
Each movie thumbnail displays the movie's title, a summary of the plot, IMDb rating, and the production year (if available).  
  
https://user-images.githubusercontent.com/40247953/222689275-d1373d31-1018-4c75-bdaa-ba0422e3117f.mov

### Movie  
The movie page is a comprehensive source of information about the film, including its title, rating, plot, country of origin, year of release, as well as the names of the cast and director. Users can also leave a review to share their thoughts and opinions about the movie.  
  
To improve the viewing experience, the movie page offers subtitles in three languages - Russian, Swedish, and English - that users can switch based on their preference. Additionally, users can select the quality of the movie they want to watch.  
  
Once the user clicks on the play button, the video will start downloading immediately, and streaming will begin as soon as enough data has been downloaded to ensure a seamless viewing experience. It's worth noting that any movie that has not been played for more than 30 days will be automatically removed from the server.  
   
https://user-images.githubusercontent.com/40247953/222693959-9f6c8d2c-4609-4612-b5c3-e4f3af3fd3d5.mov
  



