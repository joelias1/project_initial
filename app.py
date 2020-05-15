import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################
app.config("postgres:Skyriot12!@localhost:5432/Mass_Shootings")
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
shootingdata = Base.classes.case
shoot_rate_metadata = Base.classes.year
# Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("web.html")


@app.route("")
def case(year):
    sel = [
        case.city_state,
        getattr(injured, 'Y_'+year),
        
    ]

    results = db.session.query(*sel).all()

    

    # Format the data to send as json
    data = {
        "case": [result[0] for result in results],
        "city_state": [result[1] for result in results],
        "injured": [result[1] for result in results_dr]
    }

    return jsonify(data)



if __name__ == "__main__":
    app.run()