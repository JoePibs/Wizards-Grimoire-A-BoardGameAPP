interface CardData {
    name: string;
    short_description: string;
    image: string;
    editors: [];
    illustrators : [];
    themes : [];
    mechanics : [];
    min_age : number;
    min_player : number;
    max_player : number ;
  }

interface Entity {
    name: string;
}

  const formatList = (items: Entity[]) =>
    items.length > 0 ? items.map((item) => item.name).join(', ') : null;
  import '../styles/Card.css'
  const Card = ({ name, short_description, image, editors, illustrators, themes, mechanics, min_age, min_player, max_player }: CardData) => {
    return (
      
    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img className="object-contain object-center w-full h-56 bg-white" src={image} alt="avatar" />
        <div className="flex items-center px-6 py-3 bg-gray-900">
          <svg
            aria-label="headphones icon"
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"
            />
          </svg>
          <h1 className="mx-3 text-lg font-semibold text-white">{name}</h1>
        </div>
        <div className="px-6 py-4">
          <p className="text-md font-semibold text-gray-800 dark:text-white">
          📝 Description :
          <span className="text-mini">
            {short_description.length > 50 
              ? `${short_description.slice(0, 50)}...` 
              : short_description}
          </span>

          </p>
            
          {/* Vérifications avant d'afficher chaque catégorie */}
        {formatList(editors) && (
          <p className="text-md font-semibold text-gray-800 dark:text-white">
            🏢 Éditeurs : <span className="text-mini">{formatList(editors)}</span>
          </p>
        )}

        {formatList(illustrators) && (
          <p className="text-md font-semibold text-gray-800 dark:text-white">
            🎨 Illustrateurs : <span className="text-mini">{formatList(illustrators)}</span>
          </p>
        )}

        {formatList(themes) && (
          <p className="text-md font-semibold text-gray-800 dark:text-white ">
            🎭 Thèmes : <span className="text-mini">{formatList(themes)}</span>
          </p>
        )}

        {formatList(mechanics) && (
          <p className="text-md font-semibold text-gray-800 dark:text-white">
            ⚙️ Mécaniques : <span className="text-mini">{formatList(mechanics)}</span>
          </p>
        )}

        {/* Informations de jeu */}
        <p className="text-md font-semibold text-gray-800 dark:text-white">
          👶 Âge minimum : <span className="text-mini">{min_age} ans</span>
        </p>

        <p className="text-md font-semibold text-gray-800 dark:text-white">
          👥 Joueurs : <span className="text-mini">{min_player} - {max_player}</span>
        </p>
        </div>
      </div>
    );
  };
  
  export default Card;
  