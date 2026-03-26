# Projekt Pzaw 3
*Jak uruchomić stronę:*
1. Sklonuj repozytorium: 
    git clone https://github.com/Pos6062/PZAW2
2. Przejdź do folderu zawierającego pliki strony:
    cd projekt03
3. Zainstaluj ejs potrzebny do obsługi strony:
    npm install express ejs
4. Uruchom serwer:
    node index.js
5. W przeglądarce wpisz localhost:8000

6. Aby wczytać przykładowe dane, przed zamiast "node index.js" wpisz "POPULATE_DB=1 node index.js" na linuxsie, bądź "$env:POPULATE_DB=1; node index.js" w windows powershellu

7. Program umożliwia wpisywanie się do listy członków, edytowanie tej listy i usuwanie elementów z tej listy, a także zawiera opis (About us)