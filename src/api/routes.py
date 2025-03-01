"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/sign-up', methods=['POST'])
def crear_usuario():
    request_data = request.json
    usuario = Usuarios(correo=request_data["correo"], contraseña=request_data["contraseña"])
    db.session.add(usuario)
    db.session.commit()
    response_body = {
        "msg": "Hello, this is your usuario ",
        "result":request_data
    }
    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("correo", None)
    password = request.json.get("contraseña", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = Usuarios.query.filter_by(correo=email, contraseña=password).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 400
    access_token = create_access_token(identity=user.id)
    
    return jsonify({"id": user.id, "email": user.correo , "token":access_token}), 200
    
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = Usuarios.query.get(current_user_id)
    
    # Crea un nuevo token con el id de usuario dentro
   
    return jsonify({ "user_id": user.id })