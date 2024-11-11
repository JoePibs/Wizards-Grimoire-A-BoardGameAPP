import pymysql

def fill_game_illustrators():
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )

    try:
        with connection.cursor() as cursor:
            # Select all games and their illustrators
            cursor.execute("SELECT id, illustrators FROM games")
            games = cursor.fetchall()
            
            for game in games:
                game_id = game[0]
                illustrators_list = game[1]

                if illustrators_list:
                    # Split the illustrators by comma and trim spaces
                    illustrators_array = [m.strip() for m in illustrators_list.replace('&', ',').split(',')]

                    for illustrator_name in illustrators_array:
                        # Find the ID of the illustrator in the illustrators table
                        cursor.execute("SELECT id FROM illustrators WHERE name = %s", (illustrator_name,))
                        illustrator = cursor.fetchone()

                        if illustrator:
                            illustrator_id = illustrator[0]
                            
                            # Use INSERT IGNORE to avoid duplicates
                            cursor.execute(
                                "INSERT IGNORE INTO game_illustrators (game_id, illustrator_id) VALUES (%s, %s)",
                                (game_id, illustrator_id)
                            )

            # Commit the changes
            connection.commit()
            print("Table de liaison remplie avec succès.")

    except Exception as e:
        print(f"Erreur : {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    fill_game_illustrators()
