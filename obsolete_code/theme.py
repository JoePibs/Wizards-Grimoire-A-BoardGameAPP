import pymysql

def fill_game_themes():
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )

    try:
        with connection.cursor() as cursor:
            # Select all games and their themes
            cursor.execute("SELECT id, themes FROM games")
            games = cursor.fetchall()
            
            for game in games:
                game_id = game[0]
                themes_list = game[1]

                if themes_list:
                    # Split the themes by comma and trim spaces
                    themes_array = [m.strip() for m in themes_list.split(',')]

                    for theme_name in themes_array:
                        # Find the ID of the mechanic in the themes table
                        cursor.execute("SELECT id FROM themes WHERE name = %s", (theme_name,))
                        theme = cursor.fetchone()

                        if theme:
                            theme_id = theme[0]
                            # Insert into game_themes table if match found
                            cursor.execute(
                                "INSERT INTO game_themes (game_id, theme_id) VALUES (%s, %s)",
                                (game_id, theme_id)
                            )

            # Commit the changes
            connection.commit()
            print("Table de liaison remplie avec succès.")

    except Exception as e:
        print(f"Erreur : {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    fill_game_themes()
