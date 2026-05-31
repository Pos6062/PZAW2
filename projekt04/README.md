# Projekt Pzaw 3
*Jak uruchomić stronę:*
1. Sklonuj repozytorium: 
    git clone https://github.com/Pos6062/PZAW2
2. W konsoli (powershellu) przejdź do folderu zawierającego pliki strony:
    cd projekt04
3. W git bash uruchom setup:
    npm run setup
5. Uruchom serwer (znów w powershellu):
    npm run dev
6. W przeglądarce wpisz localhost:8000 (lub kliknij link wyświetlony w konsoli)

7. Aby wczytać przykładowe dane, wpisz "POPULATE_DB=1 npm run dev" na linuxsie, bądź "$env:POPULATE_DB=1; npm run dev" w windows powershellu

8. Program umożliwia wpisywanie się do listy członków, edytowanie tej listy i usuwanie elementów z tej listy, a także zawiera opis (About us). 
Konto administratora tworzymy komendą $env:ADMIN_NAME=" ";$env:ADMIN_PASSWORD=" ";npm run dev (na windows bez '$env:')
(między cudzysłowami należy wpisać nazwę i hasło dla konta) 