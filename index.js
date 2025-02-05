// Import the required modules
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let apiURL = "";

// Set the public folder for static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Home Page launch route
// Get a random entry when displaying the home page.
app.get("/", async (req, res) => {
    console.log("GET Home Page")
    
    try {

        /* Request data from API */
        const response = await axios.get(
            "https://api.openbrewerydb.org/v1/breweries/random");
        const result = response.data;

        // Send API data to Home page
        res.render("index.ejs", {
            breweryData: result,
        });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
      });
    }

});


// Get details for a "Particular Brewery"
app.post("/name", async (req, res) => {
    console.log("GET /name")

    /* Receive data from HTML form */
    let name = req.body.name;

    try {
        /* Request data from API */
        const response = await axios.get(
            `https://api.openbrewerydb.org/v1/breweries?by_name=${name}`);
        const result = response.data;

        // Send API data to Home page
        res.render("index.ejs", {
            breweryData: result,
        })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
      });
    }
 
});


// Get the brewery by the "Type"
app.post("/type", async (req, res) => {
    console.log("GET /type")

    /* Receive data from HTML form */
    let type = req.body.type;

    try {
        /* Request data from API */
        const response = await axios.get(
            `https://api.openbrewerydb.org/v1/breweries?by_type=${type}`);
        const result = response.data;

        // Send API data to Home page
        res.render("index.ejs", {
            breweryData: result,
        })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        let errorMessage = "Please select a Type"
        res.render("index.ejs", {
        error: errorMessage,
      });
    }
 
});


// Get the brewery by the "County" or "US State"
app.post("/county", async (req, res) => {
    console.log("GET /county")

    /* Receive data from HTML form */
    let county = req.body.county;

    if (county === "") {
        apiURL = `https://api.openbrewerydb.org/v1/breweries?by_state=${county}&sort=county`;
    } else {
        apiURL = `https://api.openbrewerydb.org/v1/breweries?by_state=${county}`;
    }

    try {
        /* Request data from API */
        const response = await axios.get(apiURL);
        const result = response.data;

        // Send API data to Home page
        res.render("index.ejs", {
            breweryData: result,
        })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
      });
    }
 
});


// Get the brewery by the COUNTRY
app.post("/country", async (req, res) => {
    console.log("GET /country")

    /* Receive data from HTML form */
    let country = req.body.country;

    if (country === "") {
        apiURL = `https://api.openbrewerydb.org/v1/breweries?by_country=${country}&sort=country`;
    } else {
        apiURL = `https://api.openbrewerydb.org/v1/breweries?by_country=${country}`;
    }

    try {
    /* Request data from API */
    const response = await axios.get(apiURL);
        const result = response.data;

        // Send API data to Home page
        res.render("index.ejs", {
            breweryData: result,
        })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
      });
    }
 
});


// Server listening for events on Port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});