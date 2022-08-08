from tests import BaseTestConfig

import json

from app import db

from app.models import User

import base64

from unittest.mock import patch

class TestUserRegisterRoute(BaseTestConfig):

    def setUp(self):

        super().setUp()

        self.client = self.app.test_client()

        self.request_body = {


            "username": "testuser",
            "email": "testuser@test.com",
            "password": "testuserpassword"
        }
    
    def make_request(self, method, url, headers, data=None):

        if method.lower == "get":

            response = self.client.get(url, headers=headers)

            return response

        response = self.client.post(url, headers=headers, data=data)

        return response

    def test_account_registration(self):

        response = self.make_request(
            "post",
            "/api/auth/register",
            headers={"content-type": "application/json"},
            data=json.dumps(self.request_body)
        )

        response_data = response.get_json()

        user = User.query.filter_by(username="testuser").first()

        # assert that a 200 return status code
        self.assertEqual(response.status_code, 200)

        # assert That we have a json data response
        self.assertIsNotNone(response_data)

        # assert that the account creation was a success
        self.assertEqual(response_data['message']['status'], "success")

        # confirm that  the user has been created
        self.assertIsNotNone(user)

    def test_account_registration_fails_if_user_exists(self):

        user = User(username="testuser", email="testuser@test.com")

        db.session.add(user)

        db.session.commit()

        response = self.make_request(

            "post",
            "/api/auth/register",
            headers={"content-type": "application/json"},
            data=json.dumps(self.request_body)
        )

        response_data = response.get_json()

        self.assertEqual(response.status_code, 400)

        self.assertIn("errors", response_data)


class TestLoginRoute(BaseTestConfig):

    def setUp(self):

        super().setUp()

        self.client = self.app.test_client()

        self.register_user()

        self.user = User.query.filter_by(email="testuser@test.com").first()

        self.headers = {

            "Content-type": "application/json",
            "Authorization": "Basic " + base64.b64encode(
                f"{self.user.email}:testing".encode('utf-8')
            ).decode('utf-8')}

    def register_user(self):

        user = User(
            username="testuser",
            email="testuser@test.com"
            )

        user.password = "testing"

        user.active = True

        user.add(user)

    def make_request(self, headers=None):

        url = "/api/auth/login"

        return self.client.get(
            url,
            headers=self.headers) \
            if headers is None else \
            self.client.get(url, headers=headers)

    def test_login_auth_return_tokens(self):

        """A valid Login return A refresh token and access token"""
        response = self.make_request()

        response_data = response.get_json()

        self.assertEqual(response.status_code, 200)

        self.assertIsNotNone(response_data)

        self.assertIn("tokens", response_data)

    def test_unregistered_user_login(self):

        headers = {
            "Content-type": "application/json",
            "Authentication": "Basic " + base64.b64encode(

                "somerandomuser@user.com:randompass".encode('utf-8')
            ).decode('utf-8')}

        response = self.make_request(headers=headers)

        self.assertEqual(response.status_code, 401)

    def test_token_are_cached_on_login(self):

        response = self.make_request()

        response_data = response.get_json()

        cached_tokens = self.app.redis.hmget(
            f'{self.user.username}:tokens',
            ['refresh', 'access'])

        # Expect True if neither the refresh token nor the access token is none
        self.assertTrue(all(cached_tokens))

        self.assertEqual(
            response_data['tokens']['refresh'],
            cached_tokens[0].decode('utf-8'))

    def test_access_token_renew(self):

        response = self.make_request()

        response_data = response.get_json()

        self.assertIn('tokens', response_data)

        url = "/api/auth/token/renew"

        headers = {

            "Content-type":"application/json",
            "Authorization":f"Bearer {response_data['tokens']['refresh']}"
        }

        payload = {
            "access":response_data['tokens']['access']
        }

        new_response = self.client.post(
            url,
            headers=headers,
            data=json.dumps(payload)
        )

        new_access_token = new_response.get_json()

        self.assertEqual(new_response.status_code, 200)

        self.assertNotEqual(
            response_data['tokens']['access'],
            new_access_token['access'])

    def test_inactive_user_cannot_login(self):

        self.user.active = False

        self.user.update()

        response = self.make_request()

        self.assertEqual(response.status_code, 403)


class TestUserAccountConfirmation(BaseTestConfig):

    def setUp(self):

        super().setUp()

        self.client = self.app.test_client()

        self.user = User(
            username="testUser",
            email="testuser@test.com"
        )

        self.user.password = "somerandompassword"

        self.user.add(self.user)

        self.headers = {

            "Content-type": "application/json",
            "Authorization": "Basic " + base64.b64encode(
                f"{self.user.email}:somerandompassword".encode('utf-8')
            ).decode('utf-8')}

    def make_request(self, payload, headers=None):

        url = "/api/auth/activation_link"

        return self.client.post(
            url,
            headers=self.headers,
            data=json.dumps(payload))

    def tearDown(self):

        user = User.query.filter_by(username="testUser").first()

        user.delete(user)

        super().tearDown()

    def test_user_account_confirmation(self):

        response = self.client.get(
            f"/api/auth/account/confirmation/{self.user.generate_activation_token()}")

        user = User.query.filter_by(username="testUser").first()

        self.assertEqual(response.status_code, 200)

        self.assertTrue(user.active)

    def test_new_activation_link_request(self):

        """A user can request for a new activation link"""

        response = self.make_request(payload={"remote_url":"/some/url"})

        self.assertEqual(response.status_code, 200)

