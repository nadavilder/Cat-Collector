Cat Collector App
Overview
This project is a full-stack application with a React frontend and a Flask backend, featuring a cat image collection. Users can view cat images, mark them as favorites, and edit their details.

Frontend Setup
    Prerequisites:
        1. Node.js
        2. npm or yarn

    Getting Started:
    1. Clone the repository and navigate to the frontend directory:
        git clone <repository-url>
        cd .\frontend\
    2. Install the dependencies:
        npm install
    3. Start the development server:
        npm start
    The React app will be available at http://localhost:3000.



Backend Setup:
    Prerequisites:
        1. Python
        2. Pip
        3. Virtualenv
        4. PostgreSQL


    Getting Started:
    1. Navigate to the backend directory:
        cd .\backend\
    2. Install the required Python packages by running:
        pip install -r requirements.txt
    3. Start the Flask server:
        flask run




Setting Up PostgreSQL:
1. Install PostgreSQL and create a database named 'cat_collector':
    CREATE DATABASE cat_collector;
2. Create config.py file in the backend folder and Configure the connection parameters:

    class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://usename:password@localhost/cat_collector'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    THECATAPI_KEY = 'live_enfGx4jJJEDERijBcyEQt8HjGtypv2PilEgLWfi16jOAlBihDCg4w4oP8eNWcQHS'

    comment (do not copy):
        postgresql://: The prefix indicating the database system being used (PostgreSQL in this case).
        username: The username you use to access the PostgreSQL database.
        password: The password for the given username.



API Documentation:

    Fetch Cats
       GET /fetch-cats: Fetches initial cat data.
    Response:
        {
        "message": "Cats fetched successfully",
        "data": [...]
        }


    Get Cats
       GET /cats: Retrieves all cats.
    Response:
        [
            {
                "id": 1,
                "name": "Whiskers",
                "description": "A fluffy white cat",
                "is_favorite": false,
                "image_url": "http://example.com/cat1.jpg"
            },
            ...
        ]       



    Update Cat
        PUT /cats/{id}: Updates the cat's information.
    Request Body:
     {
        "name": "Snowball",
        "description": "A lovely snow-white kitten"
     }

     Response:
     {
        "message": "Cat updated successfully"
     }


    Toggle Favorite
    POST /cats for adding a favorite; DELETE /cats/{id} for removing a favorite.
        POST Request Body:
        {
            "id": 1
        }
        DELETE Response:
        {
            "message": "Cat removed from favorites successfully"
        }





