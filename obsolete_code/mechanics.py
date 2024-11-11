import pymysql

def fill_game_mechanics():
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )

    try:
        with connection.cursor() as cursor:
            # Select all games and their mechanics
            cursor.execute("SELECT id, mechanics FROM games")
            games = cursor.fetchall()
            
            for game in games:
                game_id = game[0]
                mechanics_list = game[1]

                if mechanics_list:
                    # Split the mechanics by comma and trim spaces
                    mechanics_array = [m.strip() for m in mechanics_list.split(',')]

                    for mechanic_name in mechanics_array:
                        # Find the ID of the mechanic in the mechanics table
                        cursor.execute("SELECT id FROM mechanics WHERE name = %s", (mechanic_name,))
                        mechanic = cursor.fetchone()

                        if mechanic:
                            mechanic_id = mechanic[0]
                            # Insert into game_mechanics table if match found
                            cursor.execute(
                                "INSERT INTO game_mechanics (game_id, mechanic_id) VALUES (%s, %s)",
                                (game_id, mechanic_id)
                            )

            # Commit the changes
            connection.commit()
            print("Table de liaison remplie avec succès.")

    except Exception as e:
        print(f"Erreur : {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    fill_game_mechanics()
