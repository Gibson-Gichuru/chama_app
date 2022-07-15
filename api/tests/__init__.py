from unittest import TestCase

from app import db, create_app

import os


class BaseTestConfig(TestCase):

    def setUp(self):

        self.app = create_app(os.environ.get("FLASK_TEST_ENV") or "testing")

        self.app_context = self.app.app_context()

        self.app_context.push()

        db.create_all()

    def tearDown(self):

        db.drop_all()

        self.app_context.pop()

        self.app = None
