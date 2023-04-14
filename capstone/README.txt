Create a .env file - name it 'config.env'

copy and paste this to the config.env file

------------------------------------------------

PORT = 3000

MONGO_URI = mongodb+srv://<yourUserNameHere>:<yourPasswordHere>@registratrion.xmgoz1f.mongodb.net/registratrion
#replace with real mongodb username and password

# sys add account
ADMIN = 'admin'
ADMIN_PASSWORD = 'password'

# JWT Token
SECRET_KEY = 'th3_S3cr3t_K3y_Is_S3cr3t'

----------------------------------------------

type npm run dev to the gitbash to run the server

type this URL to open the website 
USER - localhost:3000/

ADMIN - localhost:3000/a
-- create the admin account using system admin -- 

SYSTEM_ADMIN - localhost:3000/dashboard

System admin account
username: admin
password: password