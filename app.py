from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
import webbrowser
from threading import Timer
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'snj6365'

def create_user_table():
    with sqlite3.connect('shopcart.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT NOT NULL UNIQUE,
                            email TEXT NOT NULL,
                            password TEXT NOT NULL)''')
        conn.commit()
        
create_user_table()

browser_opened = False

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('email')
        password = request.form.get('password')

        if not username or not password:
            flash('Both fields are required!')
            return redirect(url_for('login'))

        with sqlite3.connect('shopcart.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT username,password FROM users WHERE email = ?', (username,))
            user = cursor.fetchone()
            if user and check_password_hash(user[1], password):
                session['username'] = user[0]
                return redirect(url_for('home'))
            else:
                flash('Invalid username or password!')
                return redirect(url_for('login'))

    return render_template('index.html')        
@app.route('/')
def signup():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup_user():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    
    if not username or not email or not password:
        flash('All fields are required!')
        return redirect(url_for('signup'))
    
    hashed_password = generate_password_hash(password)
    try:
        with sqlite3.connect('shopcart.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
                           (username, email, hashed_password))
            conn.commit()
            session['username'] = username 
            return redirect(url_for('home'))
    except sqlite3.IntegrityError:
        flash('Username or email already exists!')
        return redirect(url_for('signup'))

@app.route('/home')
def home():
    username = session.get('username')
    if not username:
        return redirect(url_for('signup'))
    return render_template('home.html', username=username)

@app.route('/checkout', methods=['POST'])
def checkout():
    username = session.get('username')
    item_name = request.form.get('itemName')
    item_image = request.form.get('itemImage')
    item_image2 = request.form.get('image1')
    item_image3 = request.form.get('image2')
    item_image4 = request.form.get('image3')
    item_image5 = request.form.get('image4')
    item_price = request.form.get('itemPrice')

    if not item_name or not item_image:
        return "Missing data", 400
    
    return render_template('checkout.html', 
                           item_name=item_name, 
                           item_image=item_image,
                           item_image2=item_image2,
                           item_image3=item_image3,
                           item_image4=item_image4,
                           item_image5=item_image5,
                           item_price=item_price,
                           username=username)

def open_browser():
    global browser_opened
    if not browser_opened:
        webbrowser.open_new('http://127.0.0.1:5000/')
        browser_opened = True

if __name__ == '__main__':
    Timer(1, open_browser).start()
    app.run(debug=True,use_reloader=False)
