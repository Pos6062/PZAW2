# Projekt Pzaw 3
*Jak uruchomić stronę:*
1. Sklonuj repozytorium: 
    git clone https://github.com/Pos6062/PZAW2
2. Przejdź do folderu zawierającego pliki strony:
    cd projekt04
3. Zainstaluj pliki potrzebne do obsługi strony:
    npm install express ejs argon2
4. Uruchom serwer:
    npm run dev
5. W przeglądarce wpisz localhost:8000 (lub kliknij link wyświetlony w konsoli)

6. Aby wczytać przykładowe dane, wpisz "POPULATE_DB=1 npm run dev" na linuxsie, bądź "$env:POPULATE_DB=1; npm run dev" w windows powershellu

7. Program umożliwia wpisywanie się do listy członków, edytowanie tej listy i usuwanie elementów z tej listy, a także zawiera opis (About us). 
Konto administratora tworzymy komendą $env:ADMIN_NAME=" ";$env:ADMIN_PASSWORD=" ";npm run dev
(między cudzysłowami należy wpisać nazwę i hasło dla konta)

8. 

9. Styl css jest zrobiony w większości za pomocą AI, jednak funkcjonalność strony nie.