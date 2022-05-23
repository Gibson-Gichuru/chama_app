from tests import BaseTestConfig

from app.models import User, Role, Permissions

class UserRoleAndPermissionsTest(BaseTestConfig):

    def setUp(self):
        
        super().setUp()

        # register Roles on the database
        Role.register_roles()

    def test_a_user_has_a_User_role_by_default(self):

        user = User()

        self.assertEqual(user.role.name, "User")

    def test_a_user_is_assigned_the_role_given(self):

        role = Role.query.filter_by(name = "Admin").first()

        user = User(role)

        self.assertEqual(user.role, role)

    def test_a_role_passed_raises_TypeError_if_not_of_type_Role(self):

        with self.assertRaises(TypeError):

            user = User("some role")

    def test_a_User_role_cannot_perform_admin_role(self):

        user = User()

        self.assertFalse(user.can(Permissions.REVIEW_LOAN_REQUEST))

    def test_admin_role_can_perform_basic_user_tasks(self):

        user = User()

        basic_tasks = [

            Permissions.MAKE_PAYMENT,
            Permissions.REQUEST_LOAN,
            Permissions.VIEW_PUBLIC_LEDGER,
            Permissions.VIEW_PRIVATE_LEDGER,
        ]

        answer = map(user.can, basic_tasks)

        self.assertTrue(all(answer))

    def test_basic_User_is_not_Admin(self):

        user= User()

        self.assertFalse(user.is_admin())

class TestUserAccount(BaseTestConfig):

    def setUp(self):

        super().setUp()

        self.user = User()

    def test_user_account_is_not_active_by_default(self):

        self.assertFalse(self.user.active)