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




        

        

        

        


