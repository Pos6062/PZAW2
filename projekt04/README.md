# Projekt Pzaw 4
*Jak uruchomić stronę:*
1. Sklonuj repozytorium: <br>
    git clone https://github.com/Pos6062/PZAW2
2. Przejdź do folderu zawierającego pliki strony:
    cd projekt04
3. Przejdź do konsoli git bash i zrób setup:
    npm run setup
5. Uruchom serwer:
    npm run dev
6. W przeglądarce wpisz localhost:8000 (lub kliknij link wyświetlony w konsoli)

7. Aby wczytać przykładowe dane, wpisz "POPULATE_DB=1 npm run dev" na linuxsie, bądź "$env:POPULATE_DB=1; npm run dev" w windows powershellu

8. Program umożliwia wpisywanie się do listy członków, edytowanie tej listy i usuwanie elementów z tej listy, a także zawiera opis (About us). 
Konto administratora tworzymy komendą $env:ADMIN_NAME=" ";$env:ADMIN_PASSWORD=" ";npm run dev, lub analogicznie jak wyżej dla windowsa (bez '$env:');
(między cudzysłowami należy wpisać nazwę i hasło dla konta) 

9. Styl css jest zrobiony w większości za pomocą AI, jednak funkcjonalność strony nie.

# Opis aplikacji
pojawi się niedługo