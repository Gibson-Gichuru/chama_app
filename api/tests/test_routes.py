from tests import BaseTestConfig
import json

from app import db
from app.models import User
class TestUserRegisterAndLogin(BaseTestConfig):

    def setUp(self):

        super().setUp()

        # create the application client

        self.client = self.app.test_client()

        self.request_body = {


            "username": "testuser",
            "email":"testuser@test.com",
            "password":"testuserpassword"
        }

    def make_request(self, method,  url ,headers, data = None):

        if method.lower == "get":

            response = self.client.get(url, headers = headers)

            return response

        response = self.client.post(url, headers = headers, data = data)

        return response

    def test_account_registration(self):

        response = self.make_request(

            "post",
            "/api/auth/register",
            headers = {"content-type": "application/json"},
            data = json.dumps(self.request_body)
        )

        response_data = response.get_json()

        user = User.query.filter_by(username = "testuser").first()

        # assert that a 200 return status code
        self.assertEqual(response.status_code, 200)

        # assert That we have a json data response
        self.assertIsNotNone(response_data)

        # assert that the account creation was a success
        self.assertEqual(response_data['message']['status'], "success")

        # confirm that  the user has been created
        self.assertIsNotNone(user)

        # confirm that we have out tokens returned

        self.assertIn('tokens', response_data)

    def test_account_registration_fails_if_user_exists(self):

        user = User(username = "testuser", email = "testuser@test.com")

        db.session.add(user)
        db.session.commit()

        response = self.make_request(

            "post",
            "/api/auth/register",
            headers = {"content-type": "application/json"},
            data = json.dumps(self.request_body)
        )

        response_data = response.get_json()

        self.assertEqual(response.status_code, 400)

        self.assertIn("errors", response_data)


        
    