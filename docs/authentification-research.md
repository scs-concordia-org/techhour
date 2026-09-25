- Which Concordia email  domains student should currently use
  
All concordia student and teacher currently use is the same root domain that is owned by concordia which is: `concordia.ca`. So to identify the email we could just check that the domain ends in `concordia.ca`

According to the [Concordia email policy](https://www.concordia.ca/content/dam/common/docs/policies/official-policies/VPSS-34.pdf), Under `Definitions` it specifies: 

> “Concordia Email Account(s)” means an electronic email address with the suffix “concordia.ca”
provided by the University to its Students and Employees

- Whether users should enter a username or their complete email address 

It is better for them to enter their complete email address because of the different subdomains that concordia uses for its student and employees, as such to avoid sending an email to the wrong address, users should enter their whole email adress.

- How the application can send one-time passcodes

It will be good at registration for the user to create an username with a strong password, such that we avoid cost by not 't unnecessarily sending email each time the users wants to connect. Instead its better to send an email at registration to ensure the email is a valid concordia student or when the user forgets their password to recover it.

- Which authentication library could work with Next.js

We can use [NextAuth.js](https://next-auth.js.org) to serve as an authentication library for this project.

- Which email delivery service could be used  

We can use different email service. Here are some alternatives that we can use.

| Email Service | Pricing |Disatvantages | Advantages |
|---------------|---------|--------------|------------|
| [SMTP2GO](https://www.smtp2go.com/about/) | Free (1000 emails months) | - Requires us to have our own domain | - Is free for alow usage of emails  |
| [Twilio](https://www.twilio.com/en-us/products/email-api/) | Pricy (19.85$/month)| - Cost us money | - Doesn't require us to have our own email domain |


- How long a one-time passcode should remain valid
According to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/OTP): 

> Many OTPs are 6 digits long with a 1-in-a-million chance to guess correctly. This is much better than 4 digits with just 10,000 possible combinations. The security mechanism that OTPs rely on is the temporal component: OTPs are usually only valid once for a defined timeframe and invalidated after use. That's why OTPs have a short expiration time (ideally ≤5 minutes; 30–120 seconds for stronger protection).

I suggest than to use a 3 minutes otp validation to give the user the time to actually connect to their email since they might go through two factor authentification [required](https://www.concordia.ca/it/services/email-students.html#:~:text=with%20this%20service-,How%20to%20get%20it%3F,-Access%20your%20Concordia) for concordia students

- How frequently a user may request another code.

A user should be able to request a code when creating an account about 3 times a day and for preventing them sending too many email at once we can wait for the invalidation time to pass before requesting another code.

- How long an authenticated session should last:

According to the [OWASP Guide for Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration)
> Both the idle and absolute timeout values are highly dependent on how critical the web application and its data are. Common idle timeouts ranges are 2-5 minutes for high-value applications and 15-30 minutes for low risk applications. Absolute timeouts depend on how long a user usually uses the application. If the application is intended to be used by an office worker for a full day, an appropriate absolute timeout range could be between 4 and 8 hours.

What the idle timeout represent according to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management#session_lifetime)

> **Idle timeout**: this times out after a period of inactivity, defined as a period in which the client has sent no HTTP requests to the server. After it times out, the user must reauthenticate.

And the absolute timeout from the same article:

> **Absolute timeout**: this times out after a specific time period, whether or not there was activity. After it times out, the user must reauthenticate

My recommendation is to use a absolute timeout of two days before they get disconnected and to use an idle timeout of 30 minutes.

Furthermore when we have specific events happening through the system as a security risk we should disconnect the user. Those events include:
 - Password changes
 - Login from a suspicious IP address.

- How users should log out

We can log out user by deleting/(flagging as invalid)  their session in the session database or if we use jwt we can store a secret inside the jwt and the database and update the one from the database which causes the jwt to not be usable for further logins

- How authentication abuse and email spam can be reduced

For a single account we can't prevent an user for receiving too many emails at once at the same time. If the same IP tries to create multiple account using concordia domain we can IP ban the person from creating any account.

