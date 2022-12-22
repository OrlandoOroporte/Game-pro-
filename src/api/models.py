from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    game_id = db.relationship('Game', backref ='user', uselist=True)
    salt = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200),unique=False, nullable=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    precio = db.Column(db.String, unique=False, nullable=False)
    descripcion = db.Column(db.String(200), unique=False, nullable=True)
    cantidad = db.Column(db.String(8), unique=False, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "name": self.name,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "user_id": self.user_id,
            "cantidad": self.cantidad
            }
