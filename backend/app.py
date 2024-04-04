from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
import requests
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
CORS(app)

class Cat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.String(50), unique=True)
    image_url = db.Column(db.String(255))
    name = db.Column(db.String(100))
    description = db.Column(db.Text)

    def to_dict(self):
        is_favorite = Favorite.query.filter_by(cat_id=self.id).first() is not None
        return {
            'id': self.id,
            'api_id': self.api_id,
            'image_url': self.image_url,
            'name': self.name,
            'description': self.description,
            'is_favorite': is_favorite
        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cat_id = db.Column(db.Integer, db.ForeignKey('cat.id'), nullable=False)
    cat = db.relationship('Cat', backref=db.backref('favorites', lazy=True))

@app.before_request
def initialize_database():
    db.create_all()

@app.route('/cats', methods=['GET'])
def get_cats():
    cats = Cat.query.order_by(Cat.id).all()  # Ensure consistent ordering
    return jsonify([cat.to_dict() for cat in cats])

@app.route('/cats', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    cat = Cat.query.get(data['id'])
    if cat:
        favorite = Favorite(cat_id=cat.id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify({'message': 'Cat added to favorites'}), 201
    return jsonify({'message': 'Cat not found'}), 404

@app.route('/cats/<int:cat_id>', methods=['GET'])
def get_cat(cat_id):
    cat = Cat.query.get_or_404(cat_id)
    return jsonify(cat.to_dict())

@app.route('/cats/<int:cat_id>', methods=['PUT'])
def update_cat(cat_id):
    cat = Cat.query.get_or_404(cat_id)
    data = request.get_json()
    cat.name = data.get('name', cat.name)
    cat.description = data.get('description', cat.description)
    db.session.commit()
    return jsonify(cat.to_dict())

@app.route('/cats/<int:cat_id>', methods=['DELETE'])
def remove_from_favorites(cat_id):
    favorite = Favorite.query.filter_by(cat_id=cat_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Cat removed from favorites'})
    return jsonify({'message': 'Favorite not found'}), 404

@app.route('/fetch-cats')
def fetch_cats_from_api():
    # Check if there are already cats in the database
    if Cat.query.count() == 0:
        response = requests.get('https://api.thecatapi.com/v1/images/search?limit=100', headers={'x-api-key': Config.THECATAPI_KEY})
        cats_data = response.json()
        for cat_data in cats_data:
            cat = Cat.query.filter_by(api_id=cat_data['id']).first()
            if not cat:
                new_cat = Cat(api_id=cat_data['id'], image_url=cat_data['url'], name='', description='')
                db.session.add(new_cat)
        db.session.commit()
        return jsonify({'message': 'Cats fetched from TheCatAPI and saved to database'})
    else:
        return jsonify({'message': 'Cats are already in the database'})


if __name__ == '__main__':
    app.run(debug=True)
