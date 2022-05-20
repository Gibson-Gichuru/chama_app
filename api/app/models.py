
from app import db

from datetime import datetime

class Permissions:

    MAKE_PAYMENT = 0X01 #0b0000000000000001

    REQUEST_LOAN = 0X02 #0b0000000000000010

    VIEW_PUBLIC_LEDGER = 0X04 #0b0000000000000100

    VIEW_PRIVATE_LEDGER = 0X08 #00000000000001000

    EDIT_SELF_ACCOUNT = 0X10 #00000000000010000

    EDIT_USER_ACCOUNT = 0X20 #00000000000100000

    SUSPEND_ACCOUNT = 0X40 #00000000001000000

    REVIEW_LOAN_REQUEST = 0X80 #00000000010000000

    ADMINISTRATOR = 0XFFFF

class Role(db.Model):

    __tablename__ = "roles"

    role_id = db.Column(db.Integer, primary_key = True)

    name = db.Column(db.String(60), nullable = False, unique = True)

    default = db.Column(db.Boolean, default = False)

    permissions = db.Column(db.Integer, nullable = False)

    users = db.relationship("User", backref = "role", lazy = "dynamic")

    @staticmethod
    def register_roles():

        available_roles = {

            "User": (( 
                Permissions.MAKE_PAYMENT | Permissions.REQUEST_LOAN |
                Permissions.EDIT_SELF_ACCOUNT | Permissions.VIEW_PUBLIC_LEDGER |
                Permissions.VIEW_PRIVATE_LEDGER
            ), True),
            "Admin":(0XFFFF, False)
        }

        for role in available_roles:

            existing_role = Role.query.filter_by(name = role).first()

            if existing_role is None:

                new_role = Role()

                new_role.name = role

                new_role.default = available_roles[role][1]
                new_role.permissions = available_roles[role][0]

                db.session.add(new_role)

                db.session.commit()

class User(db.Model):

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key = True)

    username = db.Column(db.String(60), unique = True, nullable = False)

    email = db.Column(db.String(100), unique = True, nullable = False)

    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))

    status_id = db.Column(db.Integer)

    registration_date = db.Column(db.DateTime, default = datetime.utcnow)

    last_seen = db.Column(db.DateTime, default = datetime.utcnow)

    password_hash = db.Column(db.String(120), nullable = False)


    def __init__(self, role=None):

        if role is not None and not isinstance(role, Role):

            raise(TypeError("role passed is not of Type Role"))

        else:

            self.role = role

        if role is None:

            self.role = Role.query.filter_by(default=True).first()


    def can(self, permissions):

        return self.role is not None and (self.role.permissions & permissions) == permissions

    def is_admin(self):

        return self.can(Permissions.ADMINISTRATOR)
        

