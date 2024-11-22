# pfe-dugmici
A website for enhancing online seminars, providing live feedback to lecturers.

### The website is hosted at glitch.com and the code is there as well.

[The webpage for students](https://pfe-dugmici.glitch.me/)

[The webpage for lecturers](https://pfe-dugmici.glitch.me/n)

[The code](https://glitch.com/edit/#!/pfe-dugmici)

The description in Serbian:
Napravio sam sajt koji omogućava polaznicima da anonimno daju feedback tokom onlajn predavanja. Mogu kliknuti dugme da im nije jasna trenutna priča ili poslati poruku. Predavač uživo čuje ping kad neko od polaznika to uradi, a moze videti i detaljan log.

Pošto je anonimno, ovako se može dobiti realan feedback tokom predavanja (npr. na svakih pola sata im kažemo da kliknu jedno dugme). Rekao bih i da poboljšava slušanje, jer se polaznici osećaju uključenije u predavanje.

Napisao sam backend sa NodeJS i websocket-om koji radi i ima zaštitu od spamovanja. Imam i kod koji radi sa 3 dugmeta ("sve razumem", "nije bas jasno" i "nije uopste jasno"). Naravno, testirali bismo da li sve radi pre korišćenja i eventualno izmenili CSS. Nije potrebno održavanje – sajt za hosting dozvoljava 1000h mesečno besplatno.

Ovo bi posebno značilo novim saradnicima koji nisu držali mnogo predavanja (meni npr.). Polaznici se retko javljaju da im nešto nije jasno – uglavnom se javljaju oni koji zapravo razumeju i imaju dodatna pitanja, što daje pogrešnu sliku predavaču. Ideju sam dobio jer sam pratio onlajn kurs ove zime i video slicnu alatku, ali kod nije bio dostupan, pa sam ga napisao ispočetka. Iskreno, hteo sam i da naučim JavaScript.
