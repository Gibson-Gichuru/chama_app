from threading import Thread

from flask import current_app

from flask_mail import Message

from flask import render_template

from app import mail as Mail


def send_async_email(app, msg):

    with app.app_context():

        Mail.send(msg)


def send_email(to, subject, template, **kwargs):

    app = current_app._get_current_object()

    msg = Message(
        subject=app.config['MAIL_SUBJECT_PREFIX'] + " " + subject,
        sender=app.config['MAIL_SENDER'],
        recipients=[to]
    )

    msg.body = render_template(template + ".txt", **kwargs)
    msg.html = render_template(template + ".html", **kwargs)

    email_thread = Thread(target=send_async_email, args=[app, msg,])

    email_thread.start()

    return email_thread
