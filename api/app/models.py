from app import db

from datetime import datetime

import datetime as DT

from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
    secrets
    )

import jwt

from flask import current_app

from sqlalchemy_events import listen_events, on

from app.email import send_email


class Permissions:

    MAKE_PAYMENT = 0X01  # 0b0000000000000001

    REQUEST_LOAN = 0X02  # 0b0000000000000010

    VIEW_PUBLIC_LEDGER = 0X04  # 0b0000000000000100

    VIEW_PRIVATE_LEDGER = 0X08  # 00000000000001000

    EDIT_SELF_ACCOUNT = 0X10  # 00000000000010000

    EDIT_USER_ACCOUNT = 0X20  # 00000000000100000

    SUSPEND_ACCOUNT = 0X40  # 00000000001000000

    REVIEW_LOAN_REQUEST = 0X80  # 00000000010000000

    ADMINISTRATOR = 0XFFFF


class DatabaseActions:

    def add(self, resource):

        db.session.add(resource)

        return db.session.commit()

    def update(self):

        return db.session.commit()

    def delete(self, resource):

        db.session.delete(resource)

        return db.session.commit()


class Role(db.Model, DatabaseActions):

    __tablename__ = "roles"

    role_id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(60), nullable=False, unique=True)

    default = db.Column(db.Boolean, default=False)

    permissions = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", backref="role", lazy="dynamic")

    @staticmethod
    def register_roles():

        available_roles = {
            "User": (
                (
                    Permissions.MAKE_PAYMENT
                    | Permissions.REQUEST_LOAN
                    | Permissions.EDIT_SELF_ACCOUNT
                    | Permissions.VIEW_PUBLIC_LEDGER
                    | Permissions.VIEW_PRIVATE_LEDGER),
                True),
            "Admin": (0XFFFF, False)
        }

        for role in available_roles:

            existing_role = Role.query.filter_by(name=role).first()

            if existing_role is None:

                new_role = Role()

                new_role.name = role

                new_role.default = available_roles[role][1]
                new_role.permissions = available_roles[role][0]

                db.session.add(new_role)

                db.session.commit()


@listen_events
class User(db.Model, DatabaseActions):

    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(60), unique=True, nullable=False)

    email = db.Column(db.String(100), unique=True, nullable=False)

    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))

    active = db.Column(db.Boolean, default=False)

    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    password_hash = db.Column(db.String(120))

    def __init__(self, username, email, role=None):

        self.username = username

        self.email = email

        self.origin_url = ""

        if role is not None and not isinstance(role, Role):

            raise TypeError("role passed is not of Type Role")

        else:

            self.role = role

        if role is None:

            self.role = Role.query.filter_by(default=True).first()

    @on("after_insert")
    def send_a_confirmation_token(mapper, conn, self):

        send_email(
            self.email,
            "Account Confirmation",
            "email",
            username=self.username,
            token=self.generate_activation_token(),
            host_name=f"{self.origin_url}account/confirm"
            )

    @property
    def password(self):

        raise AttributeError("This attribute cannot be read")

    @password.setter
    def password(self, password):

        self.password_hash = generate_password_hash(
            password=password,
            salt_length=16,
            method="pbkdf2:sha256"
            )

    def check_password(self, password):

        return check_password_hash(self.password_hash, password=password)

    def can(self, permissions):

        return self.role is not \
            None and \
            (self.role.permissions & permissions) == permissions

    def is_admin(self):

        return self.can(Permissions.ADMINISTRATOR)

    def generate_activation_token(self, timestamp=900):

        if not self.active:

            payload = dict(
                exp=datetime.utcnow() + DT.timedelta(seconds=timestamp),
                iat=datetime.utcnow(),
                sub=self.user_id
            )

            return User.generate_token(
                payload=payload,
                key=current_app.config.get("ACTIVATION_KEY")
                )

        return None

    def generate_password_reset_token(self, timestamp=3600):

        payload = dict(
            exp=datetime.utcnow() + DT.timedelta(seconds=timestamp),
            iat=datetime.utcnow(),
            sub=self.user_id
        )

        return User.generate_token(
            payload=payload,
            key=current_app.config.get("SECRET_KEY")
        )

    @staticmethod
    def generate_token(payload, key):

        try:

            return jwt.encode(
                payload=payload,
                key=key,
                algorithm=current_app.config.get("TOKEN_ALGO")
            )

        except Exception as error:

            raise error

    @staticmethod
    def validate_token(token, key):

        try:

            return jwt.decode(
                token,
                key=key,
                algorithms=current_app.config.get("TOKEN_ALGO")
            )

        except jwt.ExpiredSignatureError:

            return None

        except jwt.InvalidTokenError:

            return None

    @staticmethod
    def activate(token):

        data = User.validate_token(

            token=token,
            key=current_app.config.get('ACTIVATION_KEY')
            )

        if data:
            user = User.query.get(data['sub'])

            if user is not None:

                user.active = True

                db.session.add(user)

                db.session.commit()

                return True

        return False

    def get_access_token(self, timestamp=600):

        access_token = User.generate_token(
            payload={

                "exp": datetime.utcnow() + DT.timedelta(seconds=timestamp),
                "iat": datetime.utcnow(),
                "sub": self.user_id,
                "sign": secrets.token_urlsafe()
            },

            key=current_app.config.get("ACCESS_KEY")
        )

        return access_token

    def get_refresh_token(self, timestamp=86400):

        refresh_token = User.generate_token(

            payload={
                    "exp": datetime.utcnow() + DT.timedelta(seconds=timestamp),
                    "iat": datetime.utcnow(),
                    "sub": self.user_id,
                },
            key=current_app.config.get("REFRESH_KEY"))

        return refresh_token

    def get_access_refresh_token(self):

        access_token = self.get_access_token()

        refresh_token = self.get_refresh_token()

        return access_token, refresh_token
