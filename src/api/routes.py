"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from email.mime import image
import os                                                                
from ast import Try
import email
from shutil import ExecError
from venv import create
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game
from base64 import b64encode
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

def set_password(password,salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}") 


@api.route('/user', methods=['POST'])
def add_user():
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        if len(email) < 1 or len(password)<1:
            return jsonify("Debe colocar los datos completos")
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            request_user = User(email=email, password=password, salt=salt)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify('Registed'), 201
            except Exception as error:
                db.session.rollback() 
                print(error.args)
                return jsonify('registry error'), 500
                
@api.route('/login', methods=['POST'])
def login():
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    login_user = User.query.filter_by(email=email).one_or_none() ### este metodo es para traer un solo usuario. //solo se verifica el email por el password esta hashed
    
    if login_user:
        if check_password(login_user.password, password, login_user.salt):
            created_token = create_access_token(identity= login_user.id)
            return jsonify({'token': created_token}), 200
        else:
            return jsonify("No se ha podido iniciar sesion"),400
        
    else:
        return jsonify('Error de indentidad'),400

@api.route('/game', methods=['POST'])
@jwt_required()
def add_game():
    if request.method == 'POST':
        body = request.json
        image = body.get('image',None)
        name = body.get('name', None)
        precio = body.get('precio',None)
        descripcion = body.get('descripcion',None)
        cantidad = body.get('cantidad',None)
        
        user_id = get_jwt_identity()
        print(user_id)

        if len(image) < 1 or len(name) < 1  or len(descripcion) < 1 or len(cantidad) < 1:
            return jsonify('Debe cargar todos los campos'), 400
        else:
            print(f'Se guardo el juego')
            request_game=Game(image=image, name=name, precio=precio, descripcion=descripcion, cantidad=cantidad, user_id=user_id)
            db.session.add(request_game)

            try: 
                db.session.commit()
                return jsonify("Juego agregado"),200
            except ExecError as error:
                db.session.rollback
                print(error.args)
                return jsonify('No se pudo guardar')
        
            
@api.route('/game', methods = ['GET'])
def get_game():
    games = Game.query.all()
    print(f'se estan retornando todos los juego')
    return jsonify(list(map(lambda item: item.serialize(), games))), 200


@api.route('/game/<int:game_id>', methods = ['DELETE'])
def delete_game(game_id=None):
    deleteGame = Game.query.get(game_id)
    if deleteGame is None:
        return jsonify('Juego no existe')
    else: 
        db.session.delete(deleteGame),
    try:
        db.session.commit()
        return jsonify(['Se elimino el servicio']), 202
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message":f"Error:{error.args}"}),500

    return jsonify([]),405

@api.route('/game/<int:game_id>', methods = ['PUT'])
def put_game(game_id=None):
    body = request.json    
    putGame = Game.query.get(game_id)
    if putGame is None:
        return ('El juego no existe')
    else: 
        if putGame.image != body["image"]:
            putGame.image = body["image"]
        elif putGame.name != body["name"]:
            putGame.name =   body["name"] 
        elif putGame.precio != body["precio"]:
             putGame.precio = body["precio"] 
        elif putGame.descripcion != body["descripcion"]:
            putGame.descripcion = body["descripcion"] 
        elif putGame.cantidad != body["cantidad"]:
           putGame.cantidad =   body["cantidad"] 
    
        try:
            db.session.commit()
            return jsonify(putGame.serialize()),202
        except Exception as error:
            return jsonify(f"Error al actulizar el taller{error.args}"),500
    

    return jsonify([]),201





