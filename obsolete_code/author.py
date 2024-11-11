import pymysql

def fill_game_authors():
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )

    try:
        with connection.cursor() as cursor:
            # Select all games and their authors
            cursor.execute("SELECT id, authors FROM games")
            games = cursor.fetchall()
            
            for game in games:
                game_id = game[0]
                authors_list = game[1]

                if authors_list:
                    # Split the authors by comma and trim spaces
                    authors_array = [m.strip() for m in authors_list.replace('&', ',').split(',')]

                    for author_name in authors_array:
                        # Find the ID of the mechanic in the authors table
                        cursor.execute("SELECT id FROM authors WHERE name = %s", (author_name,))
                        author = cursor.fetchone()

                        if author:
                            author_id = author[0]
                            # Insert into game_authors table if match found
                            cursor.execute(
                                "INSERT INTO game_authors (game_id, author_id) VALUES (%s, %s)",
                                (game_id, author_id)
                            )

            # Commit the changes
            connection.commit()
            print("Table de liaison remplie avec succès.")

    except Exception as e:
        print(f"Erreur : {e}")

    finally:
        connection.close()

if __name__ == "__main__":
    fill_game_authors()
