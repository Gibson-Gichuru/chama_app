
from app import ma 

from marshmallow import Schema , fields , validates, ValidationError

from app.models import User 

class RegiserSchema(ma.Schema):

    username = fields.String(required = True)
    email = fields.Email(required = True)

    password = fields.String(required=True)

    @validates("username")
    def validate_username(self, username):

        if User.query.filter_by(username = username).first():

            raise ValidationError("username not available")


    @validates("email")
    def validate_email(self, email):

        if User.query.filter_by(email = email).first():

            raise ValidationError("email address aready registered")