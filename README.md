http://pieralukasz.me/zadanie/

Na samym początku strona wymaga od nas zalogowania.
W bazie danych istnieje trzech dostępnych lekarzy: 

1. login: rafalkoziol, hasło: rafalkoziol,
2. login: martakoziol, hasło: martakoziol,
3. login: marcinmolenda, hasło: marcinmolenda

Do każdego doktora przypisani zostają pacjenci, którzy posiadają własne "zlecenia lekowe", 
znajdują się oni po lewej stronie strony, lub jeżeli korzystamy z telefonu to naciskając przycisk
hamburger, pacjenci powinni wysunąć nam się z lewej strony.

Każdy doktor może dowolnie usunąć lub dodać nowego pacjenta, który zostanie przypisany konkretnie do niego.
Aby dodać nowego pacjenta należy kliknać zielony przycisk na dole listy pacjentów.
Aby usunąć istniejącego pacjenta należy wejść w jego profil poprzez naciśnięcie jego w liście,
a na jego profilu w lewym dolnym rogu znajduje się przycisk usunięcia. 

Przechodząc do sedna wykonania zadania na środku w dolnym rogu widnieje niebieski przycisk ZLECENIE.
Klikając w niego ukaże nam się forma, w której możemy dodać nowe zlecenie lekowe. Zgodnie z założonym
zadaniem znajduje się tam od góry: 
- lista dostępnych leków (+ mała podpowiedź dla lekarza na górze)
- godzina podania leku (08:00, 15:00, 22:00) wraz z ilością o tej porze
- data zażywania lekarstwa (w tabletce)
- oraz dostępny oddział na jaki dostarczyć lekarstwo

Jeżeli wszystkie elementy zostały uzupełnione poprawnie nowe zlecenie znajduje się na profilu pacjenta.
Zlecenia lekowe róœnież możemy usuwać.

Dla ułatwienia pacjenta możemy róœnież wydrukować jego wszystkie zlecenia.


### Instalacja

Aby uruchomić kod na swoim środowisku uruchomieniowym wystarczy pobrać samego klienta. 
Klient korzysta już z serwera API, który został zahostowany na Heroku (trzeba poczekać pół minuty na włączenie)
Server również daję do wglądu lecz do działania programu nie jest w tym momencie potrzebny.

```sh
$ cd zadanie-rekrutacyjne
$ cd client
$ npm install
$ npm run serve
```

Server klienta powinien działać na porcie 8080. 

### Jak rozpocząłęm pracę 
Pracę rozpocząłęm od napisania servera po stronie Backendu. Z moimi założeniami był on niezbędny do tego 
aby zadanie zostało wykonane poprawnie. Stworzyłem bazę danych korzystając z Mongo DB oraz sukcesywnie ją
powiększałęm o kolejne zapytania API. Server działa pod hostingiem Heroku na stronie: 

https://zadanie-rekrutacyjne-lekarz.herokuapp.com/

Server był mi niezbędny do tego aby stworzyć możliwość logowania lekarza, któr może zarządzać swoimi 
pacjentami oraz ich zleceniami lekowymi.

Następnie przeszedłem do wykonania głownej części zadania i za pomocą narzędzia Vue-Cli wygenerowałem czysty 
projekt Vue wraz z Vuex oraz Vue Router.

Wszystkie template komponentów Vue zostały wykonane za pomocą silnika PUG.

Za obsługę API posłużył mi Axios.

Jako framework CSS wykorzystałem SCSS oraz materialize.css, który jest moim ulubieńcem.

Całą moją pracę można zobaczyć w kodzie do czego zachęcam. 


