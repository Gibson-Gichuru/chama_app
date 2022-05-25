from tests import BaseTestConfig
import json

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

    def test_account_registration(self):

        response = self.client.post(
            
            "/api/auth/register", 
            headers = {

                "content-type":"application/json"
            },
            data = json.dumps(self.request_body),
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
    
        
    