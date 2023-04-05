from flask import Flask, render_template, request, redirect, url_for
import smtplib
app = Flask(__name__)


@app.route('/')
def render_site():  # put application's code here
    return render_template("index.html")


@app.route('/contact', methods=['POST'])
def send_email():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Replace the placeholders with your email details
    sender_email = 'timothylhy@hotmail.com'
    sender_password = 'Noobly123'
    receiver_email = 'timothylhy@hotmail.com'

    # Create a SMTP session and login to your email account
    server = smtplib.SMTP('smtp.office365.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)

    # Create the email message
    subject = f"Message from {name}!"
    body = f"Name: {name}\n\nEmail: {email}\n\nMessage: {message}"
    message = f"Subject: {subject}\n\n{body}"

    # Send the email
    server.sendmail(sender_email, receiver_email, message)
    server.quit()

    # Redirect back to the contact page with a success message
    return redirect(url_for('contact', success=True))


@app.route('/contact')
def contact():
    # Check if success message is present in URL parameters
    success = request.args.get('success')

    return render_template('index.html', success=success)


if __name__ == '__main__':
    app.run(debug=True)
