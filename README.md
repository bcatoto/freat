# Freat

The final capstone project for COS333 Fall 2019. The developers of this app are [Bianca Catoto](https://github.com/bcatoto),
[Claire Dong](https://github.com/claired976), [Ibrahim Hasmi](https://github.com/Ibrahim-Hashmi), and [Gilron Tsabkevich](https://github.com/GilronTs).<br>

The app can be found at https://freat.herokuapp.com/.

### Run Locally

To run the project locally, first install all the NodeJS and Python dependencies:

```
npm install
pip install -r requirements.txt
```

To build the React app, execute:

```
npm run build
```

To run the app, go into the `server` folder and run `run.py`. Environment variables must be exported in order for the server to run. Environment variables include `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUDNAME`, `DATABASE_URL`, and `FLASK_ENV`:

```
cd server
python run.py
```

The webapp will then launch at http://localhost:5000/.

<hr>
