# Projekt Pzaw 4
*Jak uruchomić stronę:*
1. Sklonuj repozytorium: <br>
    git clone https://github.com/Pos6062/PZAW2
2. Przejdź do folderu zawierającego pliki strony:<br>
    cd projekt04
3. Przejdź do konsoli git bash i zrób setup:<br>
    npm run setup
5. Uruchom serwer:<br>
    npm run dev
6. W przeglądarce wpisz localhost:8000 (lub kliknij link wyświetlony w konsoli)

7. Aby wczytać przykładowe dane, wpisz "POPULATE_DB=1 npm run dev" na linuxsie, bądź "$env:POPULATE_DB=1; npm run dev" w windows powershellu

8. Konto administratora tworzymy komendą $env:ADMIN_NAME=" ";$env:ADMIN_PASSWORD=" ";npm run dev, lub analogicznie jak wyżej dla windowsa (bez '$env:');

# Opis aplikacji
- aplikacja służy do tworzenia zbioru osób (ściany chwały), które zasługują na bycie uwiecznionym na stronie.
- każdy użytkownik może:
    + dodawać osoby do listy, edytować i usuwać własne wpisy
    + przeglądać ścianę chwały
- administrator może dodatkowo:
    + usuwać wpisy innych użytkowników
    + edytować wpisy innych użytkowników
- hasła przechowywane są w bazie danych, zaszyfrowane za pomocą Argon2

# Ścieżki
- GET `/` - strona główna aplikacji
- GET `/about` - opis strony (lorem ipsum)
- GET `/user_signup` - formularz rejestracji
- GET `/user_login` - formularz logowania
- GET `/user_signup` - strona startowa aplikacji
- GET `/edit` - edytowanie wpisów
- GET `/form` - formularz dodawania osoby do ściany chwały<br>
**dodatkowao występują ścieżki POST, których tu nie wypisałem**
#### Strona przekierowuje użytkowników na stronę główną, po znalezieniu się przez użytkownika na niezapowiedzianej ścieżce
## Personalizacja
- aplikacja posiada ciemny motyw

## Technologie
- Node.js
- Express
- Argon2
- Sqlite

# Code reviews
### 1. M. R.
#### Instalacja
- działa sprawnie, pojawia się 5 vulnerablilities ale to git

#### Aplikacja
- działa sprawnie, logowanie oraz rejestracja git
- strona nie obsługuje niezapowiedzianych ścieżek
- fajnie że jest pytanie o cookies zanim pojawia się opcja zmiany motywu
- z adminem było trochę zabawy bo readme omyłkowo mówi jak stworzyć admina na linuxa
- dużo różnych rozmiarów czcionek (minor issue)
- podanie ścieżki "http://localhost:8000/style/style.css" pokazuje cały css

#### kod
- w settings,js jest paręnaście linijek zakomentarzowanych bez kontekstu
- index.js posiada w komentarzu kod z wszystkich innych plików js z niewiadomego powodu
- w rejestracji nie sprawdzasz długości hasła i nazwy użytkownika w backend'zie - ktoś mógłby złośliwie zawiesić całą bazę danych
- to samo w dodawaniu osoby - po dodaniu zbyt długiej nazwy aplikacja wyrzuca błąd
- oprócz tego kod jest ładnie napisany, czytelny

### 2. N. G.
#### README:
- brakuje rozpisanych ścieżek (to jest w zasadach oceniania pana)
- brakuje dokładniejszego rozpisania funkcjonalności (permisje użytkowników)

#### rejestracja:
- można zarejestrować się jako użytkownik z nazwą " ", można by dać jakąś walidację

#### strona:
- intuicyjna, wygląda dobrze
- można dodać osobę z imieniem " " i nazwiskiem " ", można by dać jakąś walidację, a jeśli ktoś jest znany np. tylko z imienia to żeby drugie pole było opcjonalne

#### kod/pliki:
- występują 2 takie same pliki "populate.js"
- kod wygląda okej
