import pymysql
import re

def fill_game_ean():
    print("Connexion à la base de données...")
    
    # Connect to the database
    connection = pymysql.connect(
        host='localhost',  # Change to your DB host
        user='root',       # Change to your DB user
        password='Liberte64$',  # Change to your DB password
        database='wizard'  # Change to your DB name
    )
    
    try:
        print("Connexion réussie. Exécution de la requête pour récupérer les jeux...")
        with connection.cursor() as cursor:
            # Select all games and their themes
            cursor.execute("SELECT id, link_philibert FROM games")
            games = cursor.fetchall()
            
            print(f"{len(games)} jeux trouvés dans la base de données.")
            
            for game in games:
                game_id = game[0]
                link = game[1]
                print(f"Traitement du jeu ID {game_id} avec le lien : {link}")
                
                # Regular expression to extract the series of digits before '.html'
                match = re.search(r'(\d+)(?=\.html)', link)
                if match:
                    ean = match.group(1)
                    print(f"Série de chiffres extraite (avant .html) : {ean}")
                    
                    # Insert the EAN into the database
                    cursor.execute(
                        "UPDATE games SET ean = %s WHERE id = %s",
                        (ean, game_id)
                    )
                else:
                    print(f"Aucune série de chiffres trouvée avant .html pour le jeu ID {game_id}.")
                
            # Commit the changes
            connection.commit()
            print("Table modifiée avec EAN avec succès.")
    
    except Exception as e:
        print(f"Erreur : {e}")
    
    finally:
        connection.close()
        print("Connexion fermée.")

if __name__ == "__main__":
    fill_game_ean()
