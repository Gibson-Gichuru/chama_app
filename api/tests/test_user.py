from tests import BaseTestConfig

from app.models import User, Role, Permissions

from unittest.mock import patch

from app import db  

import time



class UserRoleAndPermissionsTest(BaseTestConfig):

    def setUp(self):
        
        super().setUp()

        # register Roles on the database
        Role.register_roles()

    def test_a_user_has_a_User_role_by_default(self):

        user =  User(username = "test_user", email = "test@test_user.com")

        self.assertEqual(user.role.name, "User")

    def test_a_user_is_assigned_the_role_given(self):

        role = Role.query.filter_by(name = "Admin").first()

        user = User(
            username = "test_user", 
            email = "test@test_user.com",
            role = role
            )

        self.assertEqual(user.role, role)

    def test_a_role_passed_raises_TypeError_if_not_of_type_Role(self):

        with self.assertRaises(TypeError):

            user = User(
                username = "test_user", 
                email = "test@test_user.com",
                role = "some role"
                )

    def test_a_User_role_cannot_perform_admin_role(self):

        user =  User(username = "test_user", email = "test@test_user.com")

        self.assertFalse(user.can(Permissions.REVIEW_LOAN_REQUEST))

    def test_admin_role_can_perform_basic_user_tasks(self):

        user =  User(username = "test_user", email = "test@test_user.com")

        basic_tasks = [

            Permissions.MAKE_PAYMENT,
            Permissions.REQUEST_LOAN,
            Permissions.VIEW_PUBLIC_LEDGER,
            Permissions.VIEW_PRIVATE_LEDGER,
        ]

        answer = map(user.can, basic_tasks)

        self.assertTrue(all(answer))

    def test_basic_User_is_not_Admin(self):

        user=  User(username = "test_user", email = "test@test_user.com")

        self.assertFalse(user.is_admin())

class TestUserAccount(BaseTestConfig):

    def setUp(self):

        super().setUp()

        self.user = User(username = "test_user", email = "test@test_user.com")

        self.user.add(self.user)

    def test_user_account_is_not_active_by_default(self):

        self.assertFalse(self.user.active)

    def test_user_password(self):

        """
            User password should raise an Attribute Error When accessed.
            That is a user should be able to assign a value to the password
            attribute but not access it
        """

        with self.assertRaises(AttributeError):

            self.user.password

    def test_user_password_check(self):

        user =  User(username = "test_user", email = "test@test_user.com")

        user.password = "goat"

        self.assertFalse(user.check_password("cow"))

    def test_password_hash_cannot_be_the_same(self):

        """
        Two user Password hashes cannot be the same
        Even if they provided the same password
        """

        user1 = User(username = "test_user_one", email = "test@test_user_one.com")
        user2 = User(username = "test_user_two", email = "test@test_user_two.com")

        user1.password = "goat"

        user2.password = "goat"

        self.assertNotEqual(user1.password_hash, user2.password_hash)

    def test_user_account_activation_with_a_token(self):

        """
            User account can only be activate by a token 
        """

        # Confirm that the user account is not active by default

        self.assertFalse(self.user.active)

        User.activate(self.user.generate_activation_token())

        user = User.query.filter_by(username= "test_user").first()

        self.assertTrue(user.active)

    def test_expired_tokens_cannot_be_used(self):

        """Expired Tokens Cannot Activate a user Account"""

        user = User(username="some username", email="some email")

        user.add(user)

        short_lived_token = user.generate_activation_token(timestamp=1)

        time.sleep(2)

        User.activate(token=short_lived_token)

        saved_user = User.query.filter_by(username = "some username").first()

        self.assertFalse(saved_user.active)

    @patch("app.models.send_email")
    def test_confirmation_email_send(self, email_mock):

        "A confirmation Email Should be Sent once the user is registerd to the database"

        user = User(username = "testusername", email = "test@test.com")

        user.add(user)

        email_mock.assert_called()

        email_mock.assert_called_with(user.email, 'Account Confirmation', 'confirm')

    







