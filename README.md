# FitLife - Fitness Web Aplikacija

## Opis projekta
FitLife je web aplikacija namenjena praćenju fizičke aktivnosti korisnika, planiranju treninga i vođenju fitnes dnevnika. Aplikacija omogućava registraciju i prijavu korisnika, pregled baze vežbi, upravljanje treninzima, vođenje dnevnika i primanje obaveštenja. Takođe, sadrži administrativni panel za upravljanje korisnicima i obaveštenjima.

## Tehnologije
- **Frontend**: React.js (React Router, Hooks, React Icons)
- **Backend**: Laravel (PHP, Eloquent ORM, Sanctum za autentifikaciju)
- **Baza podataka**: MySQL
- **Stilizacija**: CSS

## Pokretanje projekta

### Instalacija zavisnosti
Za frontend:
```
npm install
```
Za backend:
```
composer install
php artisan migrate
php artisan db:seed
```

### Pokretanje aplikacije
Frontend:
```
npm start
```
Backend:
```
php artisan serve
```

## Funkcionalnosti
- **Korisnici**
  - Registracija i prijava
  - Upravljanje profilom
  - Vođenje fitnes dnevnika
  - Planiranje treninga
  - Pregled baze vežbi
  - Pregled i upravljanje obaveštenjima

- **Administratori**
  - Upravljanje korisnicima
  - Kreiranje i slanje obaveštenja
  - Pregled statistike treninga korisnika

## Struktura aplikacije
- **Frontend**: React komponente nalaze se u `MojeKomponente/`
- **Backend**: Laravel API nalazi se u `app/Http/Controllers/`
- **Baza podataka**: Modeli su u `app/Models/`

## API Rute
- **Autentifikacija**
  - `POST /api/register` - registracija korisnika
  - `POST /api/login` - prijava korisnika
  - `POST /api/logout` - odjava korisnika

- **Treninzi**
  - `GET /api/trainings` - prikaz svih treninga korisnika
  - `POST /api/trainings` - kreiranje novog treninga
  - `PUT /api/trainings/{id}` - ažuriranje treninga
  - `DELETE /api/trainings/{id}` - brisanje treninga

- **Dnevnik**
  - `GET /api/diary` - pregled unosa u dnevnik
  - `POST /api/diary` - kreiranje unosa
  - `PUT /api/diary/{id}` - izmena unosa
  - `DELETE /api/diary/{id}` - brisanje unosa

## Administrator funkcije
- Upravljanje korisnicima (`/admin/users`)
- Upravljanje obaveštenjima (`/admin/notification`)
- Pregled statistike (`/admin`)

## Podešavanja okruženja
Kreirati `.env` fajl i dodati:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitlife
DB_USERNAME=root
DB_PASSWORD=
```

