import pymysql

def fill_game_editors():
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )

    try:
        with connection.cursor() as cursor:
            # Select all games and their editors
            cursor.execute("SELECT id, editors FROM games")
            games = cursor.fetchall()
            
            for game in games:
                game_id = game[0]
                editors_list = game[1]

                if editors_list:
                    # Split the editors by comma and trim spaces
                    editors_array = [m.strip() for m in editors_list.replace('&', ',').split(',')]

                    for editor_name in editors_array:
                        # Find the ID of the editor in the editors table
                        cursor.execute("SELECT id FROM editors WHERE name = %s", (editor_name,))
                        editor = cursor.fetchone()

                        if editor:
                            editor_id = editor[0]
                            
                            # Use INSERT IGNORE to avoid duplicates
                            cursor.execute(
                                "INSERT IGNORE INTO game_editors (game_id, editor_id) VALUES (%s, %s)",
                                (game_id, editor_id)
                            )

            # Commit the changes
            connection.commit()
            print("Table de liaison remplie avec succès.")

    except Exception as e:
        print(f"Erreur : {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    fill_game_editors()
