from tests import BaseTestConfig
from unittest.mock import patch
from threading import Thread

from app.email import send_async_email, send_email

from  flask import current_app
class TestEmail(BaseTestConfig):

    def setUp(self):

        super().setUp()

    def test_email_requred_settings(self):

        """
            Testing that all the required Keys are available
        """

        requred_keys = [

            "MAIL_SUBJECT_PREFIX",
            "MAIL_SENDER",
            "MAIL_SERVICE",
            "MAIL_USERNAME",
            "MAIL_PASSWORD",
            "MAIL_PORT",
            "MAIL_USE_TLS",
        ]

        search_func = lambda item: item in current_app.config

        self.assertTrue(
            all(
                map(search_func, requred_keys)
            )
        )

    def test_email_construction(self):
        """
            Test That an email Message is constructed Properly

            The send_email runs on another thread but we need to make sure that 
            all the neccessary dependencies are set for a success execution

        """
        #make sure that  the current application object is stored
        #the current app object will provide a context to run the 
        #email thread on

        with patch("app.email.current_app") as app_mock:

            send_email("test@test.com", "Testing Mocking", "email")
            
        app_mock._get_current_object.assert_called()

    def test_email_message_construction(self):

        """
            Testing that the email message is build with flask_mail Message instance
            as required

            msg = Message(MAIL_PREFIX.join(subject), Sender, recepients = [to])
        """

        with patch('app.email.Message') as message_mock:

            send_email('test@test', 'Testing', "email")

        message_mock.assert_called_with(
            subject = current_app.config['MAIL_SUBJECT_PREFIX'] + " " + "Testing",
            sender = current_app.config['MAIL_SENDER'], 
            recipients = ['test@test']  
        )

    def test_email_message_thread_build(self):

        from app.email import Message

        with patch("app.email.Thread") as thread_mock:

            send_email('test@test', 'Testing', "email")


        thread_mock.assert_called()


    def test_mail_thread_runs_in_current_app_context(self):

        with patch('app.email.current_app') as context_mock:

            app = current_app._get_current_object()

            send_async_email(app=app, msg="testing")


        context_mock.app_context.assert_called()

    def test_mail_sent(self):

        with patch("app.email.Mail") as mail_mock:

            send_email('test@test', 'Testing', "email")

        mail_mock.send.assert_called()

        

        

        


