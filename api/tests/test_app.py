from tests import BaseTestConfig

from flask import current_app


class TestAppInstance(BaseTestConfig):

    def test_current_app_is_not_none(self):

        self.assertFalse(current_app is None)

    def test_current_app_is_in_testing_mode(self):

        self.assertTrue(current_app.config['TESTING'])
