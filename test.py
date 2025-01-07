import sqlite3
with sqlite3.connect('shopcart.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT password FROM users WHERE username = ?', ('snj',))
            user = cursor.fetchone()