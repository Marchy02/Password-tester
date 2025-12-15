# Password Tester

Applicazione web e script Python per valutare la robustezza di una password.
Il tool analizza la complessità della password e stima **in modo teorico** il tempo necessario a craccarla tramite attacchi di tipo brute-force.

## Utilizzo

### Comandi rapidi (copia e incolla)

#### Versione Web (consigliata)

Non serve installare nulla.

👉 **Sito ufficiale:** [https://marchy02.github.io/Password-tester/](https://marchy02.github.io/Password-tester/)

1. Apri il sito GitHub Pages del progetto
2. Usa direttamente l’interfaccia web dal browser

La password viene analizzata localmente nel browser.

#### Versione Python (CLI)

Solo se vuoi usare il tool da terminale.

**Prerequisiti (Linux)**

```bash
sudo apt update
sudo apt install -y git python3 python3-pip
```

**Clona la repository**

```bash
git clone https://github.com/Marchy/password-tester.git
cd password-tester
```

**Installa dipendenze e avvia**

```bash
pip install --user rich
python3 password_tester.py
```

### Versione Web

La versione web è immediata e non richiede installazione.

1. Attiva GitHub Pages da **Settings > Pages** nella repository
2. In alternativa, apri direttamente il file `index.html` nel browser

**Privacy:** l’analisi avviene interamente lato client. La password **non viene inviata né salvata**.

### Versione Python

Pensata per l’uso da terminale.

1. Installa la dipendenza necessaria per l’output testuale:

```bash
pip install rich
```

2. Avvia il programma:

```bash
python password_tester.py
```

## Struttura del progetto

* `index.html` — Interfaccia web
* `style.css` — Stili
* `script.js` — Logica di analisi della password (JavaScript)
* `password_tester.py` — Versione Python originale

## Funzionalità

* Verifica dei requisiti minimi (maiuscole, minuscole, numeri, simboli)
* Stima del tempo di cracking basata su entropia e set di caratteri
* Rilevamento di password comuni
* Esecuzione completamente locale

---

Made by Marchy
